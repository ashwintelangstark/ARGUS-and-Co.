import React from 'react';

/**
 * Universal Bureau Text Formatter for ARGUS & Co.
 * Eliminates raw markdown syntax, unrendered LaTeX symbols, stray asterisks,
 * and converts raw markdown tables into beautifully aligned vintage bureau tables.
 */

// Cleans text specifically for Voice Synthesis & spoken audio
export function cleanSpokenText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  return rawText
    // Remove markdown table divider rows (e.g. |---|---|)
    .replace(/\|[\s-:]+\|[\s-|:]*/g, ' ')
    // Replace table pipes with natural pauses
    .replace(/\|/g, ', ')
    // Replace LaTeX tokens and math symbols with spoken English equivalents
    .replace(/\\approx|≈≈|≈/g, ' approximately ')
    .replace(/\\sim|~/g, ' around ')
    .replace(/\\pm|±/g, ' plus or minus ')
    .replace(/\\times|×/g, ' times ')
    .replace(/\\le|<=|≤/g, ' less than or equal to ')
    .replace(/\\ge|>=|≥/g, ' greater than or equal to ')
    .replace(/\\neq|!=|≠/g, ' does not equal ')
    .replace(/\\\$/g, ' dollars ')
    .replace(/\$/g, '')
    // Remove HTML linebreaks
    .replace(/<br\s*\/?>/gi, ' ')
    // Remove markdown headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold and italic asterisks
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    // Remove raw asterisks or bullets
    .replace(/[*#`~[\]]/g, '')
    // Expand common acronyms for clearer pronunciation
    .replace(/\bSHA-256\b/g, 'S-H-A 256')
    .replace(/\bCCTV\b/g, 'security camera')
    .replace(/\bOSINT\b/g, 'open source intelligence')
    .replace(/\bUTC\b/g, 'U-T-C')
    .replace(/\s+/g, ' ')
    .trim();
}

// Cleans text for plain presentation without any markdown symbols
export function cleanPresentationText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';

  return rawText
    // Remove table lines and pipe delimiters
    .replace(/\|[\s-:]+\|[\s-|:]*/g, '')
    .replace(/^\||\|$/gm, '')
    .replace(/\|/g, ' · ')
    // Clean LaTeX tokens
    .replace(/\\approx|≈≈/g, '≈')
    .replace(/\\pm/g, '±')
    .replace(/\\times/g, '×')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\\$/g, '$')
    .replace(/\$/g, '')
    // Clean HTML breaks
    .replace(/<br\s*\/?>/gi, '\n')
    // Remove header hashes
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic asterisks
    .replace(/\*{1,3}([^*]+)\*{1,3}/g, '$1')
    .replace(/_{1,3}([^_]+)_{1,3}/g, '$1')
    // Remove standalone asterisks or markdown artifacts
    .replace(/^\s*[*•-]\s+/gm, '• ')
    .replace(/[*~`]/g, '')
    .replace(/\[|\]/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

// Parses inline text (handles bold, italic, code tags, and breaks without asterisks)
function renderInlineContent(text) {
  if (!text) return null;

  // Clean LaTeX math symbols
  let cleaned = text
    .replace(/\\approx|≈≈/g, '≈')
    .replace(/\\pm/g, '±')
    .replace(/\\times/g, '×')
    .replace(/\\le/g, '≤')
    .replace(/\\ge/g, '≥')
    .replace(/\\sim/g, '~')
    .replace(/\\\$/g, '$')
    .replace(/\$([^$]+)\$/g, '$1');

  // Split on HTML <br> tags
  const brParts = cleaned.split(/<br\s*\/?>/gi);

  return brParts.map((brSegment, brIdx) => {
    // Regex for bold (**text**), code (`text`), italic (*text*)
    const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g;
    const tokens = brSegment.split(tokenRegex);

    return (
      <React.Fragment key={brIdx}>
        {brIdx > 0 && <br />}
        {tokens.map((token, tIdx) => {
          if (!token) return null;

          // Bold: **text** -> clean <strong> without asterisks
          if (token.startsWith('**') && token.endsWith('**') && token.length > 4) {
            const inner = token.slice(2, -2).trim();
            return (
              <strong key={tIdx} className="font-bold text-[#1f1208] text-inherit">
                {inner}
              </strong>
            );
          }

          // Monospace Code: `text`
          if (token.startsWith('`') && token.endsWith('`') && token.length > 2) {
            const inner = token.slice(1, -1).trim();
            return (
              <code key={tIdx} className="font-mono-code text-[11px] px-1 py-0.5 bg-[#e4d3ba] text-[#3e2513] rounded border border-[#caa880]">
                {inner}
              </code>
            );
          }

          // Italic: *text* -> clean <em> without asterisks
          if (token.startsWith('*') && token.endsWith('*') && token.length > 2) {
            const inner = token.slice(1, -1).trim();
            return (
              <em key={tIdx} className="italic text-[#3a2312] text-inherit">
                {inner}
              </em>
            );
          }

          // Clean any stray asterisks from plain segments
          const plain = token.replace(/\*/g, '');
          return <span key={tIdx}>{plain}</span>;
        })}
      </React.Fragment>
    );
  });
}

/**
 * Main BureauContentRenderer Component
 * Parses blocks into tables, clean headers, bullet lists, and paragraphs.
 */
export default function BureauContentRenderer({ content, className = '' }) {
  if (!content || typeof content !== 'string') {
    return <p className="text-xs text-[#705235] italic">No record data logged.</p>;
  }

  // Pre-clean escaped characters and CRLF
  const normalized = content
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim();

  // Split into lines to detect markdown tables and structure
  const lines = normalized.split('\n');
  const elements = [];
  let lineIdx = 0;

  while (lineIdx < lines.length) {
    const rawLine = lines[lineIdx].trim();

    if (!rawLine) {
      lineIdx++;
      continue;
    }

    // 1. Detect Markdown Table (line starts with | and next line is |---|)
    if (rawLine.startsWith('|') && lineIdx + 1 < lines.length && /\|[\s-:]+\|/.test(lines[lineIdx + 1])) {
      const tableLines = [rawLine];
      lineIdx++; // skip header

      // separator row
      tableLines.push(lines[lineIdx].trim());
      lineIdx++;

      // collect row lines
      while (lineIdx < lines.length && lines[lineIdx].trim().startsWith('|')) {
        tableLines.push(lines[lineIdx].trim());
        lineIdx++;
      }

      // Parse table headers
      const headerCells = tableLines[0]
        .split('|')
        .slice(1, -1)
        .map(h => h.trim());

      // Parse table body rows
      const bodyRows = tableLines.slice(2).map(rowStr => {
        return rowStr
          .split('|')
          .slice(1, -1)
          .map(cell => cell.trim());
      });

      elements.push(
        <div key={`table-${elements.length}`} className="my-3 overflow-x-auto rounded border-2 border-[#9b784f] shadow-sm bg-[#ebdcc2]">
          <table className="bureau-table w-full text-left border-collapse font-elite text-xs">
            <thead>
              <tr className="bg-[#382313] text-[#faebd7] border-b-2 border-[#805934]">
                {headerCells.map((h, i) => (
                  <th key={i} className="py-2 px-3 font-rye font-normal text-[11px] tracking-wide border-r border-[#694423] last:border-r-0">
                    {renderInlineContent(h)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {bodyRows.map((row, rIdx) => (
                <tr 
                  key={rIdx} 
                  className={`border-b border-[#cca77c] transition-colors ${
                    rIdx % 2 === 0 ? 'bg-[#f7efe4]' : 'bg-[#eedec7]'
                  }`}
                >
                  {row.map((c, cIdx) => (
                    <td key={cIdx} className="py-2 px-3 leading-relaxed text-[#2a190e] border-r border-[#d4b48d] last:border-r-0 align-top">
                      {renderInlineContent(c)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // 2. Detect Section Headers (##, ###, or **[ARGUS ... ]**)
    if (/^(#{1,6}\s+|\*\*\[|\[ARGUS)/.test(rawLine)) {
      const cleanHeader = rawLine
        .replace(/^#{1,6}\s+/, '')
        .replace(/^\*\*\[?/, '')
        .replace(/\]?\*\*$/, '')
        .replace(/\*/g, '')
        .trim();

      elements.push(
        <div key={`header-${elements.length}`} className="mt-3.5 mb-2 pb-1 border-b border-[#a17e55]/50 flex items-center justify-between">
          <h4 className="font-rye text-xs md:text-sm text-[#422613] tracking-wide">
            {cleanHeader}
          </h4>
          <span className="font-mono-code text-[9px] text-[#785331] uppercase">VERIFIED ENTRY</span>
        </div>
      );
      lineIdx++;
      continue;
    }

    // 3. Detect Bullet Points (•, -, or *)
    if (/^([•*-]|\d+\.)\s+/.test(rawLine)) {
      const cleanBullet = rawLine.replace(/^([•*-]|\d+\.)\s+/, '').trim();
      elements.push(
        <div key={`bullet-${elements.length}`} className="flex items-start gap-2 my-1 pl-1 text-xs leading-relaxed text-[#2c1a0f]">
          <span className="text-[#966b40] font-bold select-none">•</span>
          <div className="flex-1">
            {renderInlineContent(cleanBullet)}
          </div>
        </div>
      );
      lineIdx++;
      continue;
    }

    // 4. Detect Divider lines (--- or ===)
    if (/^[=-]{3,}$/.test(rawLine)) {
      elements.push(
        <div key={`divider-${elements.length}`} className="my-3 border-t border-dashed border-[#a68056]/60" />
      );
      lineIdx++;
      continue;
    }

    // 5. Standard Narrative Paragraph
    elements.push(
      <p key={`para-${elements.length}`} className="my-1.5 leading-relaxed text-xs sm:text-[13px] text-[#2c1c11] whitespace-normal">
        {renderInlineContent(rawLine)}
      </p>
    );
    lineIdx++;
  }

  return <div className={`bureau-formatted-text font-elite ${className}`}>{elements}</div>;
}

