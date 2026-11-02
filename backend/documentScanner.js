import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/**
 * Universal document text extractor supporting PDF, TXT, CSV, JSON, LOG, MD, HTML, XML, RTF
 */
export async function extractTextFromFile(filePath, originalName) {
  if (!fs.existsSync(filePath)) {
    console.warn(`[DocumentScanner] File not found: ${filePath}`);
    return null;
  }

  const ext = path.extname(originalName || filePath).toLowerCase().replace('.', '');
  const fileBuffer = fs.readFileSync(filePath);

  if (ext === 'pdf') {
    try {
      const { PDFParse } = require('pdf-parse');
      const parser = new PDFParse(new Uint8Array(fileBuffer));
      const res = await parser.getText();
      if (res && res.text) {
        return res.text.trim();
      }
    } catch (err) {
      console.error(`[DocumentScanner] PDF extraction error for "${originalName}":`, err.message);
    }
    return null;
  }

  if (['txt', 'csv', 'json', 'log', 'md', 'xml', 'html', 'rtf'].includes(ext)) {
    try {
      return fileBuffer.toString('utf-8').trim();
    } catch (err) {
      console.error(`[DocumentScanner] Text extraction error for "${originalName}":`, err.message);
      return null;
    }
  }

  return null;
}

/**
 * Scans all evidence records in the database and extracts text for any record where extracted_text is missing
 */
export async function backfillMissingEvidenceText(db) {
  try {
    const unextracted = db.prepare(`
      SELECT id, case_ref, file_path, original_name, file_type 
      FROM evidence 
      WHERE extracted_text IS NULL OR trim(extracted_text) = ''
    `).all();

    if (!unextracted || unextracted.length === 0) {
      console.log('[DocumentScanner] All evidence records have full extracted text.');
      return 0;
    }

    console.log(`[DocumentScanner] Found ${unextracted.length} evidence items needing text extraction. Scanning...`);
    let count = 0;

    for (const item of unextracted) {
      if (item.file_path && fs.existsSync(item.file_path)) {
        const text = await extractTextFromFile(item.file_path, item.original_name);
        if (text && text.length > 0) {
          db.prepare('UPDATE evidence SET extracted_text = ? WHERE id = ?').run(text, item.id);
          count++;
          console.log(`[DocumentScanner] Extracted ${text.length} chars for Evidence #${item.id} ("${item.original_name}")`);
        }
      }
    }

    console.log(`[DocumentScanner] Completed extraction. Updated ${count}/${unextracted.length} records.`);
    return count;
  } catch (err) {
    console.error('[DocumentScanner] Error during backfill scan:', err.message);
    return 0;
  }
}
