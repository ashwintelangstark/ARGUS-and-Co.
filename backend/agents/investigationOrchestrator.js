import { generateAgentCompletion } from '../openrouter.js';
import { AGENT_PROFILES } from './agentPrompts.js';
import db from '../database.js';

/**
 * Runs a full 5-stage Autonomous Bureau Conclave investigation
 * Broadcasts progress events via callback for real-time SSE streaming
 */
export async function runBureauConclave({ caseRef, onProgress }) {
  console.log(`[Conclave] Starting multi-agent investigation for case: ${caseRef}`);

  // 1. Fetch case details, evidence, and existing clues
  const caseData = db.prepare('SELECT * FROM cases WHERE case_ref = ?').get(caseRef);
  if (!caseData) throw new Error(`Case ${caseRef} not found in database`);

  const evidenceList = db.prepare('SELECT * FROM evidence WHERE case_ref = ?').all(caseRef);
  const existingClues = db.prepare('SELECT * FROM clues WHERE case_ref = ?').all(caseRef);

  const emit = (event, payload) => {
    if (typeof onProgress === 'function') {
      onProgress(event, payload);
    }
  };

  emit('status', {
    stage: 'CONVENING',
    message: `Detective Argus has convened the Bureau Conclave for case ${caseRef}: "${caseData.title}"`
  });

  const caseContextSummary = `
CASE FILE: ${caseData.case_ref} — "${caseData.title}"
CATEGORY: ${caseData.category} | PRIORITY: ${caseData.priority} | STATUS: ${caseData.status}
SUMMARY: ${caseData.summary || 'None'}
INTAKE NOTES: ${caseData.notes || 'None'}

REGISTERED EVIDENCE ITEMS (${evidenceList.length}):
${evidenceList.map((e, idx) => `${idx + 1}. [${e.file_type}] "${e.original_name}" (${e.file_size} bytes) - Hash: ${e.hash_sha256 || 'N/A'}\n   Forensics: ${e.forensic_notes || 'None'}\n   Extracted: ${e.extracted_text || 'Raw binary file'}`).join('\n\n')}

EXISTING CLUES / SUSPECTS / LOCATIONS ON BOARD (${existingClues.length}):
${existingClues.map(c => `- [${c.type.toUpperCase()}] ${c.title}: ${c.description}`).join('\n')}
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

  // STAGE 1: ARGUS Opening & Mission Directives
  emit('status', { stage: 'ARGUS_OPENING', message: 'Detective Argus is opening the investigation briefing...' });
  const argusIntroPrompt = `You are opening the Bureau Conclave for case "${caseData.title}". State the core mystery to solve, identify key questions, and task Officer Lutkin with the initial forensic examination of the evidence.`;
  
  const argusIntro = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.ARGUS.systemPrompt,
    preferredModel: AGENT_PROFILES.ARGUS.preferredModel,
    messages: [
      { role: 'user', content: `${caseContextSummary}\n\nTask: ${argusIntroPrompt}` }
    ]
  });
  recordTurn('ARGUS', 'conclave_turn', argusIntro.content, argusIntro.modelUsed);

  // STAGE 2: LUTKIN Forensic Examination
  await delay(1200);
  emit('status', { stage: 'LUTKIN_FORENSICS', message: 'Officer Lutkin is examining digital files, hashes, and physical trace data...' });
  const lutkinPrompt = `Review the evidence register and initial case briefing. Focus on digital artifacts, timestamps, cryptographic hashes, forgeries, and mechanical bypass indicators. Deliver your definitive forensic findings to the bureau.`;
  
  const lutkinResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.LUTKIN.systemPrompt,
    preferredModel: AGENT_PROFILES.LUTKIN.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Lutkin, report your forensic findings on these evidence files.` }
    ]
  });
  recordTurn('LUTKIN', 'forensics', lutkinResponse.content, lutkinResponse.modelUsed);

  // STAGE 3: VANGUARD Field Intelligence & OSINT
  await delay(1200);
  emit('status', { stage: 'VANGUARD_INTEL', message: 'Officer Vanguard is tracking movements, wire intercepts, and transit manifests...' });
  const vanguardPrompt = `Examine suspect movements, transit manifests, telegram wire frequencies, and public registry connections. Provide actionable intelligence on whereabouts, syndicate involvement, and logistical choke points.`;

  const vanguardResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.VANGUARD.systemPrompt,
    preferredModel: AGENT_PROFILES.VANGUARD.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Vanguard, provide the field intelligence and suspect surveillance report.` }
    ]
  });
  recordTurn('VANGUARD', 'intel_brief', vanguardResponse.content, vanguardResponse.modelUsed);

  // STAGE 4: CORTEX Anomaly Detection & Link Analysis
  await delay(1200);
  emit('status', { stage: 'CORTEX_PATTERNS', message: 'Officer Cortex is calculating correlation matrices and link graphs...' });
  const cortexPrompt = `Analyze the findings from Lutkin and Vanguard. Identify anomalous timeline correlations, probability vectors, and mathematical link graphs connecting suspects to evidence. Point out the non-random patterns.`;

  const cortexResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.CORTEX.systemPrompt,
    preferredModel: AGENT_PROFILES.CORTEX.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Cortex, deliver your correlation matrix and anomaly analysis.` }
    ]
  });
  recordTurn('CORTEX', 'counter_analysis', cortexResponse.content, cortexResponse.modelUsed);

  // STAGE 5: APEX Independent Challenge & Red-Teaming
  await delay(1200);
  emit('status', { stage: 'APEX_REVIEW', message: 'Detective Apex is red-teaming the hypotheses and hunting for blind spots...' });
  const apexPrompt = `As the independent reviewer and red-team officer, scrutinize the working hypothesis built by Lutkin, Vanguard, and Cortex. Challenge their assumptions, point out gaps in chain of custody, identify alternative plausible explanations, and ensure no false accusations are made.`;

  const apexResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.APEX.systemPrompt,
    preferredModel: AGENT_PROFILES.APEX.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Detective Apex, present your independent counter-examination and critique.` }
    ]
  });
  recordTurn('APEX', 'counter_analysis', apexResponse.content, apexResponse.modelUsed);

  // STAGE 6: ARGUS Chief Verdict & Resolution
  await delay(1200);
  emit('status', { stage: 'ARGUS_VERDICT', message: 'Detective Argus is formulating the Bureau Chief Verdict and Directives...' });
  const argusVerdictPrompt = `Review the entire deliberation, particularly the concerns raised by Detective Apex. Deliver the Chief Investigation Officer's final verdict, decisive next operational directives, and summary of verified facts.`;

  const argusVerdict = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.ARGUS.systemPrompt,
    preferredModel: AGENT_PROFILES.ARGUS.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Detective Argus, synthesize all officer findings and deliver your official Bureau Verdict.` }
    ]
  });
  recordTurn('ARGUS', 'verdict', argusVerdict.content, argusVerdict.modelUsed);

  // STAGE 7: Automatically Generate Formal Intake & Investigation Report
  emit('status', { stage: 'COMPILING_REPORT', message: 'Compiling structured classified Bureau Investigation Report...' });

  const fullReportText = `
