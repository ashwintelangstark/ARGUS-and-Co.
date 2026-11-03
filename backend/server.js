import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import crypto from 'crypto';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';

import db, { initDatabase, hashPassword, verifyPassword } from './database.js';
import { generateAgentCompletion, FREE_MODELS } from './openrouter.js';
import { AGENT_PROFILES } from './agents/agentPrompts.js';
import { runBureauConclave } from './agents/investigationOrchestrator.js';
import { extractTextFromFile, backfillMissingEvidenceText } from './documentScanner.js';
import { extractCaseEntities } from './agents/universalCaseAnalyzer.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5001;

// Initialize SQLite database and scan for missing evidence text
initDatabase();
backfillMissingEvidenceText(db).catch(err => console.warn('[Startup backfill warning]:', err.message));

app.use(cors());

// Ensure Vercel serverless request path prefix compatibility
app.use((req, res, next) => {
  if (req.url && !req.url.startsWith('/api') && !req.url.startsWith('/uploads') && !req.url.startsWith('/assets') && !req.url.startsWith('/avatars')) {
    req.url = '/api' + (req.url.startsWith('/') ? req.url : '/' + req.url);
  }
  next();
});

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Static directory for uploaded evidence files (use /tmp on Vercel for writable storage)
const uploadDir = process.env.VERCEL ? path.join('/tmp', 'uploads') : path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  try {
    fs.mkdirSync(uploadDir, { recursive: true });
  } catch (e) {
    console.warn('[Uploads mkdir warning]:', e.message);
  }
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
// AUTHENTICATION & TELEGRAPH DISPATCH HELPERS
// ==========================================

async function sendRecoveryMail(recipientEmail, username, newPassword) {
  const mailText = `ARGUS & CO. WESTERN INVESTIGATION BUREAU
FRONTIER DISTRICT · CLASSIFIED TELEGRAPH DISPATCH

Attn Operative: ${username}
Registered Dispatch Address: ${recipientEmail}

A credential recovery request was submitted to the Bureau Registry.
Your access cipher has been renewed:

TEMPORARY CIPHER: ${newPassword}

Please return to the Bureau Gateway and authenticate using this cipher.
For security of the dossier vault, update your cipher once inside the Case Files.

Observe closely. Question everything. Follow the evidence.
— Chief Inspector ARGUS, Western Investigation Bureau`;

  const mailHtml = `
  <div style="background-color: #160d07; color: #ead8b4; font-family: 'Cinzel', Georgia, serif; padding: 32px; border: 2px solid #8a6035; max-width: 580px; margin: 0 auto; border-radius: 4px;">
    <div style="border-bottom: 1px solid #78502c; padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
      <h2 style="color: #d5a45b; margin: 0; font-size: 24px; letter-spacing: 2px;">ARGUS &amp; CO.</h2>
      <p style="color: #a78b61; margin: 4px 0 0 0; font-size: 11px; letter-spacing: 3px;">WESTERN INVESTIGATION BUREAU · EST. 1891</p>
    </div>
    <div style="font-family: 'Courier New', monospace; font-size: 13px; line-height: 1.7; color: #d8c3a1;">
      <p><strong style="color: #e8c27e;">ATTN OPERATIVE:</strong> ${username}</p>
      <p><strong style="color: #e8c27e;">TELEGRAPH DESTINATION:</strong> ${recipientEmail}</p>
      <p>A cipher recovery request was logged in the Bureau Register. Your operational access credentials have been renewed.</p>
      
      <div style="background: #24160c; border: 1px solid #b88b4a; padding: 18px; margin: 24px 0; text-align: center;">
        <span style="font-size: 11px; color: #a9906c; letter-spacing: 2px; display: block; margin-bottom: 6px;">TEMPORARY BUREAU CIPHER</span>
        <strong style="font-size: 24px; color: #f0cb80; letter-spacing: 4px; font-family: monospace;">${newPassword}</strong>
      </div>
      
      <p>Return to the Bureau Ledger to authenticate. For the integrity of all classified dossiers, memorize or secure this cipher immediately.</p>
      <p style="margin-top: 24px; color: #9f835d; font-style: italic;">"Observe closely. Question everything. Follow the evidence."</p>
      <p style="color: #d5a45b; font-size: 12px; margin-top: 16px;">— Chief Inspector ARGUS &amp; Company Detectives</p>
    </div>
  </div>`;

  const host = process.env.SMTP_HOST || process.env.MAIL_HOST;
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
  const port = parseInt(process.env.SMTP_PORT || '587');

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port,
        secure: port === 465,
        auth: { user, pass }
      });

      await transporter.sendMail({
        from: `"${process.env.EMAIL_FROM_NAME || 'ARGUS & Co. Bureau'}" <${user}>`,
        to: recipientEmail,
        subject: `[ARGUS & Co.] Cipher Recovery for Operative ${username}`,
        text: mailText,
        html: mailHtml
      });
      console.log(`[AUTH MAIL] Dispatch successfully transmitted to ${recipientEmail}`);
      return { sent: true, method: 'smtp' };
    } catch (err) {
      console.error('[AUTH MAIL ERROR]', err.message);
      return { sent: false, error: err.message, fallback: true };
    }
  } else {
    console.log(`[AUTH MAIL TELEGRAPH] SMTP not configured. Generated cipher for ${username} (${recipientEmail}): ${newPassword}`);
    return { sent: true, method: 'simulation' };
  }
}

