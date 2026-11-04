import React, { useState } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { 
  FolderPlus, UploadCloud, File, Trash2, ExternalLink, 
  ShieldCheck, FileCheck, AlertTriangle, CheckCircle2,
  Edit3, Archive, X, Save
} from 'lucide-react';

export default function CaseFilesView({ 
  cases = [], 
  currentUser = null,
  onRefresh, 
  onCaseClosed,
  onCaseDeleted,
  onSelectCaseForLab 
}) {
  const activeCases = cases.filter(c => c.status !== 'Solved' && c.status !== 'Archived');

  const getNextCaseRef = (caseList = []) => {
    let maxNum = 0;
    for (const c of caseList) {
      const match = c.case_ref?.match(/ARG-1891-(\d+)/);
      if (match) {
        const num = parseInt(match[1], 10);
        if (num > maxNum) maxNum = num;
      }
    }
    return `ARG-1891-${String(maxNum + 1).padStart(3, '0')}`;
  };

  const [caseRef, setCaseRef] = useState(() => getNextCaseRef(cases));
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [category, setCategory] = useState('Classified Investigation');
  const [notes, setNotes] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // Sync caseRef default if current caseRef is already taken or cases change
  React.useEffect(() => {
    if (!caseRef || cases.some(c => c.case_ref === caseRef)) {
      setCaseRef(getNextCaseRef(cases));
    }
  }, [cases]);

  // Edit Case State
  const [editingCase, setEditingCase] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editPriority, setEditPriority] = useState('High');
  const [editCategory, setEditCategory] = useState('Classified Investigation');
  const [editStatus, setEditStatus] = useState('Active');
  const [editNotes, setEditNotes] = useState('');
  const [editLeadOfficer, setEditLeadOfficer] = useState('ARGUS');
  const [isSavingEdit, setIsSavingEdit] = useState(false);

  // Open Edit Modal
  const handleOpenEdit = (c) => {
    bureauAudio.typewriterClick();
    setEditingCase(c);
    setEditTitle(c.title || '');
    setEditPriority(c.priority || 'High');
    setEditCategory(c.category || 'Classified Investigation');
    setEditStatus(c.status || 'Active');
    setEditNotes(c.notes || '');
    setEditLeadOfficer(c.lead_officer || 'ARGUS');
  };

  // Save Case Edit
  const handleSaveEdit = async (e) => {
    e.preventDefault();
    if (!editingCase) return;
    setIsSavingEdit(true);
    bureauAudio.typewriterClick();

    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(editingCase.case_ref)}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          priority: editPriority,
          category: editCategory,
          status: editStatus,
          notes: editNotes,
          lead_officer: editLeadOfficer
        })
      });
      const data = await res.json();
      if (data.success) {
        setNotification(`Dossier ${editingCase.case_ref} successfully updated.`);
        setEditingCase(null);
        if (typeof onRefresh === 'function') onRefresh();
      } else {
        alert(data.error || 'Failed to update case.');
      }
    } catch (err) {
      console.error('Error saving case edit:', err);
      alert('Failed to save changes.');
    } finally {
      setIsSavingEdit(false);
    }
  };

  // Close and Archive Case (User-controlled action)
  const handleArchiveCase = async (ref, caseTitle) => {
    if (!confirm(`Are you certain you wish to close and archive Case ${ref}: "${caseTitle}"?\n\nThis will officially mark the case as Solved/Archived and move it to the Bureau Archives.`)) {
      return;
    }
    bureauAudio.conclaveChime();
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(ref)}/archive`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.success) {
        setNotification(`Case ${ref} officially closed and archived.`);
        if (typeof onCaseClosed === 'function') {
          onCaseClosed(ref);
        } else if (typeof onRefresh === 'function') {
          onRefresh(ref);
        }
      } else {
        alert(data.error || 'Failed to archive case.');
      }
    } catch (err) {
      console.error('Failed to archive case:', err);
      alert('Failed to archive case.');
    }
  };

  // File Handling
  const handleFileDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer?.files && e.dataTransfer.files.length > 0) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      addFiles(Array.from(e.target.files));
      // CRITICAL: Clear target value so dropping or selecting the exact same files again triggers input
      e.target.value = '';
    }
  };

  const addFiles = (files) => {
    const valid = [];

    for (const f of files) {
      // Allow adding files even if used in a past case; only deduplicate within the current pending intake list
      if (!pendingFiles.some(x => x.name === f.name && x.size === f.size && x.lastModified === f.lastModified)) {
        valid.push(f);
      }
    }

    if (valid.length > 0) {
      bureauAudio.cameraShutter();
      setPendingFiles(prev => [...prev, ...valid]);
    }
  };

  const handleToggleWork = async (ref, isCurrentlyWorking) => {
    bureauAudio.telegraphBeep();
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(ref)}/work`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isWorking: !isCurrentlyWorking })
      });
      const data = await res.json();
      if (data.success) {
        if (typeof onRefresh === 'function') onRefresh();
        if (!isCurrentlyWorking && typeof onSelectCaseForLab === 'function') {
          // Immediately route to Investigation Lab with this case active
          onSelectCaseForLab(ref);
        }
      }
    } catch (err) {
      console.error('Failed to toggle work on case:', err);
    }
  };

  const removePendingFile = (idx) => {
    setPendingFiles(prev => prev.filter((_, i) => i !== idx));
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  // Submit new Case Dossier & Upload Evidence
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Case Title is required.');
      return;
    }

    setIsSubmitting(true);
    bureauAudio.typewriterClick();

    const targetRef = caseRef.trim() || getNextCaseRef(cases);

    try {
      // 1. Create Case record
      const caseRes = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_ref: targetRef,
          title: title.trim(),
          priority,
          category,
          summary: notes.slice(0, 200),
          notes,
          created_by: currentUser?.username || 'COMMAND'
        })
      });

      const caseData = await caseRes.json();
      if (!caseData.success) {
        throw new Error(caseData.error || 'Failed to create case');
      }

      const finalCaseRef = caseData.case_ref || targetRef;

      // 2. Upload Evidence Files if any
      if (pendingFiles.length > 0) {
        const formData = new FormData();
        pendingFiles.forEach(f => formData.append('files', f));
        formData.append('notes', `Evidence logged at case intake for ${finalCaseRef}`);
        formData.append('assigned_officer', 'LUTKIN');

        const uploadRes = await fetch(`/api/cases/${encodeURIComponent(finalCaseRef)}/evidence`, {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          console.warn('Upload warning:', uploadData.error);
        }
      }

      bureauAudio.conclaveChime();
      setNotification(`Dossier ${finalCaseRef} registered and locked into the Bureau Ledger.`);
      
      // Reset form
      setTitle('');
      setNotes('');
      setPendingFiles([]);
      setCaseRef(getNextCaseRef([...cases, { case_ref: finalCaseRef }]));

      if (typeof onRefresh === 'function') onRefresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Case
  const handleDeleteCase = async (ref) => {
    if (!confirm(`Are you certain you wish to permanently delete and purge Case Dossier ${ref}? This will erase all evidence and deliberations from the database.`)) return;
    try {
      const res = await fetch(`/api/cases/${encodeURIComponent(ref)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!data.success) {
        throw new Error(data.error || 'Failed to purge case from database.');
      }
      bureauAudio.cameraShutter();
      setNotification(`Case ${ref} permanently purged from Bureau database.`);
      
      if (typeof onCaseDeleted === 'function') {
        onCaseDeleted(ref);
      } else if (typeof onCaseClosed === 'function') {
        onCaseClosed(ref);
      } else if (typeof onRefresh === 'function') {
        onRefresh(ref);
      }
    } catch (err) {
      alert(`Error deleting case: ${err.message}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]">
      {/* Main Body */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* Two Column Section: Intake Form & Evidence Protocol Notice */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* New Case Dossier Card */}
          <div className="lg:col-span-7 vintage-card p-5 rounded">
            <h2 className="font-rye text-lg text-[#3e2311] border-b border-[#a88258] pb-2 mb-4 flex items-center gap-2">
              <FolderPlus size={18} className="text-[#8d4829]" />
              Open a New Case Dossier
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-elite font-bold text-[#56371f] mb-1">
                    CASE REFERENCE
                  </label>
                  <input
                    type="text"
                    required
                    value={caseRef}
                    onChange={(e) => setCaseRef(e.target.value)}
                    className="w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-elite font-bold text-[#56371f] mb-1">
                    CASE TITLE
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. The Silvercreek Telegraph Breach"
                    className="w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-elite font-bold text-[#56371f] mb-1">
                    SECURITY PRIORITY
                  </label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  >
                    <option value="Critical">Critical Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Routine Priority</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-elite font-bold text-[#56371f] mb-1">
                    INVESTIGATION CATEGORY
                  </label>
                  <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g. Financial Fraud / Wiretap"
                    className="w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-elite font-bold text-[#56371f] mb-1">
                  CASE NOTES / INTAKE SUMMARY
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail the mystery, initial witness testimony, suspect persons of interest..."
                  className="w-full p-2 bg-[#f6ecda] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                />
              </div>

              {/* Dropzone */}
              <div>
                <label className="block text-[11px] font-elite font-bold text-[#56371f] mb-1">
                  PHYSICAL & DIGITAL EVIDENCE DEPOSITORY
                </label>
                <div
                  onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                  onDragEnter={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); }}
                  onDragLeave={(e) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); }}
                  onDrop={handleFileDrop}
                  onClick={() => document.getElementById('evidenceUploadInput').click()}
                  className={`border-2 border-dashed p-6 text-center rounded cursor-pointer transition-all ${
                    isDragging 
                      ? 'border-[#5d3a20] bg-[#e2cc9f]' 
                      : 'border-[#98754b] bg-[#f2e6cf] hover:bg-[#ebdcc0]'
                  }`}
                >
                  <UploadCloud size={28} className="mx-auto text-[#764f2e] mb-1" />
                  <strong className="block font-rye text-sm text-[#4b2d1d]">
                    Drop evidence files here or click to browse
                  </strong>
                  <span className="block font-elite text-[10px] text-[#755637] mt-1">
                    Accepts all evidence artifacts: Images (PNG/JPG/HEIC), Voice/Audio recordings (MP3/WAV/M4A), Video Wiretaps (MP4/MOV/WEBM), Documents, PDFs, CSVs, Hex Logs, Databases
                  </span>
                  <input
                    id="evidenceUploadInput"
                    type="file"
                    multiple
                    hidden
                    onChange={handleFileInput}
                  />
                </div>

                {/* Pending files chips */}
                {pendingFiles.length > 0 && (
                  <div className="mt-2.5 p-2 bg-[#ebdcc0] rounded border border-[#a88258] space-y-1.5">
                    <div className="text-[10px] font-elite font-bold text-[#54351c] flex items-center justify-between">
                      <span>{pendingFiles.length} file(s) staged for custody:</span>
                      <button 
                        type="button" 
                        onClick={() => setPendingFiles([])}
                        className="text-red-700 hover:underline"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {pendingFiles.map((f, i) => (
                        <span key={i} className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#f7efdc] border border-[#a88258] text-[9px] font-elite text-[#3a2211]">
                          <File size={10} />
                          {f.name} ({formatSize(f.size)})
                          <button type="button" onClick={() => removePendingFile(i)} className="hover:text-red-700 ml-0.5">×</button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="western-btn-gold px-5 py-2 font-elite text-xs font-bold rounded shadow"
                >
                  {isSubmitting ? 'Registering Dossier...' : '＋ Save Case Dossier & Evidence'}
                </button>
                {notification && (
                  <span className="text-xs font-elite text-[#31572c] font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> {notification}
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Evidence Handling Notice Card */}
          <div className="lg:col-span-5 vintage-card p-5 rounded flex flex-col justify-between">
            <div>
              <h2 className="font-rye text-lg text-[#3e2311] border-b border-[#a88258] pb-2 mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#8d4829]" />
                Evidence Custody Protocol
              </h2>
              <p className="font-elite text-xs text-[#523821] leading-relaxed mb-3">
                Each evidence artifact committed to the ARGUS and Co. register is processed through Officer Lutkin's forensic intake pipeline. Cryptographic SHA-256 integrity hashes are computed instantly upon receipt.
              </p>

              <div className="p-3 bg-[#e8d7b7] rounded border border-[#96744c] space-y-2 mb-4">
                <h4 className="font-rye text-xs text-[#4b2d1d]">Bureau Verification Standards:</h4>
                <ul className="text-[11px] font-elite text-[#5c3e25] space-y-1.5 pl-4 list-disc">
                  <li><strong>Zero File Mutation:</strong> Raw byte contents remain preserved in local storage vault.</li>
                  <li><strong>Cryptographic Checksums:</strong> SHA-256 integrity seals prevent evidence tampering.</li>
                  <li><strong>Role Segregation:</strong> Forensics (Lutkin), OSINT (Vanguard), Anomaly (Cortex), Review (Apex), Verdict (Argus).</li>
                  <li><strong>Multi-Agent Corroboration:</strong> No hypothesis accepted without dual-officer consensus.</li>
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-[#96744c]/40 text-[10px] font-elite text-[#755535]">
              ARGUS DETECTIVE AGENCY · EST. 1891 · EVIDENCE DIVISION
            </div>
          </div>

        </div>

        {/* Registered Case Dossiers Table */}
        <div className="vintage-card p-5 rounded">
          <h2 className="font-rye text-lg text-[#3e2311] border-b border-[#a88258] pb-2 mb-4 flex items-center justify-between">
            <span>Active Bureau Dossier Ledger</span>
            <span className="badge px-2.5 py-0.5 bg-[#5b3922] border border-[#a17849] text-[#f4dfb6] font-elite text-xs">
              {activeCases.length} ACTIVE DOSSIERS
            </span>
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-elite text-xs border-collapse">
              <thead>
                <tr className="bg-[#4b2e1b] text-[#f7e6ca]">
                  <th className="p-2.5">CASE REFERENCE & TITLE</th>
                  <th className="p-2.5">PRIORITY</th>
                  <th className="p-2.5">CATEGORY</th>
                  <th className="p-2.5">EVIDENCE</th>
                  <th className="p-2.5">STATUS</th>
                  <th className="p-2.5">REGISTERED</th>
                  <th className="p-2.5 text-right">OPERATIONAL ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#a88258]">
                {activeCases.map((c) => {
                  const isWorking = Boolean(c.is_working_on);
                  return (
                    <tr 
                      key={c.id || c.case_ref} 
                      className={`transition-colors ${
                        isWorking 
                          ? 'bg-[#edd8af] border-l-4 border-l-[#c69a50]' 
                          : 'hover:bg-[#ebdcc0]'
                      }`}
                    >
                      <td className="p-2.5 text-[#2b1b11]">
                        <div className="flex items-center gap-1.5">
                          <strong className="font-rye text-sm text-[#4d2f19] block">{c.case_ref}</strong>
                          {isWorking && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 bg-[#5d381c] text-[#ffe6b3] rounded border border-[#b88c4d] animate-pulse">
                              ⚡ ACTIVE
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-[#523720]">{c.title}</span>
                      </td>
                      <td className="p-2.5">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          c.priority === 'Critical' ? 'bg-red-800 text-white' :
                          c.priority === 'High' ? 'bg-amber-800 text-amber-100' :
                          'bg-[#68492c] text-[#f5ebd7]'
                        }`}>
                          {c.priority}
                        </span>
                      </td>
                      <td className="p-2.5 text-[#4a321f] text-[11px]">{c.category || 'Classified'}</td>
                      <td className="p-2.5 text-[#3a2516] font-bold">{c.evidence_count || 0} item(s)</td>
                      <td className="p-2.5">
                        <span className="px-2 py-0.5 rounded text-[10px] bg-[#3a2516] text-[#dfcdb0]">
                          {c.status || 'Active'}
                        </span>
                      </td>
                      <td className="p-2.5 text-[#634830] text-[10px]">
                        {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Active'}
                      </td>
                      <td className="p-2.5 text-right space-x-1.5 whitespace-nowrap">
                        {/* Work On / Work Off button */}
                        <button
                          onClick={() => handleToggleWork(c.case_ref, isWorking)}
                          className={`px-2.5 py-1 text-[10px] font-bold rounded transition-all inline-flex items-center gap-1 ${
                            isWorking
                              ? 'bg-[#c69a50] text-[#1f130b] border border-[#ffe09e] shadow-[0_0_8px_rgba(198,154,80,0.7)]'
                              : 'bg-[#2e1d13] text-[#dfcdb0] border border-[#8a5d35] hover:border-[#c69a50]'
                          }`}
                          title={isWorking ? "Investigation active on this case. Click to stand down." : "Mobilize officers and analyze in Investigation Lab"}
                        >
                          {isWorking ? '⚡ Work ON' : 'Work On'}
                        </button>

                        {/* Open in Lab */}
                        <button
                          onClick={() => {
                            bureauAudio.telegraphBeep();
                            if (typeof onSelectCaseForLab === 'function') onSelectCaseForLab(c.case_ref);
                          }}
                          className="western-btn px-2 py-1 text-[10px]"
                          title="Open case in Investigation Lab"
                        >
                          Lab
                        </button>

                        {/* Edit Case Button */}
                        <button
                          onClick={() => handleOpenEdit(c)}
                          className="western-btn px-2 py-1 text-[10px] inline-flex items-center gap-1"
                          title="Edit Case Details"
                        >
                          <Edit3 size={11} />
                          <span>Edit</span>
                        </button>

                        {/* User-Controlled Close & Archive Case */}
                        <button
                          onClick={() => handleArchiveCase(c.case_ref, c.title)}
                          className="px-2 py-1 text-[10px] font-bold rounded inline-flex items-center gap-1 bg-[#4a2e19] hover:bg-[#603a1f] text-[#ffdfa6] border border-[#8f663c] transition-all shadow-sm"
                          title="Officially close this case and seal it in the permanent Bureau Archives"
                        >
                          <Archive size={11} className="text-[#e2b06e]" />
                          <span>Close & Archive</span>
                        </button>

                        {/* Delete Case */}
                        <button
                          onClick={() => handleDeleteCase(c.case_ref)}
                          className="p-1 text-red-800 hover:text-red-950 transition-colors inline-block align-middle"
                          title="Delete Dossier"
                        >
                          <Trash2 size={13} />
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {activeCases.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#7e5f3f]">
                      No active case dossiers in current ledger. {cases.length > 0 ? 'All closed dossiers are sealed in the Archives.' : 'Create a dossier above to begin investigation.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Edit Case Dossier Modal */}
      {editingCase && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="w-full max-w-lg bg-[#f5ecdb] text-[#24170f] rounded-lg border-2 border-[#8b653e] shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden font-elite">
            {/* Modal Header */}
            <div className="px-4 py-3 bg-gradient-to-r from-[#2b170c] via-[#1c1008] to-[#2b170c] border-b-2 border-[#805a34] flex items-center justify-between text-[#f5deb3]">
              <div className="flex items-center gap-2">
                <Edit3 size={16} className="text-[#c69a50]" />
                <h3 className="font-rye text-sm sm:text-base tracking-wide">
                  Edit Bureau Dossier — {editingCase.case_ref}
                </h3>
              </div>
              <button
                onClick={() => setEditingCase(null)}
                className="text-[#d4af37] hover:text-white p-1"
                title="Cancel Edit"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSaveEdit} className="p-5 space-y-4">
              <div>
                <label className="block text-[11px] font-bold text-[#56371f] mb-1">
                  CASE TITLE
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 bg-[#fdf8f0] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#56371f] mb-1">
                    SECURITY PRIORITY
                  </label>
                  <select
                    value={editPriority}
                    onChange={(e) => setEditPriority(e.target.value)}
                    className="w-full p-2 bg-[#fdf8f0] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  >
                    <option value="Critical">Critical Priority</option>
                    <option value="High">High Priority</option>
                    <option value="Medium">Medium Priority</option>
                    <option value="Low">Routine Priority</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#56371f] mb-1">
                    CASE STATUS
                  </label>
                  <select
                    value={editStatus}
                    onChange={(e) => setEditStatus(e.target.value)}
                    className="w-full p-2 bg-[#fdf8f0] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  >
                    <option value="Active">Active</option>
                    <option value="Under Deliberation">Under Deliberation</option>
                    <option value="Solved">Solved</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-[#56371f] mb-1">
                    INVESTIGATION CATEGORY
                  </label>
                  <input
                    type="text"
                    value={editCategory}
                    onChange={(e) => setEditCategory(e.target.value)}
                    className="w-full p-2 bg-[#fdf8f0] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-[#56371f] mb-1">
                    LEAD OFFICER
                  </label>
                  <select
                    value={editLeadOfficer}
                    onChange={(e) => setEditLeadOfficer(e.target.value)}
                    className="w-full p-2 bg-[#fdf8f0] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                  >
                    <option value="ARGUS">Detective Argus (Chief)</option>
                    <option value="APEX">Detective Apex (Deputy)</option>
                    <option value="LUTKIN">Officer Lutkin (Forensics)</option>
                    <option value="VANGUARD">Officer Vanguard (OSINT)</option>
                    <option value="CORTEX">Officer Cortex (Analytics)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-[#56371f] mb-1">
                  CASE NOTES / INTAKE SUMMARY
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-2 bg-[#fdf8f0] border border-[#96744c] rounded text-xs font-elite text-[#24170f] focus:outline-none focus:border-[#4d2f19]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#9c764e]/40">
                <button
                  type="button"
                  onClick={() => setEditingCase(null)}
                  className="western-btn px-4 py-1.5 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingEdit}
                  className="western-btn-gold px-5 py-1.5 text-xs font-bold shadow flex items-center gap-1.5"
                >
                  <Save size={13} />
                  <span>{isSavingEdit ? 'Saving Changes...' : 'Save Dossier Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

