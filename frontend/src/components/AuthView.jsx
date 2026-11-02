import React, { useState, useEffect } from 'react';
import { bureauAudio } from '../utils/audio.js';
import { Shield, Key, Mail, User, Check, AlertCircle, ArrowLeft, Send } from 'lucide-react';

export default function AuthView({ onAuthSuccess, onBackToLanding }) {
  useEffect(() => {
    document.documentElement.classList.add('auth-active');
    document.body.classList.add('auth-active');
    return () => {
      document.documentElement.classList.remove('auth-active');
      document.body.classList.remove('auth-active');
    };
  }, []);

  const [mode, setMode] = useState('login'); // 'login' | 'signup' | 'forgot'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [dispatchInfo, setDispatchInfo] = useState('');

  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);

  const resetForm = () => {
    setError('');
    setSuccessMsg('');
    setDispatchInfo('');
  };

  const switchMode = (newMode) => {
    bureauAudio.typewriterClick();
    resetForm();
    setMode(newMode);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    bureauAudio.typewriterClick();
    setError('');
    setSuccessMsg('');

    if (!username.trim() || !password) {
      setError('Please provide both your operative handle and cipher password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          password,
          rememberMe
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Authentication rejected by Bureau Registry.');
      }

      // Store session according to Remember Me preference
      if (rememberMe) {
        localStorage.setItem('argus_user', JSON.stringify(data.user));
        localStorage.setItem('argus_token', data.token);
        sessionStorage.removeItem('argus_user');
      } else {
        sessionStorage.setItem('argus_user', JSON.stringify(data.user));
        sessionStorage.setItem('argus_token', data.token);
        localStorage.removeItem('argus_user');
      }

      bureauAudio.cameraShutter();
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    bureauAudio.typewriterClick();
    setError('');
    setSuccessMsg('');

    if (!username.trim() || !email.trim() || !password || !confirmPassword) {
      setError('All credential registration fields are required.');
      return;
    }

    if (username.trim().length < 3) {
      setError('Operative handle must be at least 3 characters.');
      return;
    }

    if (password.length < 6) {
      setError('Cipher password must be at least 6 characters in length.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Cipher confirmation does not match the chosen password.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim(),
          email: email.trim(),
          password,
          confirmPassword
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to enlist operative.');
      }

      // Auto save credentials
      localStorage.setItem('argus_user', JSON.stringify(data.user));
      localStorage.setItem('argus_token', data.token);

      bureauAudio.cameraShutter();
      onAuthSuccess(data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    bureauAudio.telegraphBeep();
    setError('');
    setSuccessMsg('');
    setDispatchInfo('');

    if (!username.trim()) {
      setError('Please enter your operative handle or dispatch email address.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: username.trim()
        })
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to locate operative dossier.');
      }

      setSuccessMsg(data.message || `Recovery cipher dispatched to registered email.`);
      if (data.dispatchNotice) {
        setDispatchInfo(data.dispatchNotice);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      background: 'radial-gradient(ellipse at 50% 30%, #3e2615, #150d08 70%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background paper texture tint */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.08,
        pointerEvents: 'none',
        backgroundImage: `radial-gradient(#d5a45b 1px, transparent 1px)`,
        backgroundSize: '24px 24px'
      }} />

      {/* Return to Landing Button */}
      <button
        onClick={() => {
          bureauAudio.typewriterClick();
          if (onBackToLanding) onBackToLanding();
        }}
        style={{
          position: 'absolute',
          top: '24px',
          left: '24px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(28, 17, 10, 0.85)',
          border: '1px solid #78502c',
          color: '#d5a45b',
          padding: '8px 16px',
          fontFamily: "'Special Elite', monospace",
          fontSize: '12px',
          cursor: 'pointer',
          borderRadius: '2px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = '#d5a45b';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = '#78502c';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <ArrowLeft size={14} />
        RETURN TO BUREAU LANDING
      </button>

      {/* Main Authentication Ledger Card */}
      <div style={{
        width: '100%',
        maxWidth: '480px',
        background: 'linear-gradient(145deg, #2a180e, #180e08 80%)',
        border: '2px solid #8a6035',
        outline: '1px solid rgba(213, 164, 91, 0.3)',
        outlineOffset: '-6px',
        borderRadius: '3px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(183, 126, 55, 0.15)',
        padding: '36px 32px',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Bureau Medallion & Header */}
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            margin: '0 auto 12px',
            borderRadius: '50%',
            padding: '4px',
            background: 'linear-gradient(135deg, #e6bf79, #54321a 40%, #b77e37 70%, #24150b)',
            boxShadow: '0 8px 20px rgba(0,0,0,0.6), 0 0 20px rgba(213,164,91,0.2)'
          }}>
            <img
              src="/logo.png"
              alt="ARGUS & Co."
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                objectFit: 'cover',
                border: '1px solid #d5a45b'
              }}
            />
          </div>
          <h1 style={{
            fontFamily: "'Cinzel', Georgia, serif",
            fontSize: '24px',
            fontWeight: 700,
            color: '#f2dfbd',
            margin: '0 0 4px',
            letterSpacing: '2px'
          }}>
            ARGUS &amp; Co.
          </h1>
          <div style={{
            fontFamily: "'Special Elite', monospace",
            fontSize: '11px',
            letterSpacing: '3px',
            color: '#c99a53'
          }}>
            OPERATIVE CREDENTIAL GATEWAY
          </div>
        </div>

        {/* Mode Selector Tabs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '8px',
          marginBottom: '24px',
          background: 'rgba(19, 12, 8, 0.6)',
          padding: '4px',
          border: '1px solid #5d3c21'
        }}>
          <button
            type="button"
            onClick={() => switchMode('login')}
            style={{
              padding: '10px 8px',
              fontFamily: "'Cinzel', serif",
              fontSize: '12px',
              fontWeight: mode === 'login' ? '700' : '400',
              letterSpacing: '1px',
              background: mode === 'login' ? 'linear-gradient(135deg, #a36d31, #6b431c)' : 'transparent',
              color: mode === 'login' ? '#f5e4c3' : '#a9906c',
              border: mode === 'login' ? '1px solid #d5a45b' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            SIGN IN
          </button>
          <button
            type="button"
            onClick={() => switchMode('signup')}
            style={{
              padding: '10px 8px',
              fontFamily: "'Cinzel', serif",
              fontSize: '12px',
              fontWeight: mode === 'signup' ? '700' : '400',
              letterSpacing: '1px',
              background: mode === 'signup' ? 'linear-gradient(135deg, #a36d31, #6b431c)' : 'transparent',
              color: mode === 'signup' ? '#f5e4c3' : '#a9906c',
              border: mode === 'signup' ? '1px solid #d5a45b' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
          >
            ENLIST OPERATIVE
          </button>
        </div>

        {/* Error Notification Banner */}
        {error && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '12px 14px',
            background: 'rgba(92, 24, 18, 0.75)',
            border: '1px solid #c93b2b',
            color: '#f8d7da',
            fontSize: '12px',
            fontFamily: "'Special Elite', monospace",
            lineHeight: 1.5,
            marginBottom: '18px',
            borderRadius: '2px'
          }}>
            <AlertCircle size={16} style={{ color: '#ff6b6b', flexShrink: 0, marginTop: '2px' }} />
            <span>{error}</span>
          </div>
        )}

        {/* Success Notification Banner */}
        {successMsg && (
          <div style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            padding: '12px 14px',
            background: 'rgba(28, 64, 38, 0.8)',
            border: '1px solid #3ca55c',
            color: '#d4edda',
            fontSize: '12px',
            fontFamily: "'Special Elite', monospace",
            lineHeight: 1.5,
            marginBottom: '18px',
            borderRadius: '2px'
          }}>
            <Check size={16} style={{ color: '#4ade80', flexShrink: 0, marginTop: '2px' }} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Telegraph Dispatch Simulation Box */}
        {dispatchInfo && (
          <div style={{
            padding: '12px 14px',
            background: 'rgba(64, 45, 18, 0.9)',
            border: '1px dashed #d5a45b',
            color: '#fef08a',
            fontSize: '12px',
            fontFamily: "'Courier New', monospace",
            lineHeight: 1.5,
            marginBottom: '18px',
            borderRadius: '2px',
            wordBreak: 'break-all'
          }}>
            <strong style={{ color: '#facc15' }}>TELEGRAPH ADVISORY:</strong> {dispatchInfo}
          </div>
        )}

        {/* FORM: LOGIN */}
        {mode === 'login' && (
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Special Elite', monospace",
                fontSize: '11px',
                color: '#d5a45b',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                OPERATIVE HANDLE OR EMAIL
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#907452'
                }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. InspectorVance"
                  autoComplete="username"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    background: '#150d08',
                    border: '1px solid #78502c',
                    color: '#f2dfbd',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d5a45b'}
                  onBlur={(e) => e.target.style.borderColor = '#78502c'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <label style={{
                  fontFamily: "'Special Elite', monospace",
                  fontSize: '11px',
                  color: '#d5a45b',
                  letterSpacing: '1px'
                }}>
                  ACCESS CIPHER (PASSWORD)
                </label>
                <button
                  type="button"
                  onClick={() => switchMode('forgot')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c79c5a',
                    fontFamily: "'Special Elite', monospace",
                    fontSize: '11px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Forgot cipher?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Key size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#907452'
                }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="current-password"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    background: '#150d08',
                    border: '1px solid #78502c',
                    color: '#f2dfbd',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d5a45b'}
                  onBlur={(e) => e.target.style.borderColor = '#78502c'}
                />
              </div>
            </div>

            {/* Remember Me Option */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '22px',
              cursor: 'pointer'
            }} onClick={() => setRememberMe(!rememberMe)}>
              <div style={{
                width: '18px',
                height: '18px',
                border: '1px solid #8a6035',
                background: rememberMe ? '#8a6035' : '#150d08',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '2px',
                transition: 'all 0.15s'
              }}>
                {rememberMe && <Check size={14} style={{ color: '#150d08', strokeWidth: 3 }} />}
              </div>
              <span style={{
                fontFamily: "'Special Elite', monospace",
                fontSize: '12px',
                color: '#bba17c',
                userSelect: 'none'
              }}>
                Remember this operative session
              </span>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                background: 'linear-gradient(135deg, #e0bb77, #a36d31)',
                border: '1px solid #f0d49a',
                color: '#1b1008',
                fontFamily: "'Cinzel', serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(183, 124, 52, 0.3)',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(183, 124, 52, 0.45)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(183, 124, 52, 0.3)';
              }}
            >
              {loading ? 'AUTHENTICATING DOSSIER...' : 'ENTER THE AGENCY ↗'}
            </button>
          </form>
        )}

        {/* FORM: SIGN UP (COMMISSION OPERATIVE) */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp}>
            <div style={{ marginBottom: '14px' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Special Elite', monospace",
                fontSize: '11px',
                color: '#d5a45b',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                CHOOSE OPERATIVE HANDLE (UNIQUE USERNAME)
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#907452'
                }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="e.g. AgentMiller"
                  autoComplete="username"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    background: '#150d08',
                    border: '1px solid #78502c',
                    color: '#f2dfbd',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d5a45b'}
                  onBlur={(e) => e.target.style.borderColor = '#78502c'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Special Elite', monospace",
                fontSize: '11px',
                color: '#d5a45b',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                TELEGRAPH DISPATCH ADDRESS (EMAIL)
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#907452'
                }} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="operative@agency.bureau"
                  autoComplete="email"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    background: '#150d08',
                    border: '1px solid #78502c',
                    color: '#f2dfbd',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d5a45b'}
                  onBlur={(e) => e.target.style.borderColor = '#78502c'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Special Elite', monospace",
                fontSize: '11px',
                color: '#d5a45b',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                CREATE ACCESS CIPHER (PASSWORD - MIN 6 CHARS)
              </label>
              <div style={{ position: 'relative' }}>
                <Key size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#907452'
                }} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    background: '#150d08',
                    border: '1px solid #78502c',
                    color: '#f2dfbd',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d5a45b'}
                  onBlur={(e) => e.target.style.borderColor = '#78502c'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Special Elite', monospace",
                fontSize: '11px',
                color: '#d5a45b',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                CONFIRM ACCESS CIPHER
              </label>
              <div style={{ position: 'relative' }}>
                <Key size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#907452'
                }} />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••••••"
                  autoComplete="new-password"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    background: '#150d08',
                    border: '1px solid #78502c',
                    color: '#f2dfbd',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d5a45b'}
                  onBlur={(e) => e.target.style.borderColor = '#78502c'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                background: 'linear-gradient(135deg, #e0bb77, #a36d31)',
                border: '1px solid #f0d49a',
                color: '#1b1008',
                fontFamily: "'Cinzel', serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(183, 124, 52, 0.3)',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 25px rgba(183, 124, 52, 0.45)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 20px rgba(183, 124, 52, 0.3)';
              }}
            >
              {loading ? 'COMMISSIONING OPERATIVE...' : 'COMMISSION OPERATIVE & ENTER ↗'}
            </button>
          </form>
        )}

        {/* FORM: FORGOT PASSWORD / CIPHER RECOVERY */}
        {mode === 'forgot' && (
          <form onSubmit={handleForgotPassword}>
            <div style={{
              background: 'rgba(21, 13, 8, 0.7)',
              border: '1px solid #78502c',
              padding: '14px',
              marginBottom: '18px',
              fontFamily: "'Special Elite', monospace",
              fontSize: '12px',
              color: '#c7ad83',
              lineHeight: 1.6
            }}>
              Enter your registered operative handle or telegraph address. The Bureau Registry will verify your dossier and transmit a renewed emergency cipher directly to your inbox.
            </div>

            <div style={{ marginBottom: '22px' }}>
              <label style={{
                display: 'block',
                fontFamily: "'Special Elite', monospace",
                fontSize: '11px',
                color: '#d5a45b',
                letterSpacing: '1px',
                marginBottom: '6px'
              }}>
                OPERATIVE HANDLE OR REGISTERED EMAIL
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#907452'
                }} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Operative handle or email"
                  required
                  style={{
                    width: '100%',
                    padding: '11px 12px 11px 38px',
                    background: '#150d08',
                    border: '1px solid #78502c',
                    color: '#f2dfbd',
                    fontSize: '14px',
                    fontFamily: "'DM Sans', sans-serif",
                    borderRadius: '2px',
                    outline: 'none',
                    boxSizing: 'border-box'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#d5a45b'}
                  onBlur={(e) => e.target.style.borderColor = '#78502c'}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '13px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                background: 'linear-gradient(135deg, #e0bb77, #a36d31)',
                border: '1px solid #f0d49a',
                color: '#1b1008',
                fontFamily: "'Cinzel', serif",
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '2px',
                cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 8px 20px rgba(183, 124, 52, 0.3)',
                transition: 'all 0.2s',
                opacity: loading ? 0.7 : 1,
                marginBottom: '16px'
              }}
            >
              <Send size={15} />
              {loading ? 'TRANSMITTING DISPATCH...' : 'TRANSMIT RECOVERY CIPHER'}
            </button>

            <div style={{ textAlign: 'center' }}>
              <button
                type="button"
                onClick={() => switchMode('login')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#d5a45b',
                  fontFamily: "'Special Elite', monospace",
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                ← Back to Credential Sign In
              </button>
            </div>
          </form>
        )}

        {/* Footer Note */}
        <div style={{
          marginTop: '24px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(120, 80, 44, 0.4)',
          textAlign: 'center',
          fontFamily: "'Special Elite', monospace",
          fontSize: '10px',
          letterSpacing: '2px',
          color: '#907452'
        }}>
          CONFIDENTIAL · WESTERN DISTRICT DOSSIER VAULT
        </div>
      </div>
    </div>
  );
}