// ==========================================
// ROUTES: AUTHENTICATION
// ==========================================

// Enlist New Operative (Sign Up)
app.post('/api/auth/signup', (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(400).json({ error: 'All fields (username, email, password, confirmation) are required.' });
    }

    const cleanUser = String(username).trim();
    const cleanEmail = String(email).trim().toLowerCase();

    if (cleanUser.length < 3 || cleanUser.length > 32) {
      return res.status(400).json({ error: 'Operative handle must be between 3 and 32 characters.' });
    }

    if (!/^[a-zA-Z0-9_\-\.]+$/.test(cleanUser)) {
      return res.status(400).json({ error: 'Operative handle may only contain letters, numbers, periods, dashes, or underscores.' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      return res.status(400).json({ error: 'Please provide a valid telegraph dispatch address (email).' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Cipher password must be at least 6 characters in length.' });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Cipher confirmation does not match the chosen password.' });
    }

    // Check for duplicate username (case-insensitive)
    const existingUser = db.prepare('SELECT id FROM users WHERE username = ? COLLATE NOCASE').get(cleanUser);
    if (existingUser) {
      return res.status(409).json({
        error: `Operative handle "${cleanUser}" is already commissioned in the bureau registry. Please choose a distinct handle.`
      });
    }

    // Check for duplicate email
    const existingEmail = db.prepare('SELECT id FROM users WHERE email = ? COLLATE NOCASE').get(cleanEmail);
    if (existingEmail) {
      return res.status(409).json({
        error: `The dispatch address "${cleanEmail}" is already linked to an active operative credential.`
      });
    }

    const passwordHash = hashPassword(password);
    const insert = db.prepare(`
      INSERT INTO users (username, email, password_hash, created_at, last_login)
      VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `);
    const result = insert.run(cleanUser, cleanEmail, passwordHash);
    const token = crypto.randomBytes(32).toString('hex');

    try {
      db.prepare(`
        INSERT INTO audit_trail (case_ref, officer, action, details)
        VALUES (?, ?, ?, ?)
      `).run(null, cleanUser, 'OPERATIVE_COMMISSIONED', `New operative credential registered for ${cleanUser} (${cleanEmail})`);
    } catch (e) {}

    return res.status(201).json({
      success: true,
      user: {
        id: result.lastInsertRowid,
        username: cleanUser,
        email: cleanEmail
      },
      passwordHash,
      token,
      message: `Operative ${cleanUser} successfully commissioned into ARGUS & Co.`
    });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Failed to enlist operative: ' + err.message });
  }
});

