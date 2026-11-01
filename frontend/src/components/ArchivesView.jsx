import React, { useState, useEffect } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { Archive, Search, Shield, Clock, FileCheck, ArrowUpRight } from 'lucide-react';

export default function ArchivesView({ cases = [], onSelectCase }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [auditLogs, setAuditLogs] = useState([]);

  useEffect(() => {
    fetch('/api/audit')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAuditLogs(data.logs || []);
      })
      .catch(console.error);
  }, []);

  const filteredCases = cases.filter(c => {
    const matchesSearch = c.case_ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (c.category && c.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#100d0a]">
      
      {/* Header */}
      <div className="flex-none p-4 bg-gradient-to-r from-[#21140c] via-[#170e09] to-[#21140c] border-b-2 border-[#b1844c] flex items-center justify-between">
        <div>
          <h1 className="font-rye text-xl md:text-2xl text-[#f0d9ad] tracking-wide">
            Agency Archives & Chain of Custody Ledger
          </h1>
          <p className="font-elite text-xs text-[#bda47b] mt-0.5">
            Historical case dossiers, immutable audit records, and officer operational activity.
          </p>
        </div>
        <span className="badge px-3 py-1 bg-[#5b3922] border border-[#a17849] text-[#f4dfb6] font-elite text-xs">
          {cases.length} HISTORICAL RECORDS
        </span>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
        
        {/* Search and Filters */}
        <div className="vintage-card p-4 rounded flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[240px]">
            <Search size={16} className="text-[#8d4829]" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by case reference, title, or category..."
              className="w-full p-2 bg-[#f4e8cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs font-elite text-[#523720] font-bold">STATUS:</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="p-1.5 px-3 bg-[#f4e8cf] text-[#24170f] font-elite text-xs border border-[#9b7b50] rounded focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Under Deliberation">Under Deliberation</option>
              <option value="Solved">Solved</option>
            </select>
          </div>
        </div>

        {/* Historical Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCases.map((c) => (
            <div
              key={c.case_ref}
              className="vintage-card p-4 rounded hover:bg-[#ebdcc0] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#a88258] pb-1.5 mb-2">
                  <span className="font-rye text-sm text-[#4d2f19]">{c.case_ref}</span>
                  <span className="text-[10px] font-elite px-2 py-0.5 rounded bg-[#4d2f19] text-[#f7e6ca]">
                    {c.status || 'Active'}
                  </span>
                </div>

                <h3 className="font-rye text-base text-[#301b0f] mb-1 leading-snug">{c.title}</h3>
                <p className="font-elite text-xs text-[#523720] line-clamp-3 mb-3">
                  {c.notes || c.summary || 'No intake summary.'}
                </p>

                <div className="text-[10px] font-elite text-[#6e4e30] space-y-1 mb-4">
                  <div><strong>CATEGORY:</strong> {c.category || 'Classified'}</div>
                  <div><strong>PRIORITY:</strong> {c.priority}</div>
                  <div><strong>EVIDENCE ATTACHED:</strong> {c.evidence_count || 0} file(s)</div>
                </div>
              </div>

              <div className="pt-2 border-t border-[#a88258] flex items-center justify-between">
                <span className="text-[9px] font-elite text-[#856545]">
                  {c.created_at ? new Date(c.created_at).toLocaleDateString() : 'Historical'}
                </span>
                <button
                  onClick={() => {
                    bureauAudio.telegraphBeep();
                    if (typeof onSelectCase === 'function') onSelectCase(c.case_ref);
                  }}
                  className="western-btn text-[10px] py-1 px-2.5 flex items-center gap-1"
                >
                  <span>Re-open Dossier</span>
                  <ArrowUpRight size={11} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Immutable Bureau Audit Trail */}
        <div className="vintage-card p-5 rounded">
          <div className="flex items-center gap-2 border-b border-[#a88258] pb-2 mb-3">
            <Clock size={16} className="text-[#8d4829]" />
            <h2 className="font-rye text-base text-[#3e2311]">
              Bureau Immutable Audit Log & Chain of Custody
            </h2>
          </div>

          <div className="max-h-64 overflow-y-auto font-elite text-xs text-[#3a2516] divide-y divide-[#a88258]/40">
            {auditLogs.map((log) => (
              <div key={log.id} className="py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#4b2d1d] text-[#f2e0be]">
                    {log.officer || 'SYSTEM'}
                  </span>
                  <strong className="text-[#4b2d1d]">{log.action}:</strong>
                  <span>{log.details || log.case_ref}</span>
                </div>
                <span className="text-[10px] text-[#735334] font-mono-code">
                  {log.created_at ? new Date(log.created_at).toLocaleTimeString() : ''}
                </span>
              </div>
            ))}

            {auditLogs.length === 0 && (
              <div className="py-6 text-center text-[#7e5f3f]">
                No audit events registered in current ledger.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

