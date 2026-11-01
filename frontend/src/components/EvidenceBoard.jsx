import React, { useState, useEffect, useRef } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { 
  Pin, Plus, Trash2, Link as LinkIcon, AlertCircle, 
  MapPin, UserCheck, FileText, Sparkles, RefreshCw, X 
} from 'lucide-react';

export default function EvidenceBoard({ caseRef, onClueSelected }) {
  const [clues, setClues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState('evidence'); // suspect, evidence, location, hypothesis
  const [newDesc, setNewDesc] = useState('');
  const [selectedClue, setSelectedClue] = useState(null);
  const [linkingFrom, setLinkingFrom] = useState(null);

  const boardRef = useRef(null);

  // Fetch clues
  const fetchClues = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/cases/${caseRef}/clues`);
      const data = await res.json();
      if (data.success) {
        setClues(data.clues.map(c => ({
          ...c,
          connections: typeof c.connections === 'string' ? JSON.parse(c.connections || '[]') : (c.connections || [])
        })));
      }
    } catch (e) {
      console.error('Failed to load clues:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (caseRef) fetchClues();
  }, [caseRef]);

  // Add new clue
  const handleAddClue = async (e) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    bureauAudio.cameraShutter();

    const colors = {
      suspect: '#f59e0b',
      evidence: '#00d2ff',
      location: '#10b981',
      hypothesis: '#a855f7'
    };

    try {
      const res = await fetch(`/api/cases/${caseRef}/clues`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          type: newType,
          description: newDesc.trim(),
          pos_x: (Math.random() - 0.5) * 4,
          pos_y: (Math.random() - 0.5) * 3,
          color: colors[newType] || '#d9c49b',
          connections: []
        })
      });
      const data = await res.json();
      if (data.success) {
        setNewTitle('');
        setNewDesc('');
        setIsAddOpen(false);
        fetchClues();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete clue
  const handleDeleteClue = async (id, e) => {
    e.stopPropagation();
    if (!confirm('Remove this pinned clue from the investigation board?')) return;
    try {
      await fetch(`/api/clues/${id}`, { method: 'DELETE' });
      fetchClues();
    } catch (err) {
      console.error(err);
    }
  };

  // Connect two clues with red string yarn
  const handleConnectClues = async (targetId) => {
    if (!linkingFrom || linkingFrom === targetId) {
      setLinkingFrom(targetId);
      bureauAudio.telegraphBeep();
      return;
    }

    bureauAudio.cameraShutter();
    const source = clues.find(c => c.id === linkingFrom);
    if (!source) return;

    const newConnections = Array.from(new Set([...source.connections, targetId]));

    try {
      await fetch(`/api/clues/${source.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ connections: newConnections })
      });
      setLinkingFrom(null);
      fetchClues();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col bg-[#140e0a] overflow-hidden select-none">
      
      {/* Board Top Toolbar */}
      <div className="h-12 bg-gradient-to-r from-[#21140c] via-[#160e09] to-[#21140c] border-b border-[#734e2c] px-4 flex items-center justify-between z-20 flex-none">
        <div className="flex items-center gap-2">
          <Pin size={16} className="text-[#c69a50]" />
          <h2 className="font-rye text-sm md:text-base text-[#f2e0be]">
            CLUES & SUSPECT WEB — {caseRef}
          </h2>
          <span className="text-[10px] font-elite text-[#bd9f6f]">
            ({clues.length} Items Pinned)
          </span>
        </div>

        <div className="flex items-center gap-2">
          {linkingFrom && (
            <div className="text-[10px] font-elite bg-red-950/80 border border-red-500 text-red-200 px-2 py-0.5 rounded flex items-center gap-1.5 animate-pulse">
              <span>Stringing Red Yarn: Click target clue to attach</span>
              <button onClick={() => setLinkingFrom(null)} className="hover:text-white"><X size={12} /></button>
            </div>
          )}

          <button
            onClick={() => setIsAddOpen(true)}
            className="western-btn text-[11px] py-1 px-3 border-[#c49a52]"
          >
            <Plus size={13} /> Pin New Clue
          </button>
          <button
            onClick={fetchClues}
            className="western-btn text-[11px] py-1 px-2.5"
            title="Refresh Board"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* Main Corkboard Area with SVG Red Yarn Lines */}
      <div 
        ref={boardRef}
        className="relative flex-1 bg-[#1a120b] overflow-auto p-8"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(20, 14, 9, 0.45) 0%, rgba(8, 5, 3, 0.95) 100%),
            url('https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop')
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        
        {/* Corkboard Texture Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

        {/* Clues Card Grid */}
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {clues.map((clue) => {
            const isSelected = selectedClue?.id === clue.id;
            const isSource = linkingFrom === clue.id;

            return (
              <div
                key={clue.id}
                onClick={() => {
                  if (linkingFrom) {
                    handleConnectClues(clue.id);
                  } else {
                    setSelectedClue(clue);
                  }
                }}
                className={`relative p-4 rounded bg-[#e8d5b5] text-[#2c1c11] border-2 shadow-xl transition-all cursor-pointer transform hover:-translate-y-1 ${
                  isSource 
                    ? 'border-red-600 ring-4 ring-red-500/50 scale-105' 
                    : isSelected 
                    ? 'border-[#c69a50] ring-2 ring-[#c69a50]' 
                    : 'border-[#94734b] hover:border-[#b88f57]'
                }`}
                style={{
                  boxShadow: '0 8px 22px rgba(0,0,0,0.6)'
                }}
              >
                {/* Brass Pin on top */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-gradient-to-br from-[#ffd580] via-[#c69a50] to-[#784e1b] border border-[#ffe9b8] shadow-md flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#3d240e]" />
                </div>

                {/* Badge Type */}
                <div className="flex items-center justify-between text-[10px] font-elite font-bold tracking-wider mb-2 pt-1 border-b border-[#8f6d44]/30 pb-1">
                  <span 
                    className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider text-black font-semibold"
                    style={{ backgroundColor: clue.color || '#d9c49b' }}
                  >
                    {clue.type}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setLinkingFrom(clue.id);
                        bureauAudio.telegraphBeep();
                      }}
                      className="p-1 hover:text-red-700 transition-colors"
                      title="Attach Red Yarn"
                    >
                      <LinkIcon size={12} />
                    </button>
                    <button
                      onClick={(e) => handleDeleteClue(clue.id, e)}
                      className="p-1 hover:text-red-800 transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Optional Image */}
                {clue.image_url && (
                  <div className="mb-2 p-1 bg-white shadow rounded overflow-hidden">
                    <img 
                      src={clue.image_url} 
                      alt={clue.title} 
                      className="w-full h-32 object-cover rounded filter contrast-105 brightness-95" 
                    />
                  </div>
                )}

                {/* Clue Title */}
                <h3 className="font-rye text-sm leading-snug mb-1 text-[#3b2413]">
                  {clue.title}
                </h3>

                {/* Description */}
                <p className="font-elite text-xs leading-relaxed text-[#543b23] line-clamp-3">
                  {clue.description || 'No description recorded.'}
                </p>

                {/* Connected Clues Count */}
                {clue.connections?.length > 0 && (
                  <div className="mt-3 pt-1 border-t border-[#8f6d44]/30 text-[9px] font-elite text-red-900 font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-red-600 inline-block" />
                    <span>Connected to {clue.connections.length} item(s) by red yarn</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {clues.length === 0 && !loading && (
          <div className="text-center py-24 text-[#9c7d54] font-elite">
            <p className="text-sm">No evidence or suspect items pinned to this case board yet.</p>
            <p className="text-xs mt-1">Click "Pin New Clue" above or run the Bureau Conclave to auto-generate findings.</p>
          </div>
        )}

      </div>

      {/* Add Clue Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-150">
          <form 
            onSubmit={handleAddClue}
            className="w-full max-w-md bg-[#e4d1ad] text-[#2b1b11] p-6 rounded border-2 border-[#805e3a] shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-[#9c764e] pb-2">
              <h3 className="font-rye text-lg text-[#3e2311]">Pin Clue / Suspect to Board</h3>
              <button 
                type="button" 
                onClick={() => setIsAddOpen(false)}
                className="hover:text-red-800"
              >
                <X size={18} />
              </button>
            </div>

            <div>
              <label className="block text-xs font-elite font-bold mb-1 text-[#4d2f19]">TITLE / ENTITY NAME</label>
              <input
                type="text"
                required
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                placeholder="e.g. Master Key Override Token"
                className="w-full p-2 bg-[#f4e8cf] border border-[#8f6a42] rounded text-xs font-elite focus:outline-none focus:border-[#4d2f19]"
              />
            </div>

            <div>
              <label className="block text-xs font-elite font-bold mb-1 text-[#4d2f19]">CATEGORY / CLUE TYPE</label>
              <select
                value={newType}
                onChange={(e) => setNewType(e.target.value)}
                className="w-full p-2 bg-[#f4e8cf] border border-[#8f6a42] rounded text-xs font-elite focus:outline-none focus:border-[#4d2f19]"
              >
                <option value="evidence">Evidence Item (Digital/Physical)</option>
                <option value="suspect">Suspect / Person of Interest</option>
                <option value="location">Crime Scene / Location</option>
                <option value="hypothesis">Investigative Hypothesis / Theory</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-elite font-bold mb-1 text-[#4d2f19]">CASE OBSERVATION NOTES</label>
              <textarea
                rows={3}
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Describe observations, timestamps, inconsistencies..."
                className="w-full p-2 bg-[#f4e8cf] border border-[#8f6a42] rounded text-xs font-elite focus:outline-none focus:border-[#4d2f19]"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddOpen(false)}
                className="px-3 py-1.5 text-xs font-elite border border-[#8f6a42] rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="western-btn-gold px-4 py-1.5 text-xs font-elite rounded font-bold"
              >
                Pin to Board
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
}