================================================================================
DETECTIVE ARGUS & CO. — FRONTIER DISTRICT BUREAU OF INVESTIGATION
CLASSIFIED DOSSIER FINDINGS REPORT
================================================================================
CASE REFERENCE:  ${caseData.case_ref}
CASE TITLE:      ${caseData.title}
SECURITY TIER:   ${caseData.priority.toUpperCase()} / SPECIAL INTELLIGENCE
DATE COMPILED:   ${new Date().toISOString()}
LEAD COMMANDER:  DETECTIVE ARGUS (Chief Investigation Officer)

1. EXECUTIVE SUMMARY & MATTERS OF RECORD
${caseData.summary || 'Investigation into registered evidence and suspect network.'}

2. FORENSIC INTELLIGENCE ASSESSMENT (OFFICER LUTKIN)
${lutkinResponse.content}

3. FIELD INTELLIGENCE & OSINT TRACE (OFFICER VANGUARD)
${vanguardResponse.content}

4. ANALYTICAL ANOMALY & LINK GRAPH MATRIX (OFFICER CORTEX)
${cortexResponse.content}

5. INDEPENDENT DEFENSE SCRUTINY & RED-TEAM AUDIT (DETECTIVE APEX)
${apexResponse.content}

6. CHIEF INVESTIGATION OFFICER VERDICT & DIRECTIVES (DETECTIVE ARGUS)
${argusVerdict.content}

================================================================================
OFFICIAL BUREAU CERTIFICATION:
All findings documented above have been corroborated across independent officer
specializations in accordance with Western Investigation Bureau standards.
================================================================================
  `.trim();

  // Save report into database
  const insertReport = db.prepare(`
    INSERT INTO reports (case_ref, title, executive_summary, forensic_findings, intel_summary, anomaly_detection, defense_critique, conclusions, full_report_text)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertReport.run(
    caseRef,
    `Intake & Conclave Report: ${caseData.title}`,
    caseData.summary || 'Bureau Conclave synthesized findings.',
    lutkinResponse.content,
    vanguardResponse.content,
    cortexResponse.content,
    apexResponse.content,
    argusVerdict.content,
    fullReportText
  );

  // Update case status to 'Under Deliberation' or 'Solved'
  db.prepare(`UPDATE cases SET status = 'Under Deliberation', updated_at = CURRENT_TIMESTAMP WHERE case_ref = ?`).run(caseRef);

  // Log audit
  db.prepare(`INSERT INTO audit_trail (case_ref, officer, action, details) VALUES (?, ?, ?, ?)`).run(
    caseRef,
    'ARGUS',
    'CONCLAVE_COMPLETED',
    'Full 5-officer autonomous deliberation and classified report compiled.'
  );

  emit('completed', {
    caseRef,
    reportText: fullReportText,
    message: 'Investigation Conclave completed successfully. Formal report filed.'
  });

  return {
    success: true,
    caseRef,
    turns: conversationHistory.length,
    report: fullReportText
  };
}
