import React, { useState, useEffect } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { Clock } from 'lucide-react';

export default function Header({ 
  activeView, 
  onViewChange,
  currentUser,
  onExitToLanding,
  onLogout
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

      <div className="topright" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span className="dot"></span>
        <span>BUREAU STATUS: ON DUTY</span>
        {currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid #78502c', paddingLeft: '8px' }}>
            <span style={{ color: '#d5a45b', fontFamily: "'Special Elite', monospace", fontSize: '11px' }}>
              OPERATIVE: {currentUser.username}
            </span>
            {onLogout && (
              <button
                onClick={() => {
                  bureauAudio.typewriterClick();
                  onLogout();
                }}
                title="Conclude operative duty and switch account"
                style={{
                  background: 'rgba(60, 25, 18, 0.85)',
                  border: '1px solid #8e3e2b',
                  color: '#fca5a5',
                  padding: '2px 6px',
                  fontSize: '9px',
                  fontFamily: "'Special Elite', monospace",
                  cursor: 'pointer',
                  borderRadius: '2px',
                  transition: 'all 0.15s'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#ef4444';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#8e3e2b';
                  e.currentTarget.style.color = '#fca5a5';
                }}
              >
                LOG OUT
              </button>
            )}
          </div>
        )}
        <span style={{ opacity: 0.75 }}>{timeStr}</span>
        {onExitToLanding && (
          <button
            onClick={() => {
              bureauAudio.typewriterClick();
              onExitToLanding();
            }}
            title="Exit to Public Landing Page"
            style={{
              background: 'rgba(50, 30, 16, 0.85)',
              border: '1px solid #78502c',
              color: '#d5a45b',
              padding: '3px 8px',
              fontSize: '10px',
              fontFamily: "'Special Elite', monospace",
              cursor: 'pointer',
              borderRadius: '2px',
              transition: 'all 0.15s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#d5a45b';
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#78502c';
              e.currentTarget.style.color = '#d5a45b';
            }}
          >
            LANDING
          </button>
        )}
      </div>
    </header>
  );
}
