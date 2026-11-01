import React, { useState } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { 
  FolderPlus, UploadCloud, File, Trash2, ExternalLink, 
  ShieldCheck, FileCheck, AlertTriangle, CheckCircle2 
} from 'lucide-react';

export default function CaseFilesView({ 
  cases = [], 
  onRefresh, 
  onSelectCaseForLab 
}) {
  const [caseRef, setCaseRef] = useState(`ARG-1891-00${cases.length + 1}`);
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState('High');
  const [category, setCategory] = useState('Classified Investigation');
  const [notes, setNotes] = useState('');
  const [pendingFiles, setPendingFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  // File Handling
  const handleFileDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer?.files) {
      addFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files) {
      addFiles(Array.from(e.target.files));
    }
  };

  const addFiles = (files) => {
    const allowed = ['doc', 'docx', 'xls', 'xlsx', 'csv', 'jpg', 'jpeg', 'heic', 'png', 'pdf', 'txt', 'dat', 'log'];
    const valid = [];

    for (const f of files) {
      const ext = f.name.split('.').pop().toLowerCase();
      if (!allowed.includes(ext)) {
        alert(`File format .${ext} is not in the allowed evidence register.`);
        continue;
      }
      if (!pendingFiles.some(x => x.name === f.name && x.size === f.size)) {
        valid.push(f);
      }
    }

    if (valid.length > 0) {
      bureauAudio.cameraShutter();
      setPendingFiles(prev => [...prev, ...valid]);
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
    if (!caseRef.trim() || !title.trim()) {
      alert('Case Reference and Case Title are required.');
      return;
    }

    setIsSubmitting(true);
    bureauAudio.typewriterClick();

    try {
      // 1. Create Case record
      const caseRes = await fetch('/api/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          case_ref: caseRef.trim(),
          title: title.trim(),
          priority,
          category,
          summary: notes.slice(0, 200),
          notes
        })
      });

      const caseData = await caseRes.json();
      if (!caseData.success) {
        throw new Error(caseData.error || 'Failed to create case');
      }

      // 2. Upload Evidence Files if any
      if (pendingFiles.length > 0) {
        const formData = new FormData();
        pendingFiles.forEach(f => formData.append('files', f));
        formData.append('notes', `Evidence logged at case intake for ${caseRef}`);
        formData.append('assigned_officer', 'LUTKIN');

        const uploadRes = await fetch(`/api/cases/${encodeURIComponent(caseRef)}/evidence`, {
          method: 'POST',
          body: formData
        });
        const uploadData = await uploadRes.json();
        if (!uploadData.success) {
          console.warn('Upload error:', uploadData.error);
        }
      }

      bureauAudio.conclaveChime();
      setNotification(`Dossier ${caseRef} registered and locked into the Bureau Ledger.`);
      
      // Reset form
      setCaseRef(`ARG-1891-00${cases.length + 2}`);
      setTitle('');
      setNotes('');
      setPendingFiles([]);

      if (typeof onRefresh === 'function') onRefresh();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Case
  const handleDeleteCase = async (ref) => {
    if (!confirm(`Are you certain you wish to delete and purge Case Dossier ${ref}?`)) return;
    try {
      await fetch(`/api/cases/${encodeURIComponent(ref)}`, { method: 'DELETE' });
      bureauAudio.cameraShutter();
      if (typeof onRefresh === 'function') onRefresh();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]">
      
      {/* Header */}
      <div className="flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex items-center justify-between">
        <div>
          <h1 className="font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide">
            Case Files & Evidence Register
          </h1>
          <p className="font-elite text-xs text-[#bda47b] mt-0.5">
            Register classified case materials, compute cryptographic hashes, and maintain chain-of-custody.
          </p>
        </div>
        <span className="badge px-3 py-1 bg-[#5b3922] border border-[#a17849] text-[#f4dfb6] font-elite text-xs">
          {cases.length} REGISTERED DOSSIERS
        </span>
      </div>

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
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
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
                    Supports DOC, DOCX, XLS, CSV, JPG, PNG, PDF, TXT, DAT, LOG
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
          <h2 className="font-rye text-lg text-[#3e2311] border-b border-[#a88258] pb-2 mb-4">
            Active Bureau Dossier Ledger
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
                {cases.map((c) => (
                  <tr key={c.id || c.case_ref} className="hover:bg-[#ebdcc0] transition-colors">
                    <td className="p-2.5 text-[#2b1b11]">
                      <strong className="font-rye text-sm text-[#4d2f19] block">{c.case_ref}</strong>
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
                    <td className="p-2.5 text-right space-x-2">
                      <button
                        onClick={() => {
                          bureauAudio.telegraphBeep();
                          if (typeof onSelectCaseForLab === 'function') onSelectCaseForLab(c.case_ref);
                        }}
                        className="western-btn px-2.5 py-1 text-[10px]"
                      >
                        ⚒ Open in Lab
                      </button>
                      <button
                        onClick={() => handleDeleteCase(c.case_ref)}
                        className="p-1 text-red-800 hover:text-red-950 transition-colors"
                        title="Delete Dossier"
                      >
                        <Trash2 size={13} />
                      </button>
                    </td>
                  </tr>
                ))}

                {cases.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-[#7e5f3f]">
                      No case dossiers found in active registry. Create a dossier above to begin investigation.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
}

