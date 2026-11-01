import React, { useState, useEffect } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { Clock } from 'lucide-react';

export default function Header({ 
  activeView, 
  onViewChange 
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      setTimeStr(d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (viewId) => {
    bureauAudio.typewriterClick();
    onViewChange(viewId);
  };

  const navItems = [
    { id: 'headquarters', label: 'Headquarters' },
    { id: 'casefiles', label: 'Case Files' },
    { id: 'lab', label: 'Investigation Lab' },
    { id: 'clues', label: 'Clues & Suspect Web' },
    { id: 'reports', label: 'Reports Desk' },
    { id: 'archives', label: 'Archives' }
  ];

  return (
    <header className="topbar">
      <div className="brand cursor-pointer" onClick={() => handleNavClick('headquarters')}>
        <img 
          src="/favicon.png" 
          alt="ARGUS & Co." 
          className="brandmark-img"
        />
        <div>
          <strong>ARGUS & Co.</strong>
          <small>WESTERN INVESTIGATION BUREAU</small>
        </div>
      </div>

      <nav className="nav" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={isActive ? 'active' : ''}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="topright">
        <span className="dot"></span>
        <span>BUREAU STATUS: ON DUTY</span>
        <span style={{ marginLeft: '12px', opacity: 0.75 }}>{timeStr}</span>
      </div>
    </header>
  );
}