// Authenticate Operative (Login)
app.post('/api/auth/login', (req, res) => {
  try {
    const { username, password, rememberMe, clientBackup } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Please provide both your operative handle and cipher password.' });
    }

    const cleanIdentifier = String(username).trim();

    let user = db.prepare(`
      SELECT * FROM users 
      WHERE username = ? COLLATE NOCASE OR email = ? COLLATE NOCASE
    `).get(cleanIdentifier, cleanIdentifier.toLowerCase());

    // Resilient serverless fallback: If SQLite instance was cold-started or partitioned on Vercel
    // and this instance doesn't have the user yet, verify credentials against clientBackup!
    if (!user && clientBackup && clientBackup.username && clientBackup.passwordHash) {
      const cbUser = String(clientBackup.username).trim();
      const cbEmail = String(clientBackup.email || '').trim().toLowerCase();
      const matchesIdentifier = cleanIdentifier.toLowerCase() === cbUser.toLowerCase() ||
                                cleanIdentifier.toLowerCase() === cbEmail;
      
      if (matchesIdentifier && verifyPassword(password, clientBackup.passwordHash)) {
        try {
          const ins = db.prepare(`
            INSERT OR REPLACE INTO users (username, email, password_hash, created_at, last_login)
            VALUES (?, ?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
          `).run(cbUser, cbEmail || `${cbUser.toLowerCase()}@agency.bureau`, clientBackup.passwordHash);
          user = db.prepare('SELECT * FROM users WHERE id = ?').get(ins.lastInsertRowid);
          console.log(`[Auth] Resiliently restored operative "${cbUser}" into active SQLite instance.`);
        } catch (syncErr) {
          console.warn('[User sync warning]:', syncErr.message);
        }
      }
    }

    if (!user || !verifyPassword(password, user.password_hash)) {
      return res.status(401).json({
        error: 'Invalid Bureau credentials. Verify your operative handle and cipher.'
      });
    }

    // Update last login
    db.prepare('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?').run(user.id);
    const token = crypto.randomBytes(32).toString('hex');

    try {
      db.prepare(`
        INSERT INTO audit_trail (case_ref, officer, action, details)
        VALUES (?, ?, ?, ?)
      `).run(null, user.username, 'OPERATIVE_LOGIN', `Operative ${user.username} authenticated into the Bureau`);
    } catch (e) {}

    return res.json({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      passwordHash: user.password_hash,
      token,
      rememberMe: !!rememberMe,
      message: `Welcome back to active duty, Operative ${user.username}.`
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Authentication failed: ' + err.message });
  }
});

// Emergency Cipher Dispatch (Forgot Password)
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { username, email } = req.body;
    const identifier = String(username || email || '').trim();

    if (!identifier) {
      return res.status(400).json({ error: 'Please enter your registered operative username or dispatch email.' });
    }

    const user = db.prepare(`
      SELECT * FROM users 
      WHERE username = ? COLLATE NOCASE OR email = ? COLLATE NOCASE
    `).get(identifier, identifier.toLowerCase());

    if (!user) {
      return res.status(404).json({
        error: `No commissioned operative found under "${identifier}". Check your spelling or enlist a new operative.`
      });
    }

    // Generate renewed temporary password
    const tempPassword = 'ARG-' + crypto.randomBytes(3).toString('hex').toUpperCase() + '-' + Math.floor(100 + Math.random() * 900);
    const newHash = hashPassword(tempPassword);

    db.prepare('UPDATE users SET password_hash = ? WHERE id = ?').run(newHash, user.id);

    // Transmit email dispatch
    const mailResult = await sendRecoveryMail(user.email, user.username, tempPassword);

    // Mask email for user privacy display
    const parts = user.email.split('@');
    const local = parts[0];
    const domain = parts[1] || '';
    const maskedLocal = local.length <= 2 ? local + '***' : local[0] + '***' + local[local.length - 1];
    const maskedEmail = `${maskedLocal}@${domain}`;

    try {
      db.prepare(`
        INSERT INTO audit_trail (case_ref, officer, action, details)
        VALUES (?, ?, ?, ?)
      `).run(null, user.username, 'CIPHER_RENEWAL', `Emergency cipher dispatched to ${maskedEmail}`);
    } catch (e) {}

    return res.json({
      success: true,
      recipient: maskedEmail,
      message: `A secure cipher recovery dispatch has been transmitted to ${maskedEmail}.`,
      ...(mailResult.method === 'simulation' ? { dispatchNotice: `[Telegraph Simulation]: Temporary cipher is: ${tempPassword}` } : {})
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    return res.status(500).json({ error: 'Failed to transmit recovery dispatch: ' + err.message });
  }
});

