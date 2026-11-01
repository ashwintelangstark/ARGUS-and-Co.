import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import db, { initDatabase } from './database.js';
import { generateAgentCompletion, FREE_MODELS } from './openrouter.js';
import { AGENT_PROFILES } from './agents/agentPrompts.js';
import { runBureauConclave } from './agents/investigationOrchestrator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize SQLite database
initDatabase();

app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static directory for uploaded evidence files
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
app.use('/uploads', express.static(uploadDir));

// Serve frontend dist if built
const frontendDist = path.join(__dirname, '../frontend/dist');
if (fs.existsSync(frontendDist)) {
  app.use(express.static(frontendDist));
}

// Multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${uniqueSuffix}_${sanitized}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB per evidence item
});

// Active SSE client connections keyed by caseRef
const sseClients = new Map();

// ==========================================
// ROUTES: CASES
// ==========================================

// Get all cases with aggregate counts
app.get('/api/cases', (req, res) => {
  try {
    const cases = db.prepare(`
      SELECT 
        c.*,
        COUNT(DISTINCT e.id) as evidence_count,
        COUNT(DISTINCT cl.id) as clues_count,
        COUNT(DISTINCT r.id) as report_count
      FROM cases c
      LEFT JOIN evidence e ON c.case_ref = e.case_ref
      LEFT JOIN clues cl ON c.case_ref = cl.case_ref
      LEFT JOIN reports r ON c.case_ref = r.case_ref
      GROUP BY c.id
      ORDER BY c.created_at DESC
    `).all();

    res.json({ success: true, cases });
  } catch (err) {
    console.error('Error fetching cases:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get single case details including evidence, clues, and reports
app.get('/api/cases/:caseRef', (req, res) => {
  try {
    const { caseRef } = req.params;
    const caseData = db.prepare('SELECT * FROM cases WHERE case_ref = ?').get(caseRef);
    if (!caseData) {
      return res.status(404).json({ success: false, error: 'Case not found' });
    }

    const evidence = db.prepare('SELECT * FROM evidence WHERE case_ref = ? ORDER BY created_at DESC').all(caseRef);
    const clues = db.prepare('SELECT * FROM clues WHERE case_ref = ? ORDER BY created_at ASC').all(caseRef);
    const deliberations = db.prepare('SELECT * FROM deliberations WHERE case_ref = ? ORDER BY created_at ASC').all(caseRef);
    const reports = db.prepare('SELECT * FROM reports WHERE case_ref = ? ORDER BY created_at DESC').all(caseRef);

    res.json({
      success: true,
      case: caseData,
      evidence,
      clues,
      deliberations,
      reports
    });
  } catch (err) {
    console.error('Error fetching case detail:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Create new case dossier
app.post('/api/cases', (req, res) => {
  try {
    const { case_ref, title, priority = 'High', category = 'Classified Investigation', summary = '', notes = '' } = req.body;

    if (!case_ref || !title) {
      return res.status(400).json({ success: false, error: 'case_ref and title are required' });
    }

    const existing = db.prepare('SELECT id FROM cases WHERE case_ref = ?').get(case_ref);
    if (existing) {
      return res.status(409).json({ success: false, error: 'Case reference already exists' });
    }

    const stmt = db.prepare(`
      INSERT INTO cases (case_ref, title, priority, category, summary, notes)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    stmt.run(case_ref, title, priority, category, summary, notes);

    db.prepare(`
      INSERT INTO audit_trail (case_ref, officer, action, details)
      VALUES (?, ?, ?, ?)
    `).run(case_ref, 'ARGUS', 'CASE_CREATED', `Case dossier "${title}" initialized.`);

    res.status(201).json({ success: true, case_ref, message: 'Case created successfully' });
  } catch (err) {
    console.error('Error creating case:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete case dossier
app.delete('/api/cases/:caseRef', (req, res) => {
  try {
    const { caseRef } = req.params;
    
    // Get file paths to delete from disk
    const files = db.prepare('SELECT file_path FROM evidence WHERE case_ref = ?').all(caseRef);
    for (const f of files) {
      try {
        if (f.file_path && fs.existsSync(f.file_path)) {
          fs.unlinkSync(f.file_path);
        }
      } catch (e) {
        console.warn('Could not delete file from disk:', e.message);
      }
    }

    db.prepare('DELETE FROM cases WHERE case_ref = ?').run(caseRef);
    db.prepare('INSERT INTO audit_trail (case_ref, officer, action, details) VALUES (?, ?, ?, ?)').run(
      caseRef, 'COMMAND', 'CASE_DELETED', `Case ${caseRef} purged from active ledger.`
    );

    res.json({ success: true, message: `Case ${caseRef} deleted` });
  } catch (err) {
    console.error('Error deleting case:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// ROUTES: EVIDENCE
// ==========================================

// Upload evidence files
app.post('/api/cases/:caseRef/evidence', upload.array('files', 10), async (req, res) => {
  try {
    const { caseRef } = req.params;
    const { notes = '', assigned_officer = 'LUTKIN' } = req.body;

    const caseData = db.prepare('SELECT id FROM cases WHERE case_ref = ?').get(caseRef);
    if (!caseData) {
      return res.status(404).json({ success: false, error: 'Case not found' });
    }

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, error: 'No files uploaded' });
    }

    const inserted = [];

    for (const file of req.files) {
      // Calculate SHA256 cryptographic hash for chain-of-custody
      const fileBuffer = fs.readFileSync(file.path);
      const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');

      // Attempt text extraction for txt, csv, json, log
      let extractedText = null;
      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
      if (['txt', 'csv', 'json', 'log', 'md'].includes(ext)) {
        try {
          extractedText = fileBuffer.toString('utf-8').slice(0, 4000); // sample first 4KB
        } catch {}
      }

      const stmt = db.prepare(`
        INSERT INTO evidence (case_ref, filename, original_name, file_path, file_size, file_type, hash_sha256, extracted_text, forensic_notes, assigned_officer)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = stmt.run(
        caseRef,
        file.filename,
        file.originalname,
        file.path,
        file.size,
        ext.toUpperCase() || 'FILE',
        hash,
        extractedText,
        notes || `Registered into evidence custody by Officer ${assigned_officer}.`,
        assigned_officer
      );

      inserted.push({
        id: result.lastInsertRowid,
        filename: file.filename,
        original_name: file.originalname,
        size: file.size,
        type: ext.toUpperCase(),
        hash
      });
    }

    db.prepare(`
      INSERT INTO audit_trail (case_ref, officer, action, details)
      VALUES (?, ?, ?, ?)
    `).run(caseRef, assigned_officer, 'EVIDENCE_LOGGED', `${inserted.length} evidence file(s) logged.`);

    res.status(201).json({ success: true, count: inserted.length, evidence: inserted });
  } catch (err) {
    console.error('Error uploading evidence:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete individual evidence item
app.delete('/api/evidence/:id', (req, res) => {
  try {
    const { id } = req.params;
    const item = db.prepare('SELECT * FROM evidence WHERE id = ?').get(id);
    if (!item) return res.status(404).json({ success: false, error: 'Evidence not found' });

    if (item.file_path && fs.existsSync(item.file_path)) {
      try { fs.unlinkSync(item.file_path); } catch {}
    }

    db.prepare('DELETE FROM evidence WHERE id = ?').run(id);
    res.json({ success: true, message: 'Evidence deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// ROUTES: INVESTIGATION BOARD (CLUES & YARN)
// ==========================================

// Get clues for a case
app.get('/api/cases/:caseRef/clues', (req, res) => {
  try {
    const { caseRef } = req.params;
    const clues = db.prepare('SELECT * FROM clues WHERE case_ref = ?').all(caseRef);
    res.json({ success: true, clues });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Add new clue or suspect pin to board
app.post('/api/cases/:caseRef/clues', (req, res) => {
  try {
    const { caseRef } = req.params;
    const { title, type = 'clue', description = '', pos_x = 0, pos_y = 0, pos_z = 0, image_url = null, connections = '[]', color = '#d9c49b' } = req.body;

    const stmt = db.prepare(`
      INSERT INTO clues (case_ref, title, type, description, pos_x, pos_y, pos_z, image_url, connections, color)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(caseRef, title, type, description, pos_x, pos_y, pos_z, image_url, typeof connections === 'string' ? connections : JSON.stringify(connections), color);

    res.status(201).json({ success: true, id: result.lastInsertRowid });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Update clue coordinates, description, or red string connections
app.put('/api/clues/:id', (req, res) => {
  try {
    const { id } = req.params;
    const { title, type, description, pos_x, pos_y, pos_z, connections, color } = req.body;

    const existing = db.prepare('SELECT * FROM clues WHERE id = ?').get(id);
    if (!existing) return res.status(404).json({ success: false, error: 'Clue not found' });

    db.prepare(`
      UPDATE clues SET
        title = COALESCE(?, title),
        type = COALESCE(?, type),
        description = COALESCE(?, description),
        pos_x = COALESCE(?, pos_x),
        pos_y = COALESCE(?, pos_y),
        pos_z = COALESCE(?, pos_z),
        connections = COALESCE(?, connections),
        color = COALESCE(?, color)
      WHERE id = ?
    `).run(
      title,
      type,
      description,
      pos_x,
      pos_y,
      pos_z,
      connections ? (typeof connections === 'string' ? connections : JSON.stringify(connections)) : null,
      color,
      id
    );

    res.json({ success: true, message: 'Clue updated' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Delete clue
app.delete('/api/clues/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.prepare('DELETE FROM clues WHERE id = ?').run(id);
    res.json({ success: true, message: 'Clue deleted' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// ROUTES: AI INVESTIGATION & CONCLAVE
// ==========================================

// SSE Stream for Live Investigation Turns
app.get('/api/cases/:caseRef/stream', (req, res) => {
  const { caseRef } = req.params;

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  if (!sseClients.has(caseRef)) {
    sseClients.set(caseRef, new Set());
  }
  const clients = sseClients.get(caseRef);
  clients.add(res);

  res.write(`data: ${JSON.stringify({ type: 'connected', caseRef, message: 'SSE stream connected' })}\n\n`);

  req.on('close', () => {
    clients.delete(res);
    if (clients.size === 0) sseClients.delete(caseRef);
  });
});

function broadcastToCase(caseRef, event, data) {
  const clients = sseClients.get(caseRef);
  if (!clients) return;
  const payload = JSON.stringify({ type: event, ...data });
  for (const client of clients) {
    try {
      client.write(`data: ${payload}\n\n`);
    } catch {}
  }
}

// Trigger Bureau Conclave investigation
app.post('/api/cases/:caseRef/conclave', async (req, res) => {
  const { caseRef } = req.params;
  try {
    runBureauConclave({
      caseRef,
      onProgress: (event, payload) => {
        broadcastToCase(caseRef, event, payload);
      }
    }).catch(err => {
      console.error(`[Conclave Error for ${caseRef}]:`, err);
      broadcastToCase(caseRef, 'error', { error: err.message });
    });

    res.json({
      success: true,
      caseRef,
      message: 'Bureau Conclave convened. Real-time deliberations streaming on /api/cases/:caseRef/stream.'
    });
  } catch (err) {
    console.error('Error starting conclave:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Direct Interrogation / 1-on-1 Chat with an AI Agent
app.post('/api/interrogate', async (req, res) => {
  try {
    const { officerId, message, caseRef = null, history = [] } = req.body;

    const profile = AGENT_PROFILES[officerId] || AGENT_PROFILES.ARGUS;

    let caseContext = '';
    if (caseRef) {
      const caseItem = db.prepare('SELECT * FROM cases WHERE case_ref = ?').get(caseRef);
      if (caseItem) {
        const evidence = db.prepare('SELECT original_name, file_type, forensic_notes FROM evidence WHERE case_ref = ?').all(caseRef);
        caseContext = `\nACTIVE CASE CONTEXT: "${caseItem.title}" (${caseItem.case_ref})\nNotes: ${caseItem.notes}\nEvidence: ${evidence.map(e => `${e.original_name} (${e.file_type})`).join(', ')}`;
      }
    }

    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: `${message}${caseContext}` }
    ];

    const result = await generateAgentCompletion({
      systemPrompt: profile.systemPrompt,
      preferredModel: profile.preferredModel,
      messages
    });

    if (caseRef) {
      db.prepare(`
        INSERT INTO deliberations (case_ref, officer_name, role, action_type, message, model_used)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(caseRef, profile.name, profile.title, 'interrogation_response', result.content, result.modelUsed);
    }

    res.json({
      success: true,
      officer: officerId,
      name: profile.name,
      role: profile.title,
      reply: result.content,
      modelUsed: result.modelUsed
    });
  } catch (err) {
    console.error('Interrogation error:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ==========================================
// ROUTES: REPORTS & ARCHIVE
// ==========================================

// Get reports for a case
app.get('/api/cases/:caseRef/reports', (req, res) => {
  try {
    const { caseRef } = req.params;
    const reports = db.prepare('SELECT * FROM reports WHERE case_ref = ? ORDER BY created_at DESC').all(caseRef);
    res.json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// Get agency ledger / audit trail
app.get('/api/audit', (req, res) => {
  try {
    const logs = db.prepare('SELECT * FROM audit_trail ORDER BY created_at DESC LIMIT 50').all();
    res.json({ success: true, logs });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

// System health and model info
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    bureau: 'ARGUS and Co. Western Investigation Bureau',
    freeModels: FREE_MODELS,
    agents: AGENT_PROFILES,
    database: 'SQLite (WAL mode)',
    uptime: process.uptime()
  });
});

// Wildcard SPA route
if (fs.existsSync(frontendDist)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`★ ARGUS and Co. Investigation Bureau API is active`);
  console.log(`★ Port: http://localhost:${PORT}`);
  console.log(`★ Free AI Models Connected via OpenRouter`);
  console.log(`======================================================\n`);
});
