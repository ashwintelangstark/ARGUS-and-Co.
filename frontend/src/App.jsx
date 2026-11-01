import React, { useState, useEffect } from 'react';
import Header from './components/Header.jsx';
import ThreeHqScene from './components/ThreeHqScene.jsx';
import CaseFilesView from './components/CaseFilesView.jsx';
import InvestigationLab from './components/InvestigationLab.jsx';
import EvidenceBoard from './components/EvidenceBoard.jsx';
import ReportsView from './components/ReportsView.jsx';
import ArchivesView from './components/ArchivesView.jsx';
import ThreeCharacterModal from './components/ThreeCharacterModal.jsx';

export default function App() {
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
        if (!selectedCaseRef && data.cases.length > 0) {
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

  return (
    <div id="app-container">
      {/* Top Navigation */}
      <Header
        activeView={activeView}
        onViewChange={(v) => setActiveView(v)}
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
            selectedCaseRef={selectedCaseRef}
            onCaseChange={(ref) => setSelectedCaseRef(ref)}
            onOpenOfficerStudio={(agentId) => setInspectingAgent(agentId)}
            onViewReports={handleViewReports}
          />
        )}

        {activeView === 'clues' && (
          <EvidenceBoard
            caseRef={selectedCaseRef || (cases[0]?.case_ref || 'ARG-1891-001')}
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
