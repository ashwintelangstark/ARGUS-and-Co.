import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage.jsx';
import AuthView from './components/AuthView.jsx';
import Header from './components/Header.jsx';
import ThreeHqScene from './components/ThreeHqScene.jsx';
import CaseFilesView from './components/CaseFilesView.jsx';
import InvestigationLab from './components/InvestigationLab.jsx';
import EvidenceBoard from './components/EvidenceBoard.jsx';
import ReportsView from './components/ReportsView.jsx';
import ArchivesView from './components/ArchivesView.jsx';
import ThreeCharacterModal from './components/ThreeCharacterModal.jsx';

export default function App() {
  // Application phase: 'landing' (opens first everywhere) | 'auth' (login/signup) | 'agency' (main app)
  const [appPhase, setAppPhase] = useState('landing');
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('argus_user') || sessionStorage.getItem('argus_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [activeView, setActiveView] = useState('headquarters');
  const [cases, setCases] = useState([]);
  const [selectedCaseRef, setSelectedCaseRef] = useState('');
  const [inspectingAgent, setInspectingAgent] = useState(null);
  const [activeSpeaker, setActiveSpeaker] = useState(null);

  const fetchCases = async () => {
    try {
      const res = await fetch('/api/cases');
      const data = await res.json();
      if (data.success && data.cases) {
        setCases(data.cases);
        if (data.cases.length === 0) {
          setSelectedCaseRef('');
        } else if (!data.cases.some(c => c.case_ref === selectedCaseRef)) {
          setSelectedCaseRef(data.cases[0].case_ref);
        }
      }
    } catch (e) {
      console.error('Failed to fetch cases:', e);
    }
  };

  useEffect(() => {
    fetchCases();
  }, []);

  const handleOpenLabWithCase = (caseRef) => {
    setSelectedCaseRef(caseRef);
    setActiveView('lab');
  };

  const handleViewReports = (caseRef) => {
    if (caseRef) setSelectedCaseRef(caseRef);
    setActiveView('reports');
  };

  const workingCase = cases.find(c => c.is_working_on === 1 || c.is_working_on === true) || null;

  const handleLogout = () => {
    localStorage.removeItem('argus_user');
    localStorage.removeItem('argus_token');
    localStorage.removeItem('argus_remembered_cipher');
    sessionStorage.removeItem('argus_user');
    sessionStorage.removeItem('argus_token');
    setCurrentUser(null);
    setAppPhase('auth');
  };

  // Phase 1: Landing Page (First screen presented everywhere)
  if (appPhase === 'landing') {
    return (
      <LandingPage
        currentUser={currentUser}
        onEnterAgency={() => {
          // If already authenticated and remembered, enter directly into the Bureau Agency!
          if (currentUser) {
            setAppPhase('agency');
          } else {
            setAppPhase('auth');
          }
        }}
        onSwitchUser={() => {
          setAppPhase('auth');
        }}
      />
    );
  }

  // Phase 2: Operative Credential Authentication (Sign In / Register / Forgot Password)
  if (appPhase === 'auth') {
    return (
      <AuthView
        onAuthSuccess={(user) => {
          setCurrentUser(user);
          setAppPhase('agency');
        }}
        onBackToLanding={() => setAppPhase('landing')}
      />
    );
  }

  // Phase 3: Active Bureau Investigation Suite
  return (
    <div id="app-container">
      {/* Top Navigation */}
      <Header
        activeView={activeView}
        onViewChange={(v) => setActiveView(v)}
        currentUser={currentUser}
        onExitToLanding={() => setAppPhase('landing')}
        onLogout={handleLogout}
      />

      {/* Main View Area */}
      <main className="main-viewport">
        {activeView === 'headquarters' && (
          <ThreeHqScene
            cases={cases}
            onSelectAgent={(agentId) => setInspectingAgent(agentId)}
            activeSpeaker={activeSpeaker}
          />
        )}

        {activeView === 'casefiles' && (
          <CaseFilesView
            cases={cases}
            onRefresh={fetchCases}
            onSelectCaseForLab={handleOpenLabWithCase}
          />
        )}

        {activeView === 'lab' && (
          <InvestigationLab
            cases={cases}
            selectedCaseRef={selectedCaseRef || workingCase?.case_ref || ''}
            onCaseChange={(ref) => setSelectedCaseRef(ref)}
            onOpenOfficerStudio={(agentId) => setInspectingAgent(agentId)}
            onViewReports={handleViewReports}
          />
        )}

        {activeView === 'clues' && (
          <EvidenceBoard
            caseRef={workingCase?.case_ref || null}
            caseTitle={workingCase?.title || ''}
            onNavigateToCaseFiles={() => setActiveView('casefiles')}
            onNavigateToLab={(ref) => {
              setSelectedCaseRef(ref);
              setActiveView('lab');
            }}
          />
        )}

        {activeView === 'reports' && (
          <ReportsView
            cases={cases}
            initialCaseRef={selectedCaseRef}
            onNavigateToArchives={() => {
              fetchCases();
              setActiveView('archives');
            }}
            onReAnalyseCase={(caseRef) => {
              setSelectedCaseRef(caseRef);
              setActiveView('lab');
            }}
            onRefreshCases={fetchCases}
          />
        )}

        {activeView === 'archives' && (
          <ArchivesView
            cases={cases}
            onSelectCase={handleOpenLabWithCase}
            onRefresh={fetchCases}
          />
        )}
      </main>

      {/* 3D Biometric Character Studio Modal */}
      {inspectingAgent && (
        <ThreeCharacterModal
          agentId={inspectingAgent}
          activeCaseRef={selectedCaseRef}
          onClose={() => setInspectingAgent(null)}
        />
      )}

      {/* Bottom Footer Status Strip */}
      <footer className="footer-strip">
        <span>ARGUS DETECTIVE AGENCY · FRONTIER DISTRICT · EST. 1891</span>
        <span>BUREAU EVIDENCE VAULT ACTIVE · 5-OFFICER MULTI-AGENT PROTOCOL</span>
      </footer>
    </div>
  );
}