// Verify active operative token / session
app.get('/api/auth/me', (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Operative username required.' });
    }

    const user = db.prepare('SELECT id, username, email, created_at, last_login FROM users WHERE username = ? COLLATE NOCASE').get(String(username).trim());
    if (!user) {
      return res.status(404).json({ error: 'Operative not found in ledger.' });
    }

    return res.json({ success: true, user });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

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

// Edit / Update case dossier
app.put('/api/cases/:caseRef', (req, res) => {
  try {
    const { caseRef } = req.params;
    const { title, priority, category, status, summary, notes, lead_officer } = req.body;

    const existing = db.prepare('SELECT * FROM cases WHERE case_ref = ?').get(caseRef);
    if (!existing) {
      return res.status(404).json({ success: false, error: 'Case not found' });
    }

    const updatedTitle = title !== undefined ? title : existing.title;
    const updatedPriority = priority !== undefined ? priority : existing.priority;
    const updatedCategory = category !== undefined ? category : existing.category;
    const updatedStatus = status !== undefined ? status : existing.status;
    const updatedSummary = summary !== undefined ? summary : existing.summary;
    const updatedNotes = notes !== undefined ? notes : existing.notes;
    const updatedLeadOfficer = lead_officer !== undefined ? lead_officer : existing.lead_officer;

    db.prepare(`
      UPDATE cases 
      SET title = ?, priority = ?, category = ?, status = ?, summary = ?, notes = ?, lead_officer = ?, updated_at = CURRENT_TIMESTAMP
      WHERE case_ref = ?
    `).run(updatedTitle, updatedPriority, updatedCategory, updatedStatus, updatedSummary, updatedNotes, updatedLeadOfficer, caseRef);

    db.prepare(`
      INSERT INTO audit_trail (case_ref, officer, action, details)
      VALUES (?, ?, ?, ?)
    `).run(caseRef, 'COMMAND', 'CASE_UPDATED', `Case dossier "${updatedTitle}" updated by bureau investigator.`);

    const updated = db.prepare('SELECT * FROM cases WHERE case_ref = ?').get(caseRef);
    res.json({ success: true, case: updated, message: 'Case updated successfully' });
  } catch (err) {
    console.error('Error updating case:', err);
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

// Toggle Work On / Work Off for a case dossier
app.post('/api/cases/:caseRef/work', (req, res) => {
  try {
    const { caseRef } = req.params;
    const { isWorking } = req.body;

    const caseData = db.prepare('SELECT id, title FROM cases WHERE case_ref = ?').get(caseRef);
    if (!caseData) return res.status(404).json({ success: false, error: 'Case not found' });

    if (isWorking) {
      // Set all other cases to 0, and this one to 1
      db.prepare(`UPDATE cases SET is_working_on = 0`).run();
      db.prepare(`UPDATE cases SET is_working_on = 1, updated_at = CURRENT_TIMESTAMP WHERE case_ref = ?`).run(caseRef);
      db.prepare(`
        INSERT INTO audit_trail (case_ref, officer, action, details)
        VALUES (?, ?, ?, ?)
      `).run(caseRef, 'ARGUS', 'WORK_ON', `Active investigation mobilized for case ${caseRef}: "${caseData.title}".`);
    } else {
      db.prepare(`UPDATE cases SET is_working_on = 0, updated_at = CURRENT_TIMESTAMP WHERE case_ref = ?`).run(caseRef);
      db.prepare(`
        INSERT INTO audit_trail (case_ref, officer, action, details)
        VALUES (?, ?, ?, ?)
      `).run(caseRef, 'ARGUS', 'WORK_OFF', `Active investigation stood down for case ${caseRef}.`);
    }

    res.json({ success: true, caseRef, is_working_on: isWorking ? 1 : 0 });
  } catch (err) {
    console.error('Error toggling case work:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// End and Archive Case
app.post('/api/cases/:caseRef/archive', (req, res) => {
  try {
    const { caseRef } = req.params;
    const caseData = db.prepare('SELECT id, title FROM cases WHERE case_ref = ?').get(caseRef);
    if (!caseData) return res.status(404).json({ success: false, error: 'Case not found' });

    db.prepare(`
      UPDATE cases 
      SET status = 'Solved', is_working_on = 0, updated_at = CURRENT_TIMESTAMP 
      WHERE case_ref = ?
    `).run(caseRef);

    db.prepare(`
      INSERT INTO audit_trail (case_ref, officer, action, details)
      VALUES (?, ?, ?, ?)
    `).run(caseRef, 'ARGUS', 'CASE_ARCHIVED', `Case dossier "${caseData.title}" sealed and filed into permanent archives.`);

    res.json({ success: true, message: `Case ${caseRef} has been sealed and archived.` });
  } catch (err) {
    console.error('Error archiving case:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Re-open Archived Case Dossier
app.post('/api/cases/:caseRef/reopen', (req, res) => {
  try {
    const { caseRef } = req.params;
    const caseData = db.prepare('SELECT id, title FROM cases WHERE case_ref = ?').get(caseRef);
    if (!caseData) return res.status(404).json({ success: false, error: 'Case not found' });

    db.prepare(`
      UPDATE cases 
      SET status = 'Active', is_working_on = 1, updated_at = CURRENT_TIMESTAMP 
      WHERE case_ref = ?
    `).run(caseRef);

    db.prepare(`
      INSERT INTO audit_trail (case_ref, officer, action, details)
      VALUES (?, ?, ?, ?)
    `).run(caseRef, 'ARGUS', 'CASE_REOPENED', `Archived case dossier "${caseData.title}" unsealed and returned to active investigation.`);

    res.json({ success: true, message: `Case ${caseRef} re-opened and returned to Active Dossier Ledger.` });
  } catch (err) {
    console.error('Error re-opening case:', err);
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

      // Comprehensive full-text document scanning (PDF, TXT, CSV, JSON, LOG, MD, XML, RTF)
      let extractedText = null;
      try {
        extractedText = await extractTextFromFile(file.path, file.originalname);
      } catch (err) {
        console.warn(`[Evidence Upload Scanner Warning] Could not extract text from ${file.originalname}:`, err.message);
      }

      const ext = path.extname(file.originalname).toLowerCase().replace('.', '');
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
        notes || `Registered into evidence custody by Officer ${assigned_officer}. Full text scanned.`,
        assigned_officer
      );

      inserted.push({
        id: result.lastInsertRowid,
        filename: file.filename,
        original_name: file.originalname,
        size: file.size,
        type: ext.toUpperCase(),
        hash,
        text_length: extractedText ? extractedText.length : 0
      });
    }

    db.prepare(`
      INSERT INTO audit_trail (case_ref, officer, action, details)
      VALUES (?, ?, ?, ?)
    `).run(caseRef, assigned_officer, 'EVIDENCE_LOGGED', `${inserted.length} evidence file(s) logged and text indexed.`);

    res.status(201).json({ success: true, count: inserted.length, evidence: inserted });
  } catch (err) {
    console.error('Error uploading evidence:', err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// Re-scan and extract text for all evidence items in a case
app.post('/api/cases/:caseRef/reextract', async (req, res) => {
  try {
    const { caseRef } = req.params;
    const evidenceList = db.prepare('SELECT id, file_path, original_name FROM evidence WHERE case_ref = ?').all(caseRef);
    let updated = 0;

    for (const item of evidenceList) {
      if (item.file_path && fs.existsSync(item.file_path)) {
        const text = await extractTextFromFile(item.file_path, item.original_name);
        if (text && text.length > 0) {
          db.prepare('UPDATE evidence SET extracted_text = ? WHERE id = ?').run(text, item.id);
          updated++;
        }
      }
    }

    res.json({ success: true, caseRef, updated, total: evidenceList.length });
  } catch (err) {
    console.error('Error re-extracting evidence:', err);
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

// Trigger Bureau Conclave investigation (or re-analysis)
app.post('/api/cases/:caseRef/conclave', async (req, res) => {
  const { caseRef } = req.params;
  const { isReAnalysis = false, approach = null } = req.body || {};

  try {
    // When conclave starts, mark case as actively being worked on
    db.prepare(`UPDATE cases SET is_working_on = 0`).run();
    db.prepare(`
      UPDATE cases 
      SET is_working_on = 1, conclave_count = COALESCE(conclave_count, 0) + 1, updated_at = CURRENT_TIMESTAMP 
      WHERE case_ref = ?
    `).run(caseRef);

    runBureauConclave({
      caseRef,
      isReAnalysis,
      approach,
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
      isReAnalysis,
      message: isReAnalysis
        ? 'Bureau Conclave re-convened with alternative analytical vector.'
        : 'Bureau Conclave convened. Real-time deliberations streaming on /api/cases/:caseRef/stream.'
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

    // Resolve target active case
    let targetCaseRef = caseRef;
    if (!targetCaseRef) {
      const latest = db.prepare('SELECT case_ref FROM cases ORDER BY updated_at DESC LIMIT 1').get();
      if (latest) targetCaseRef = latest.case_ref;
    }

    let caseContext = '';
    let caseItem = null;
    if (targetCaseRef) {
      caseItem = db.prepare('SELECT * FROM cases WHERE case_ref = ?').get(targetCaseRef);
      if (caseItem) {
        const evidence = db.prepare('SELECT original_name, file_type, forensic_notes, extracted_text FROM evidence WHERE case_ref = ?').all(targetCaseRef);
        const clues = db.prepare('SELECT title, description, type FROM clues WHERE case_ref = ?').all(targetCaseRef);
        const deliberations = db.prepare('SELECT officer_name, message FROM deliberations WHERE case_ref = ? ORDER BY created_at DESC LIMIT 4').all(targetCaseRef);
        const scanned = extractCaseEntities(targetCaseRef);

        caseContext = `
ACTIVE CASE UNDER INVESTIGATION:
- Dossier Reference: ${caseItem.case_ref}
- Title: ${caseItem.title}
- Crime Domain: ${scanned?.crimeDomain || 'Special Investigation'}
- Victim: ${scanned?.victimName || 'Identified in case files'} | Occurrence Window: ${scanned?.occurrenceWindow || 'Incident window'}
- Location: ${scanned?.sceneLocation || 'Crime scene venue'}
- Witnesses / Persons of Interest (${scanned?.witnesses?.length || 0}): ${scanned?.witnesses?.map(w => `${w.id}: ${w.name}`).join(', ') || 'Pending examination'}
- Suspects Under Scrutiny: ${scanned?.suspects?.slice(0, 4).map(s => s.name).join(', ') || 'Persons of interest identified from statements'}
- Key Physical & Digital Exhibits (${scanned?.exhibits?.length || evidence.length}): ${scanned?.exhibits?.map(e => `${e.id}: ${e.title}`).join(', ') || evidence.map(e => e.original_name).join(', ')}
- Forensic Evidence Files (${evidence.length}): ${evidence.length > 0 ? evidence.map(e => `[${e.original_name} (${e.file_type}): ${e.extracted_text ? e.extracted_text.slice(0, 1500) : e.forensic_notes || 'logged'}]`).join('\n\n') : 'No physical evidence registered yet.'}
- Evidence Board Clues & Suspects: ${clues.length > 0 ? clues.map(c => `${c.title} (${c.type}): ${c.description}`).join('; ') : 'Board graph being assembled.'}
${deliberations.length > 0 ? `- Recent Deliberations: ${deliberations.map(d => `${d.officer_name}: ${d.message.slice(0, 160)}...`).join(' | ')}` : ''}`;
      }
    }

    const interrogationSystemPrompt = `${profile.systemPrompt}

CURRENT OPERATIONAL PROTOCOL: 1-ON-1 INTERROGATION & DEBRIEF CHATBOT.
You are in an interactive, conversational interrogation session with the Lead Investigator (the user).
1. RESPOND CONVERSATIONALLY LIKE A DETECTIVE CHATBOT: Answer what the investigator is asking directly. Do not output a rigid conclave report. Speak naturally, sharply, and conversationally in your persona.
2. DISCUSS THE CURRENT CASE: Frame your answers around the active case: "${caseItem ? caseItem.title : 'Active Bureau File'}" (${targetCaseRef || 'No active case'}). If asked about suspects, alibis, evidence, motives, or findings, consult the case dossier below.
3. STAY IN CHARACTER:
   - Detective Argus: Chief command, motive analysis, evidence synthesis, tactical recommendations.
   - Detective Apex: Devil's advocate, finding holes in theories, questioning assumptions, alibi tests.
   - Officer Lutkin: Forensic laboratory tests, file hashes, toolmarks, forgery detection, physical artifacts.
   - Officer Vanguard: Perimeter surveillance, transit logs, rail depots, telegraph wire intercepts.
   - Officer Cortex: Analytical patterns, anomaly correlations, link graphs, probability assessments.
4. Keep answers focused, engaging, and concise (1 to 3 paragraphs). Always offer your deductive opinion and suggest what lead to follow next.

${caseContext}`;

    const messages = [
      ...history.map(h => ({ role: h.role, content: h.content })),
      { role: 'user', content: message }
    ];

    const result = await generateAgentCompletion({
      officerId,
      systemPrompt: interrogationSystemPrompt,
      preferredModel: profile.preferredModel,
      messages
    });

    if (targetCaseRef) {
      // Record both user question and agent reply in deliberations for collaborative inquiry history
      db.prepare(`
        INSERT INTO deliberations (case_ref, officer_name, role, action_type, message, model_used)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(targetCaseRef, 'Lead Investigator', 'Investigator Probe', 'interrogation_turn', `Investigator Question to ${profile.name}: "${message}"`, 'user_chat');

      db.prepare(`
        INSERT INTO deliberations (case_ref, officer_name, role, action_type, message, model_used)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(targetCaseRef, profile.name, profile.title, 'interrogation_response', result.content, result.modelUsed);
    }

    res.json({
      success: true,
      officer: officerId,
      name: profile.name,
      role: profile.title,
      reply: result.content,
      modelUsed: result.modelUsed,
      caseRef: targetCaseRef
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
    database: 'Secure Bureau Data Vault',
    uptime: process.uptime()
  });
});

// Wildcard SPA route (used in standalone local server when frontend is bundled)
if (!process.env.VERCEL && fs.existsSync(frontendDist)) {
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
}

// Export Express app
export default app;

// Start HTTP server for Vercel Express service & local development
app.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`★ ARGUS and Co. Investigation Bureau API is active`);
  console.log(`★ Port: http://localhost:${PORT}`);
  console.log(`★ Free AI Models Connected via OpenRouter`);
  console.log(`======================================================\n`);
});
