import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbDir = path.join(__dirname, 'data');
if (!fs.existsSync(dbDir)) {
  try {
    fs.mkdirSync(dbDir, { recursive: true });
  } catch (e) {
    console.warn('[DB mkdir warning]:', e.message);
  }
}

let dbPath = path.join(dbDir, 'argus.sqlite');

// On Vercel environments, ensure writable SQLite database in /tmp
if (process.env.VERCEL) {
  const tmpDb = path.join('/tmp', 'argus.sqlite');
  if (!fs.existsSync(tmpDb)) {
    if (fs.existsSync(dbPath)) {
      try {
        fs.copyFileSync(dbPath, tmpDb);
      } catch (e) {
        console.warn('[DB copy to /tmp warning]:', e.message);
      }
    }
  }
  dbPath = tmpDb;
}

const db = new DatabaseSync(dbPath);

// Enable safe journal mode and foreign keys
try {
  if (process.env.VERCEL) {
    db.exec(`PRAGMA journal_mode = DELETE;`);
  } else {
    db.exec(`PRAGMA journal_mode = WAL;`);
  }
  db.exec(`PRAGMA foreign_keys = ON;`);
} catch (e) {
  console.warn('[DB Pragma warning]:', e.message);
}

export function initDatabase() {
  // Cases table
  db.exec(`
    CREATE TABLE IF NOT EXISTS cases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_ref TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      priority TEXT DEFAULT 'High',
      category TEXT DEFAULT 'Classified Investigation',
      status TEXT DEFAULT 'Active',
      summary TEXT,
      notes TEXT,
      lead_officer TEXT DEFAULT 'ARGUS',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Evidence files table
  db.exec(`
    CREATE TABLE IF NOT EXISTS evidence (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_ref TEXT NOT NULL,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      file_path TEXT NOT NULL,
      file_size INTEGER NOT NULL,
      file_type TEXT NOT NULL,
      hash_sha256 TEXT,
      extracted_text TEXT,
      metadata_json TEXT,
      forensic_notes TEXT,
      assigned_officer TEXT DEFAULT 'LUTKIN',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (case_ref) REFERENCES cases (case_ref) ON DELETE CASCADE
    );
  `);

  // Clues and Investigation Board items (pinned photos, evidence cards, suspect profiles)
  db.exec(`
    CREATE TABLE IF NOT EXISTS clues (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_ref TEXT NOT NULL,
      title TEXT NOT NULL,
      type TEXT NOT NULL, -- 'suspect', 'evidence', 'document', 'location', 'hypothesis'
      description TEXT,
      pos_x REAL DEFAULT 0,
      pos_y REAL DEFAULT 0,
      pos_z REAL DEFAULT 0,
      image_url TEXT,
      connections TEXT DEFAULT '[]', -- JSON string array of connected clue IDs
      status TEXT DEFAULT 'unresolved',
      color TEXT DEFAULT '#d9c49b',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (case_ref) REFERENCES cases (case_ref) ON DELETE CASCADE
    );
  `);

  // Multi-agent deliberation logs / Chat messages
  db.exec(`
    CREATE TABLE IF NOT EXISTS deliberations (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_ref TEXT NOT NULL,
      officer_name TEXT NOT NULL,
      role TEXT NOT NULL,
      action_type TEXT NOT NULL, -- 'conclave_turn', 'forensics', 'intel_brief', 'counter_analysis', 'verdict', 'chat'
      message TEXT NOT NULL,
      model_used TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (case_ref) REFERENCES cases (case_ref) ON DELETE CASCADE
    );
  `);

  // Investigation Reports
  db.exec(`
    CREATE TABLE IF NOT EXISTS reports (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_ref TEXT NOT NULL,
      title TEXT NOT NULL,
      executive_summary TEXT NOT NULL,
      forensic_findings TEXT,
      intel_summary TEXT,
      anomaly_detection TEXT,
      defense_critique TEXT,
      conclusions TEXT NOT NULL,
      full_report_text TEXT NOT NULL,
      generated_by TEXT DEFAULT 'BUREAU_AI_CONCLAVE',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (case_ref) REFERENCES cases (case_ref) ON DELETE CASCADE
    );
  `);

  // Bureau activity & audit trail
  db.exec(`
    CREATE TABLE IF NOT EXISTS audit_trail (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      case_ref TEXT,
      officer TEXT DEFAULT 'SYSTEM',
      action TEXT NOT NULL,
      details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Safe migrations for runtime schema evolution
  try {
    db.exec(`ALTER TABLE cases ADD COLUMN is_working_on INTEGER DEFAULT 0;`);
  } catch (e) {}
  try {
    db.exec(`ALTER TABLE cases ADD COLUMN investigation_approach TEXT DEFAULT 'Standard Forensic Vector';`);
  } catch (e) {}
  try {
    db.exec(`ALTER TABLE cases ADD COLUMN conclave_count INTEGER DEFAULT 0;`);
  } catch (e) {}

  // Only seed dummy cases if explicitly requested via environment variable
  if (process.env.SEED_DUMMY_CASES === 'true') {
    seedDefaultData();
  }
}

function seedDefaultData() {
  const caseCount = db.prepare('SELECT COUNT(*) as count FROM cases').get();
  if (caseCount && caseCount.count > 0) return;

  console.log('[DB] Seeding default case dossiers for ARGUS and Co...');

  const insertCase = db.prepare(`
    INSERT INTO cases (case_ref, title, priority, category, status, summary, notes, lead_officer)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertEvidence = db.prepare(`
    INSERT INTO evidence (case_ref, filename, original_name, file_path, file_size, file_type, hash_sha256, extracted_text, forensic_notes, assigned_officer)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertClue = db.prepare(`
    INSERT INTO clues (case_ref, title, type, description, pos_x, pos_y, image_url, connections, color)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const insertAudit = db.prepare(`
    INSERT INTO audit_trail (case_ref, officer, action, details)
    VALUES (?, ?, ?, ?)
  `);

  // Case 1
  insertCase.run(
    'ARG-1891-001',
    'The Vanishing Ledger of Silvercreek Trust',
    'High',
    'Financial Syndicate Fraud',
    'Active',
    'Silvercreek Trust bank vault breach. Encrypted telegraph ribbons, forged certificates of deposit, and missing bullion transit records.',
    'Intake notes: Multiple conflicting manifests discovered in the Frontier District branch. Vault door showed zero mechanical forced entry; electronic/chronometer clockwork tampered with.',
    'ARGUS'
  );

  insertEvidence.run(
    'ARG-1891-001',
    'vault_chronometer_log.csv',
    'vault_chronometer_log.csv',
    'uploads/vault_chronometer_log.csv',
    4280,
    'CSV',
    'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    'Timestamp: 02:41:19 AM - Door Sensor Bypass Triggered. Master Key override token 0x9AF8.',
    'Officer Lutkin: Cryptographic signature mismatch on audit log entry 442.',
    'LUTKIN'
  );

  insertEvidence.run(
    'ARG-1891-001',
    'intercepted_telegram_cipher.txt',
    'intercepted_telegram_cipher.txt',
    'uploads/intercepted_telegram_cipher.txt',
    1024,
    'TXT',
    '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    'CIPHER TRANS: NIGHT COURIER ARRIVING PIER 9 AT DAWN. PACKET MARKED BLACK OAK. DISPERSE BULLION TO SUB-NET.',
    'Officer Vanguard: Wire intercepted at regional switching station 7.',
    'VANGUARD'
  );

  insertClue.run(
    'ARG-1891-001',
    'Vault Clockwork Bypass',
    'evidence',
    'Bypass occurred at 02:41:19 AM without acoustic alarm activation.',
    -2.5, 1.2,
    null,
    JSON.stringify([2, 3]),
    '#00d2ff'
  );

  insertClue.run(
    'ARG-1891-001',
    'Suspect: Elias Vance (Vault Custodian)',
    'suspect',
    'Alibi claimed he was off duty; railway transit punch card shows him 2 miles from station.',
    0.0, 1.8,
    null,
    JSON.stringify([1, 4]),
    '#f59e0b'
  );

  insertClue.run(
    'ARG-1891-001',
    'Pier 9 Intercept',
    'location',
    'Destination coordinates referenced in decrypted telegraph cipher.',
    2.2, 0.8,
    null,
    JSON.stringify([1]),
    '#10b981'
  );

  insertClue.run(
    'ARG-1891-001',
    'The Black Oak Cartel',
    'hypothesis',
    'Organized syndicate specializing in covert port extraction and forged manifests.',
    0.5, -0.8,
    null,
    JSON.stringify([2]),
    '#a855f7'
  );

  insertAudit.run('ARG-1891-001', 'ARGUS', 'DOSSIER_OPENED', 'Initial case intake registered and evidence secured in bureau vault.');

  // Case 2
  insertCase.run(
    'ARG-1891-002',
    'The Obsidian Syndicate Infiltration',
    'Critical',
    'Counter-Espionage & Cybernetics',
    'Active',
    'Multi-jurisdictional syndicate intercepting telegraph networks using synthetic agent identities.',
    'Intake notes: Three telegraph operators reported ghostly automated signal repetitions at 03:00 hours every Tuesday.',
    'APEX'
  );

  insertEvidence.run(
    'ARG-1891-002',
    'carrier_wave_frequency.dat',
    'carrier_wave_frequency.dat',
    'uploads/carrier_wave_frequency.dat',
    8192,
    'DAT',
    '1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b',
    'Audio harmonic analysis indicates 14.4 kHz carrier frequency with modulated binary packets.',
    'Officer Cortex: Mathematical Fourier transform isolates a repeating machine handshake.',
    'CORTEX'
  );

  insertAudit.run('ARG-1891-002', 'APEX', 'DOSSIER_OPENED', 'Critical threat tier assigned. Multi-agent surveillance activated.');

  console.log('[DB] Database seeded successfully.');
}

export default db;
