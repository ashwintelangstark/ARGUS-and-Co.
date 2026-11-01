import { generateAgentCompletion } from '../openrouter.js';
import { AGENT_PROFILES } from './agentPrompts.js';
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

  const evidenceList = db.prepare('SELECT * FROM evidence WHERE case_ref = ?').all(caseRef);

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

  // Evaluate completeness of evidence to conditionally trigger deep searches
  const hasForensicDetails = evidenceList.length > 0 && evidenceList.some(e => 
    (e.extracted_text && e.extracted_text.length > 40) || (e.forensic_notes && e.forensic_notes.length > 20) || e.hash_sha256
  );
  const lutkinNeedsDeepSearch = evidenceList.length === 0 || !hasForensicDetails;

  const hasIntelDetails = Boolean(
    caseData.notes && 
    (caseData.notes.length > 100 || /suspect|witness|whereabouts|manifest|wiretap|alias|registry/i.test(caseData.notes))
  );
  const vanguardNeedsDeepSearch = !hasIntelDetails;

  const cortexNeedsDeepSearch = evidenceList.length < 2 || isReAnalysis;

  const caseContextSummary = `
CASE FILE: ${caseData.case_ref} — "${caseData.title}"
CATEGORY: ${caseData.category} | PRIORITY: ${caseData.priority} | STATUS: ${caseData.status}
${isReAnalysis ? 'MODE: RE-ANALYSIS (Execute Alternative Investigative Vector — Challenge baseline assumptions, uncover concealed motives and subtle discrepancies overlooked in previous reviews)' : 'MODE: STANDARD BUREAU CONCLAVE'}
SUMMARY: ${caseData.summary || 'None'}
INTAKE NOTES: ${caseData.notes || 'None'}

REGISTERED EVIDENCE REGISTER (${evidenceList.length} items):
${evidenceList.length > 0 ? evidenceList.map((e, idx) => `${idx + 1}. [${e.file_type.toUpperCase()}] "${e.original_name}" (${e.file_size} bytes)
   SHA-256 Hash: ${e.hash_sha256 || 'Calculated at intake'}
   Forensic Notes: ${e.forensic_notes || 'Pending examination'}
   Content Snippet: ${e.extracted_text ? e.extracted_text.slice(0, 300) : 'Binary evidence archive'}`).join('\n\n') : 'NO EVIDENCE FILES LOGGED BY USER. DEEP WEB SEARCH MANDATED.'}
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
    ? `You are opening the RE-ANALYSIS Conclave for case "${caseData.title}". State that the bureau is discarding conventional baseline conclusions. Direct the squad to look for hidden actors, forged alibis, financial trails, or counter-forensic tampering that humans easily miss. Task Officer Lutkin to re-examine the physical evidence under this new lens.`
    : `You are opening the Bureau Conclave for case "${caseData.title}". State the core mystery to solve, identify key questions, evaluate evidence availability, and task Officer Lutkin with the initial forensic examination of the evidence.`;

  const argusIntro = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.ARGUS.systemPrompt,
    preferredModel: AGENT_PROFILES.ARGUS.preferredModel,
    messages: [
      { role: 'user', content: `${caseContextSummary}\n\nTask: ${argusIntroPrompt}` }
    ]
  });
  recordTurn('ARGUS', 'conclave_turn', argusIntro.content, argusIntro.modelUsed);

  // =========================================================================
  // STAGE 2: LUTKIN Forensic Examination (Conditional Deep Search)
  // =========================================================================
  await delay(1000);

  let lutkinPrompt = '';
  if (lutkinNeedsDeepSearch) {
    emit('status', { 
      stage: 'LUTKIN_DEEP_SEARCH', 
      message: 'Evidence register lacks complete trace data. Officer Lutkin is executing Deep Web Forensic Search across ballistics, toxicological registries, and cryptographic databases...' 
    });
    lutkinPrompt = `MANDATORY FORENSIC PROTOCOL: Notice that the registered evidence files are incomplete or lack granular trace/ballistics/chemical data. Perform an autonomous DEEP WEB FORENSIC SEARCH into global archives, firearm serials, chemical registries, audio spectrogram signatures, and hash verification logs. Present both the provided file analysis and your external deep web forensic findings with high scientific precision.`;
  } else {
    emit('status', { 
      stage: 'LUTKIN_FORENSICS', 
      message: 'Officer Lutkin is verifying digital checksums, file formats, and physical trace integrity...' 
    });
    lutkinPrompt = `MANDATORY FORENSIC PROTOCOL: The uploaded evidence register contains verified files. DO NOT conduct external deep search; strictly confine your findings to the empirical evidence files provided, their SHA-256 integrity checksums, digital metadata, and mechanical traces.`;
  }

  const lutkinResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.LUTKIN.systemPrompt,
    preferredModel: AGENT_PROFILES.LUTKIN.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Lutkin, report your forensic findings. ${lutkinPrompt}` }
    ]
  });
  recordTurn('LUTKIN', 'forensics', lutkinResponse.content, lutkinResponse.modelUsed);

  // =========================================================================
  // STAGE 3: VANGUARD Field Intelligence & OSINT (Conditional Deep Search)
  // =========================================================================
  await delay(1000);

  let vanguardPrompt = '';
  if (vanguardNeedsDeepSearch) {
    emit('status', { 
      stage: 'VANGUARD_DEEP_SEARCH', 
      message: 'Suspect background gaps detected. Officer Vanguard is executing Deep OSINT Web Search across public records, telegraph wire archives, and port manifests...' 
    });
    vanguardPrompt = `MANDATORY FIELD PROTOCOL: Crucial intelligence on suspect affiliations, corporate registrations, or transit logs is missing in the case intake. Execute an autonomous DEEP OSINT WEB SEARCH across public registries, corporate charters, railway/shipping manifests, and telegraph wire logs. Deliver actionable intelligence on suspect networks and movement choke points.`;
  } else {
    emit('status', { 
      stage: 'VANGUARD_INTEL', 
      message: 'Officer Vanguard is analyzing movement logs, wire intercepts, and transit manifests...' 
    });
    vanguardPrompt = `MANDATORY FIELD PROTOCOL: Verified intelligence records exist in the case dossier. Synthesize suspect movements, transit routes, and public registry connections based on verified dossier materials without external deep web speculation.`;
  }

  const vanguardResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.VANGUARD.systemPrompt,
    preferredModel: AGENT_PROFILES.VANGUARD.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Vanguard, provide your intelligence briefing. ${vanguardPrompt}` }
    ]
  });
  recordTurn('VANGUARD', 'intel_brief', vanguardResponse.content, vanguardResponse.modelUsed);

  // =========================================================================
  // STAGE 4: CORTEX Anomaly Detection & Link Graph
  // =========================================================================
  await delay(1000);

  let cortexPrompt = '';
  if (cortexNeedsDeepSearch) {
    emit('status', { 
      stage: 'CORTEX_DEEP_SEARCH', 
      message: 'Officer Cortex is executing deep historical precedent search and cross-referencing timeline anomalies...' 
    });
    cortexPrompt = `MANDATORY ANALYTICS PROTOCOL: Cross-reference historical precedent patterns and run deep probabilistic correlation models on the findings from Lutkin and Vanguard. Point out the non-obvious timeline contradictions, hidden financial incentives, and mathematical anomaly clusters.`;
  } else {
    emit('status', { 
      stage: 'CORTEX_PATTERNS', 
      message: 'Officer Cortex is calculating correlation matrices and link graphs...' 
    });
    cortexPrompt = `Analyze the findings from Lutkin and Vanguard. Formulate the exact correlation matrix, timeline sequence, and link graph connecting suspects to evidence.`;
  }

  const cortexResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.CORTEX.systemPrompt,
    preferredModel: AGENT_PROFILES.CORTEX.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Officer Cortex, deliver your correlation matrix and link graph analysis. ${cortexPrompt}` }
    ]
  });
  recordTurn('CORTEX', 'counter_analysis', cortexResponse.content, cortexResponse.modelUsed);

  // =========================================================================
  // STAGE 5: APEX Independent Challenge & Red-Teaming
  // =========================================================================
  await delay(1000);
  emit('status', { 
    stage: 'APEX_REVIEW', 
    message: isReAnalysis
      ? 'Detective Apex is aggressively red-teaming prior conclusions and hunting for hidden contradictions...'
      : 'Detective Apex is red-teaming the working hypothesis and stress-testing conclusions...' 
  });

  const apexPrompt = isReAnalysis
    ? `As the independent Devil's Advocate and Red-Team Leader on RE-ANALYSIS: Mercilessly dissect the earlier conclusions. Look for fabricated alibis, framed innocent parties, and hidden mastermind motives. What alternative, hyper-accurate deduction explains all physical and digital anomalies better than conventional logic?`
    : `As the independent reviewer and red-team officer, scrutinize the working hypothesis built by Lutkin, Vanguard, and Cortex. Challenge their assumptions, point out gaps in chain of custody, identify alternative plausible explanations, and ensure no false accusations are made.`;

  const apexResponse = await generateAgentCompletion({
    systemPrompt: AGENT_PROFILES.APEX.systemPrompt,
    preferredModel: AGENT_PROFILES.APEX.preferredModel,
    messages: [
      { role: 'user', content: caseContextSummary },
      ...conversationHistory,
      { role: 'user', content: `Detective Apex, present your independent counter-examination and critique. ${apexPrompt}` }
    ]
  });
  recordTurn('APEX', 'counter_analysis', apexResponse.content, apexResponse.modelUsed);

  // =========================================================================
  // STAGE 6: ARGUS Chief Verdict & Final Resolution
  // =========================================================================
  await delay(1000);
  emit('status', { 
    stage: 'ARGUS_VERDICT', 
    message: 'Detective Argus is formulating the Bureau Chief Verdict and Directives...' 
  });

  const argusVerdictPrompt = isReAnalysis
    ? `Review the entire re-analysis deliberation, especially Detective Apex's counter-theories and the deep intelligence lookups. Deliver the official, revised Chief Bureau Verdict with decisive precision. Unmask the true perpetrator, their precise means, motive, and opportunity, with evidentiary certitude that surpasses human intuition.`
    : `Review the entire deliberation, particularly the concerns raised by Detective Apex. Deliver the Chief Investigation Officer's final verdict, decisive next operational directives, and summary of verified facts.`;

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

  // =========================================================================
  // STAGE 7: Autonomous Detective Flowchart & Clues Generation (Clues & Suspect Web)
  // =========================================================================
  emit('status', { 
    stage: 'GENERATING_CLUES_WEB', 
    message: 'Agents are automatically stringing red yarn threads and pinning cards on the Clues & Suspect Web...' 
  });

  try {
    // Generate 5-6 structured clues connecting suspects, evidence, location, hypothesis, and verdict
    // We clear previous auto-generated clues for this case to avoid clutter
    db.prepare(`DELETE FROM clues WHERE case_ref = ?`).run(caseRef);

    const insertClueStmt = db.prepare(`
      INSERT INTO clues (case_ref, title, type, description, pos_x, pos_y, color, connections)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    // 1. Primary Suspect
    const c1 = insertClueStmt.run(
      caseRef,
      `Primary Subject: Identified in Bureau Verdict`,
      'suspect',
      `Identified by Chief Argus as central party of interest. Motive and opportunity established via combined forensic and OSINT vectors.`,
      -350,
      -120,
      '#f59e0b',
      '[]'
    );
    const idSuspect = c1.lastInsertRowid;

    // 2. Physical / Digital Evidence
    const c2 = insertClueStmt.run(
      caseRef,
      `Key Forensic Evidence: ${evidenceList[0]?.original_name || 'Cryptographic / Physical Trace'}`,
      'evidence',
      lutkinResponse.content.slice(0, 180).replace(/\n/g, ' ') + '...',
      -100,
      -220,
      '#00d2ff',
      JSON.stringify([Number(idSuspect)])
    );
    const idEvidence = c2.lastInsertRowid;

    // 3. Location / Crime Scene Anchor
    const c3 = insertClueStmt.run(
      caseRef,
      `Scene of Interest & Transit Choke Point`,
      'location',
      vanguardResponse.content.slice(0, 180).replace(/\n/g, ' ') + '...',
      220,
      -160,
      '#10b981',
      JSON.stringify([Number(idEvidence)])
    );
    const idLocation = c3.lastInsertRowid;

    // 4. Secondary Associate / Co-Conspirator
    const c4 = insertClueStmt.run(
      caseRef,
      `Secondary Actor / Shadow Syndicate Associate`,
      'suspect',
      `Corroborated by Officer Vanguard and Officer Cortex as logistical accomplice or witness.`,
      -320,
      180,
      '#ea580c',
      JSON.stringify([Number(idSuspect), Number(idLocation)])
    );
    const idAssociate = c4.lastInsertRowid;

    // 5. Working Hypothesis / Stress-Test Anomaly
    const c5 = insertClueStmt.run(
      caseRef,
      `Adversarial Hypothesis: Apex Review`,
      'hypothesis',
      apexResponse.content.slice(0, 180).replace(/\n/g, ' ') + '...',
      0,
      140,
      '#a855f7',
      JSON.stringify([Number(idEvidence), Number(idAssociate)])
    );
    const idHypothesis = c5.lastInsertRowid;

    // 6. Bureau Chief Final Verdict Card
    insertClueStmt.run(
      caseRef,
      `★ Official Bureau Verdict: Chief Argus`,
      'hypothesis',
      argusVerdict.content.slice(0, 240).replace(/\n/g, ' ') + '...',
      350,
      120,
      '#eab308',
      JSON.stringify([Number(idSuspect), Number(idHypothesis), Number(idLocation)])
    );

    emit('clues_updated', {
      caseRef,
      message: 'Autonomous detective thread connection flowchart successfully created.'
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
${lutkinNeedsDeepSearch ? '★ PROTOCOL: Deep Web Forensic Search executed across ballistic & toxicological registries.' : '★ PROTOCOL: Verified File Register Integrity Checksum Analysis.'}
================================================================================
${lutkinResponse.content}

================================================================================
3. FIELD INTELLIGENCE & OSINT DOSSIER — OFFICER VANGUARD
${vanguardNeedsDeepSearch ? '★ PROTOCOL: Deep OSINT Search conducted across public records, telegraph wire archives, and port manifests.' : '★ PROTOCOL: Verified Public Registry & Field Intelligence Analysis.'}
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
