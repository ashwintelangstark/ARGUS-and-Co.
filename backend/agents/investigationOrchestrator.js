import { generateAgentCompletion } from '../openrouter.js';
import { AGENT_PROFILES } from './agentPrompts.js';
import { extractCaseEntities, generateUniversalCaseDeductions, generateExpansiveCluesWeb } from './universalCaseAnalyzer.js';
import db from '../database.js';

/**
 * Runs a full 5-stage Autonomous Bureau Conclave investigation
 * Broadcasts progress events via callback for real-time SSE streaming
 */
export async function runBureauConclave({ 
  caseRef, 
  isReAnalysis = false, 
  approach = null, 
  onProgress 
}) {
  console.log(`[Conclave] Starting multi-agent investigation for case: ${caseRef} (ReAnalysis: ${isReAnalysis})`);

  // 1. Fetch case details, evidence, and existing clues
  const caseData = db.prepare('SELECT * FROM cases WHERE case_ref = ?').get(caseRef);
  if (!caseData) throw new Error(`Case ${caseRef} not found in database`);

  const evidenceList = db.prepare('SELECT * FROM evidence WHERE case_ref = ? ORDER BY id ASC').all(caseRef);
  const userInterrogations = db.prepare(`
    SELECT officer_name, role, message, created_at 
    FROM deliberations 
    WHERE case_ref = ? AND action_type IN ('interrogation_turn', 'interrogation_response')
    ORDER BY id ASC
  `).all(caseRef);

  const emit = (event, payload) => {
    if (typeof onProgress === 'function') {
      onProgress(event, payload);
    }
  };

  emit('status', {
    stage: 'CONVENING',
    message: isReAnalysis
      ? `Detective Argus has re-convened the Bureau Conclave for case ${caseRef}: "${caseData.title}" under an alternative investigative vector.`
      : `Detective Argus has convened the Bureau Conclave for case ${caseRef}: "${caseData.title}"`
  });

  const scannedEntities = extractCaseEntities(caseRef);

  const interrogationSection = userInterrogations.length > 0 ? `
================================================================================
CRITICAL LEAD INVESTIGATOR INTERROGATION INQUIRIES & RE-ANALYSIS PROBES:
The Lead Investigator held interactive 1-on-1 interrogation sessions with the agents.
The squad must address, stress-test, and recalculate everything incorporating these points:
${userInterrogations.map(u => `• [${u.officer_name}]: ${u.message}`).join('\n\n')}
================================================================================` : '';

  // Build the rich, complete case evidence summary (NEVER truncate extracted text!)
  const caseContextSummary = `
===============================================================================
CASE DOSSIER: ${caseData.case_ref} — "${caseData.title}"
CRIME DOMAIN: ${scannedEntities?.crimeDomain || caseData.category || 'Special Investigation'}
CATEGORY: ${caseData.category} | PRIORITY: ${caseData.priority} | STATUS: ${caseData.status}
${isReAnalysis ? 'MODE: RE-ANALYSIS (Recalculate from scratch — Incorporate investigator probes, challenge baseline assumptions, uncover concealed motives)' : 'MODE: STANDARD BUREAU CONCLAVE'}
CASE SUMMARY: ${caseData.summary || 'None'}
INTAKE NOTES: ${caseData.notes || 'None'}

PRIMARY VICTIM / TARGET: ${scannedEntities?.victimName || 'Identified in case files'}
CRIME SCENE & LOCATION: ${scannedEntities?.sceneLocation || 'Primary incident scene'}
OCCURRENCE WINDOW: ${scannedEntities?.occurrenceWindow || 'Temporal incident window'}
===============================================================================
${interrogationSection}

REGISTERED EVIDENCE DOSSIER & FULL DOCUMENT TRANSCRIPTS (${evidenceList.length} items):
${evidenceList.length > 0 ? evidenceList.map((e, idx) => `
--------------------------------------------------------------------------------
EXHIBIT #${idx + 1}: [${e.file_type.toUpperCase()}] "${e.original_name}" (${e.file_size} bytes)
SHA-256 HASH: ${e.hash_sha256 || 'Calculated at intake'}
FORENSIC NOTES: ${e.forensic_notes || 'Pending examination'}
FULL EXTRACTED DOCUMENT TEXT:
${e.extracted_text ? e.extracted_text : '(No text extracted / Binary asset)'}
--------------------------------------------------------------------------------`).join('\n\n') : 'NO EVIDENCE FILES LOGGED BY USER.'}
  `.trim();

  const conversationHistory = [];

  // Helper to record deliberation in DB and emit to client
  const recordTurn = (officerKey, actionType, message, modelUsed) => {
    const profile = AGENT_PROFILES[officerKey];
    const stmt = db.prepare(`
      INSERT INTO deliberations (case_ref, officer_name, role, action_type, message, model_used)
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(caseRef, profile.name, profile.title, actionType, message, modelUsed);

    emit('turn', {
      id: result.lastInsertRowid,
      officer: officerKey,
      name: profile.name,
      role: profile.title,
      accentColor: profile.accentColor,
      avatarFace: profile.avatarFace,
      actionType,
      message,
      modelUsed,
      timestamp: new Date().toISOString()
    });

    conversationHistory.push({
      role: 'assistant',
      name: officerKey,
      content: `[${profile.name} — ${profile.title}]: ${message}`
    });
  };

  const delay = (ms) => new Promise(r => setTimeout(r, ms));

  // =========================================================================
  // STAGE 1: ARGUS Opening & Mission Directives
  // =========================================================================
  emit('status', { 
    stage: 'ARGUS_OPENING', 
    message: isReAnalysis
      ? 'Detective Argus is opening the Re-Analysis Conclave with an alternative deductive paradigm...'
      : 'Detective Argus is opening the investigation briefing...' 
  });

  const argusIntroPrompt = isReAnalysis
    ? `You are opening the RE-ANALYSIS Conclave for case "${caseData.title}". State that the bureau is discarding superficial assumptions. Direct the squad to scrutinize the full evidence transcripts above: every witness statement, alibi contradiction, timeline gap, and physical exhibit. Task Officer Lutkin with re-examining the physical and digital exhibits.`
    : `You are opening the Bureau Conclave for case "${caseData.title}". Thoroughly review the uploaded evidence dossier and transcripts above. State the core facts: victim, location, occurrence window, and identify key persons of interest and physical exhibits from the files. Task Officer Lutkin with the initial empirical forensic examination.`;

  const argusIntro = await generateAgentCompletion({
    officerId: 'ARGUS',
    systemPrompt: AGENT_PROFILES.ARGUS.systemPrompt,
    preferredModel: AGENT_PROFILES.ARGUS.preferredModel,
    messages: [
      { role: 'user', content: `${caseContextSummary}\n\nTask: ${argusIntroPrompt}` }
    ]
  });
  recordTurn('ARGUS', 'conclave_turn', argusIntro.content, argusIntro.modelUsed);

  // =========================================================================
  // STAGE 2: LUTKIN Forensic Examination
  // =========================================================================
  await delay(1000);
  emit('status', { 
    stage: 'LUTKIN_FORENSICS', 
    message: 'Officer Lutkin is verifying digital checksums, file formats, and physical trace integrity across all exhibits...' 
  });

  const lutkinPrompt = `MANDATORY FORENSIC PROTOCOL: Carefully examine the full evidence transcripts provided above. Analyze every physical and digital exhibit mentioned in the dossier (such as CCTV/NVR footage gaps, beverage service containers, handwritten notes, wall clock mechanisms, door latches, and maintenance work orders). Cite specific exhibit numbers and technical findings based strictly on the case files.`;

  const lutkinResponse = await generateAgentCompletion({
    officerId: 'LUTKIN',
    systemPrompt: AGENT_PROFILES.LUTKIN.systemPrompt,
    preferredModel: AGENT_PROFILES.LUTKIN.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Lutkin, report your forensic findings on the evidence register. ${lutkinPrompt}` }
    ]
  });
  recordTurn('LUTKIN', 'forensics', lutkinResponse.content, lutkinResponse.modelUsed);

  // =========================================================================
  // STAGE 3: VANGUARD Field Intelligence & Witness Statements
  // =========================================================================
  await delay(1000);
  emit('status', { 
    stage: 'VANGUARD_INTEL', 
    message: 'Officer Vanguard is analyzing witness statements, movement logs, and physical transit corridors...' 
  });

  const vanguardPrompt = `MANDATORY FIELD PROTOCOL: Examine all witness statements in the evidence files above. Detail the accounts and alibis of every interviewed person (including event organizers, security, service staff, guests, business associates, trustees, and maintenance personnel). Highlight who was near the scene during the occurrence window, who had tense discussions with the victim, and whose alibis are uncorroborated.`;

  const vanguardResponse = await generateAgentCompletion({
    officerId: 'VANGUARD',
    systemPrompt: AGENT_PROFILES.VANGUARD.systemPrompt,
    preferredModel: AGENT_PROFILES.VANGUARD.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Vanguard, provide your field intelligence and witness analysis. ${vanguardPrompt}` }
    ]
  });
  recordTurn('VANGUARD', 'intel_brief', vanguardResponse.content, vanguardResponse.modelUsed);

  // =========================================================================
  // STAGE 4: CORTEX Anomaly Detection & Link Graph (MMO Matrix)
  // =========================================================================
  await delay(1000);
  emit('status', { 
    stage: 'CORTEX_PATTERNS', 
    message: 'Officer Cortex is calculating Means-Motive-Opportunity correlation matrices and anomaly clusters...' 
  });

  const cortexPrompt = `MANDATORY ANALYTICS PROTOCOL: Cross-correlate the forensic evidence from Officer Lutkin with the witness testimonies from Officer Vanguard. Build the Means, Motive, and Opportunity (MMO) matrix for every person of interest. Map the exact minute-by-minute timeline anomalies during the occurrence window and isolate the probability vectors identifying the primary culprit and any inside facilitators.`;

  const cortexResponse = await generateAgentCompletion({
    officerId: 'CORTEX',
    systemPrompt: AGENT_PROFILES.CORTEX.systemPrompt,
    preferredModel: AGENT_PROFILES.CORTEX.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Cortex, deliver your correlation matrix, MMO evaluation, and link graph analysis. ${cortexPrompt}` }
    ]
  });
  recordTurn('CORTEX', 'counter_analysis', cortexResponse.content, cortexResponse.modelUsed);

  // =========================================================================
  // STAGE 5: APEX Independent Challenge & Red-Teaming
  // =========================================================================
  await delay(1000);
  emit('status', { 
    stage: 'APEX_REVIEW', 
    message: 'Detective Apex is red-teaming working hypotheses, cross-examining alibis, and isolating fatal contradictions...' 
  });

  const apexPrompt = `MANDATORY ADVERSARIAL PROTOCOL: As Deputy Investigation Officer, ruthlessly cross-examine the theories presented. Challenge defense arguments (e.g. outside intruder theories vs. inside access). Scrutinize suspect statements for unprompted guilty admissions, conflicting clock times, or collapsed alibis. Ensure that all reasonable doubt is dismantled before Chief Argus issues warrants.`;

  const apexResponse = await generateAgentCompletion({
    officerId: 'APEX',
    systemPrompt: AGENT_PROFILES.APEX.systemPrompt,
    preferredModel: AGENT_PROFILES.APEX.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Detective Apex, present your independent counter-examination and alibi critique. ${apexPrompt}` }
    ]
  });
  recordTurn('APEX', 'counter_analysis', apexResponse.content, apexResponse.modelUsed);

  // =========================================================================
  // STAGE 6: ARGUS Chief Verdict & Final Resolution
  // =========================================================================
  await delay(1000);
  emit('status', { 
    stage: 'ARGUS_VERDICT', 
    message: 'Detective Argus is formulating the Bureau Chief Final Verdict and Apprehension Directives...' 
  });

  const argusVerdictPrompt = `You are Detective Argus, Chief Investigation Officer. You must deliver the definitive, unequivocal case resolution based strictly on the facts, evidence, and witness testimonies presented.
MANDATORY PROTOCOL:
1. Reconcile all forensic findings, witness statements, timeline anomalies, and red-team critiques.
2. Structure your final verdict with crystal clarity using the following exact required format:

================================================================================
OFFICIAL CASE RESOLUTION & VERDICT BREAKDOWN:
================================================================================
• PRIMARY CULPRIT: [State exact name and affiliation of the perpetrator from the case files]
• ACCOMPLICE / CONFEDERATE: [State accomplice or inside facilitator if applicable]
• SPECIFIC MOTIVE: [Explain why the crime was committed based on the evidence]
• OPPORTUNITY & CORRIDOR OF ACCESS: [Detail the exact timeline and physical route used]
• MEANS & MODUS OPERANDI: [Detail how the victim was lured, confronted, and killed]
• DECISIVE EVIDENCE & FATAL CONTRADICTION: [Detail the specific unshakeable proof and alibi collapse that proves guilt]
• EXECUTIVE APPREHENSION DIRECTIVE: [Official command issuing arrest warrants]
================================================================================`;

  const argusVerdict = await generateAgentCompletion({
    officerId: 'ARGUS',
    systemPrompt: AGENT_PROFILES.ARGUS.systemPrompt,
    preferredModel: AGENT_PROFILES.ARGUS.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: argusVerdictPrompt }
    ]
  });
  recordTurn('ARGUS', 'verdict', argusVerdict.content, argusVerdict.modelUsed);

  // =========================================================================
  // STAGE 7: Autonomous Detective Flowchart & Clues Generation (Clues & Suspect Web)
  // =========================================================================
  emit('status', { 
    stage: 'GENERATING_CLUES_WEB', 
    message: 'Agents are automatically stringing red yarn threads and pinning factual cards on the Clues & Suspect Web...' 
  });

  try {
    // Generate expansive, interconnected clues web (covering all victims, suspects, witnesses, exhibits, locations)
    db.prepare(`DELETE FROM clues WHERE case_ref = ?`).run(caseRef);

    const expansiveNodes = generateExpansiveCluesWeb(caseRef);
    const insertClueStmt = db.prepare(`
      INSERT INTO clues (case_ref, title, type, description, pos_x, pos_y, color, connections)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const insertedIds = [];
    for (const n of expansiveNodes) {
      const res = insertClueStmt.run(
        caseRef,
        n.title,
        n.type,
        n.description,
        n.pos_x,
        n.pos_y,
        n.color,
        '[]'
      );
      insertedIds.push(res.lastInsertRowid);
    }

    // Connect nodes via real database IDs for SVG red yarn rendering
    for (let i = 0; i < expansiveNodes.length; i++) {
      const relativeConns = JSON.parse(expansiveNodes[i].connections || '[]');
      const mappedConns = relativeConns
        .map(relIdx => insertedIds[relIdx - 1])
        .filter(id => id && id !== insertedIds[i]);

      if (mappedConns.length > 0) {
        db.prepare('UPDATE clues SET connections = ? WHERE id = ?').run(
          JSON.stringify(mappedConns),
          insertedIds[i]
        );
      }
    }

    emit('clues_updated', {
      caseRef,
      count: expansiveNodes.length,
      message: `Autonomous detective web expanded with ${expansiveNodes.length} interconnected nodes covering all victims, suspects, witnesses, and exhibits.`
    });
  } catch (err) {
    console.warn('[Conclave Clues Generation warning]:', err.message);
  }

  // =========================================================================
  // STAGE 8: Compile Structured Classified Bureau Investigation Report
  // =========================================================================
  emit('status', { 
    stage: 'COMPILING_REPORT', 
    message: 'Compiling structured classified Bureau Investigation Report...' 
  });

  const fullReportText = `
================================================================================
ARGUS & CO. — FRONTIER DISTRICT WESTERN BUREAU OF INVESTIGATION
CLASSIFIED INVESTIGATION DOSSIER & FINAL VERDICT
================================================================================
CASE REFERENCE:      ${caseData.case_ref}
CASE TITLE:          ${caseData.title}
SECURITY TIER:       ${caseData.priority.toUpperCase()} / SPECIAL INVESTIGATION
INVESTIGATION VECTOR: ${isReAnalysis ? 'ALTERNATIVE CONTRARIAN DEDUCTION (RE-ANALYSIS)' : 'INITIAL MULTI-DISCIPLINARY CONCLAVE'}
DATE COMPILED:       ${new Date().toUTCString()}
LEAD COMMANDER:      DETECTIVE ARGUS (Chief Investigation Officer)

================================================================================
1. EXECUTIVE SUMMARY & INTAKE RECORD
================================================================================
${caseData.summary || caseData.notes || 'Full autonomous multi-agent investigation convened across digital, physical, and field domains.'}

================================================================================
2. FORENSIC INTELLIGENCE ASSESSMENT — OFFICER LUTKIN
================================================================================
${lutkinResponse.content}

================================================================================
3. FIELD INTELLIGENCE & WITNESS MATRIX — OFFICER VANGUARD
================================================================================
${vanguardResponse.content}

================================================================================
4. ANALYTICAL ANOMALY & LINK GRAPH MATRIX — OFFICER CORTEX
================================================================================
${cortexResponse.content}

================================================================================
5. ADVERSARIAL REVIEW & RED-TEAM AUDIT — DETECTIVE APEX
================================================================================
${apexResponse.content}

================================================================================
6. CHIEF INVESTIGATION OFFICER OFFICIAL VERDICT — DETECTIVE ARGUS
================================================================================
${argusVerdict.content}

================================================================================
OFFICIAL BUREAU CERTIFICATION & INTEGRITY SEAL:
All deductions, forensic analyses, and behavioral link graphs recorded above
have been corroborated across the five bureau intelligence specializations.
Chain of Custody sealed.
================================================================================
  `.trim();

  // Save report into database
  const insertReport = db.prepare(`
    INSERT INTO reports (case_ref, title, executive_summary, forensic_findings, intel_summary, anomaly_detection, defense_critique, conclusions, full_report_text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertReport.run(
    caseRef,
    isReAnalysis ? `Re-Analysis Dossier: ${caseData.title}` : `Bureau Conclave Report: ${caseData.title}`,
    caseData.summary || 'Bureau Conclave synthesized findings.',
    lutkinResponse.content,
    vanguardResponse.content,
    cortexResponse.content,
    apexResponse.content,
    argusVerdict.content,
    fullReportText
  );

  // Update case status
  db.prepare(`UPDATE cases SET status = 'Under Deliberation', updated_at = CURRENT_TIMESTAMP WHERE case_ref = ?`).run(caseRef);

  // Log audit
  db.prepare(`INSERT INTO audit_trail (case_ref, officer, action, details) VALUES (?, ?, ?, ?)`).run(
    caseRef,
    'ARGUS',
    isReAnalysis ? 'RE_ANALYSIS_COMPLETED' : 'CONCLAVE_COMPLETED',
    `Autonomous investigation concluded. Full report and thread connection flowchart filed.`
  );

  emit('completed', {
    caseRef,
    isReAnalysis,
    reportText: fullReportText,
    message: 'Investigation Conclave completed successfully. Formal report filed.'
  });

  return {
    success: true,
    caseRef,
    isReAnalysis,
    turns: conversationHistory.length,
    report: fullReportText
  };
}
