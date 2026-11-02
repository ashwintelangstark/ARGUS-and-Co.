import React, { useEffect, useRef } from 'react';
import { bureauAudio } from '../utils/audio.js';
import '../landing.css';

export default function LandingPage({ onEnterAgency }) {
  const containerRef = useRef(null);

  useEffect(() => {
    // 1. Intersection Observer for standard reveal elements
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('show');
            revealObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const reveals = document.querySelectorAll('.landing-wrapper .reveal');
    reveals.forEach((el) => revealObserver.observe(el));

    // 2. Intersection Observer for story rows
    const storyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
            storyObserver.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const storyRows = document.querySelectorAll('.landing-wrapper .story-row');
    storyRows.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 3, 2) * 90}ms`;
      storyObserver.observe(el);
    });

    // 3. Scroll progress bar indicator
    const bar = document.getElementById('scrollProgress');
    const handleScroll = () => {
      if (!bar) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 4. Interactive 3D card tilt on hover
    const agentCards = document.querySelectorAll('.landing-wrapper .agent');
    const moveHandlers = [];

    agentCards.forEach((c) => {
      const handleMouseMove = (e) => {
        const r = c.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        c.style.transform = `translateY(-8px) rotateY(${x * 8}deg) rotateX(${-y * 6}deg)`;
      };
      const handleMouseLeave = () => {
        c.style.transform = '';
      };
      c.addEventListener('mousemove', handleMouseMove);
      c.addEventListener('mouseleave', handleMouseLeave);
      moveHandlers.push({ c, handleMouseMove, handleMouseLeave });
    });

    return () => {
      revealObserver.disconnect();
      storyObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      moveHandlers.forEach(({ c, handleMouseMove, handleMouseLeave }) => {
        c.removeEventListener('mousemove', handleMouseMove);
        c.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  const handleAction = () => {
    bureauAudio.typewriterClick();
    if (onEnterAgency) {
      onEnterAgency();
    }
  };

  const scrollToSection = (id) => {
    bureauAudio.typewriterClick();
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="landing-wrapper" ref={containerRef}>
      {/* Scroll Progress Indicator */}
      <div className="scroll-progress" id="scrollProgress"></div>

      {/* Navigation Bar */}
      <nav>
        <a className="brand" href="#top" onClick={(e) => { e.preventDefault(); scrollToSection('top'); }}>
          <img src="/logo.png" alt="ARGUS & Co." />
          <span>
            <b>ARGUS & Co.</b>
            <small>DETECTIVE AGENCY</small>
          </span>
        </a>
        <div className="links">
          <a href="#agents" onClick={(e) => { e.preventDefault(); scrollToSection('agents'); }}>DETECTIVES</a>
          <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }}>CAPABILITIES</a>
          <a href="#bureau" onClick={(e) => { e.preventDefault(); scrollToSection('bureau'); }}>THE BUREAU</a>
          <button className="btn cursor-pointer" onClick={handleAction}>
            ENTER THE AGENCY ↗
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <main id="top">
        <section className="hero">
          <div className="copy">
            <div className="eyebrow">PRIVATE INVESTIGATION · EST. 1891</div>
            <h1>
              Every clue has a story.
              <em>We find it.</em>
            </h1>
            <p>
              Step into ARGUS & Co.—a frontier-inspired investigative bureau where five specialist intelligence agents
              work together to organise evidence, examine leads, and bring clarity to complex cases.
            </p>
            <div className="actions">
              <button className="btn cursor-pointer" onClick={handleAction}>
                OPEN THE CASE ROOM ↗
              </button>
              <a className="textlink cursor-pointer" href="#agents" onClick={(e) => { e.preventDefault(); scrollToSection('agents'); }}>
                MEET THE DETECTIVES ↓
              </a>
            </div>
            <div className="motto">OBSERVE CLOSELY. QUESTION EVERYTHING. FOLLOW THE EVIDENCE.</div>
          </div>

          <div className="art">
            <div className="orbit"></div>
            <div className="seal">
              <div className="seal-in">
                <img src="/logo.png" alt="ARGUS emblem" />
                <strong>ARGUS & Co.</strong>
                <small>DETECTIVE AGENCY</small>
              </div>
            </div>
            <div className="floatcard f1">
              <b>CASE 001 · OPEN</b>
              <small>Evidence intake ready</small>
            </div>
            <div className="floatcard f2">
              <b>5 SPECIALISTS</b>
              <small>One coordinated bureau</small>
            </div>
            <div className="floatcard f3">
              <b>FRONTIER DISTRICT</b>
              <small>Est. 1891 · On the record</small>
            </div>
          </div>
        </section>

        {/* Section: Meet the Detectives */}
        <section className="content reveal" id="agents">
          <div className="heading">
            <div>
              <div className="eyebrow">THE INVESTIGATIVE UNIT</div>
              <h2>Meet the detectives.</h2>
            </div>
            <p>Five officers, five disciplines—from evidence intake to independent review. A coordinated team built around methodical investigation.</p>
          </div>
          <div className="agents">
            <article className="agent">
              <div className="portrait">🤠</div>
              <div className="agentinfo">
                <small>CHIEF INVESTIGATOR</small>
                <h3>Detective Argus</h3>
                <p>Leads the case, sets priorities, and consolidates reviewed findings.</p>
              </div>
            </article>

            <article className="agent">
              <div className="portrait">🕵🏻‍♀️</div>
              <div className="agentinfo">
                <small>DEPUTY INVESTIGATOR</small>
                <h3>Detective Apex</h3>
                <p>Challenges assumptions and performs independent verification.</p>
              </div>
            </article>

            <article className="agent">
              <div className="portrait">🔎</div>
              <div className="agentinfo">
                <small>FORENSIC INTELLIGENCE</small>
                <h3>Officer Lutkin</h3>
                <p>Examines case documents and records evidence observations.</p>
              </div>
            </article>

            <article className="agent">
              <div className="portrait">⭐</div>
              <div className="agentinfo">
                <small>INTELLIGENCE OPERATIONS</small>
                <h3>Officer Vanguard</h3>
                <p>Supports authorised research and traceable source collection.</p>
              </div>
            </article>

            <article className="agent">
              <div className="portrait">🧠</div>
              <div className="agentinfo">
                <small>ANALYTICAL INTELLIGENCE</small>
                <h3>Officer Cortex</h3>
                <p>Compares records, spots patterns, and flags anomalies.</p>
              </div>
            </article>
          </div>
        </section>

        {/* Section: Capabilities / Inside the Investigation */}
        <section className="content features" id="capabilities">
          <div className="scroll-story">
            <div className="reveal">
              <div className="story-kicker">THE ARGUS BUREAU · A COMPLETE CASE JOURNEY</div>
              <h2 className="story-title">Inside the investigation.</h2>
              <p className="story-lead">
                Every investigation at ARGUS & Co. follows a traceable path. From the first document entering the bureau to the final case archive, each station has a purpose, each agent has a defined responsibility, and every conclusion is expected to remain connected to its evidence. Scroll through the bureau workflow below.
              </p>
            </div>

            <article className="story-row">
              <div className="story-number">01</div>
              <div>
                <h3>3D Headquarters — the command floor</h3>
                <p>
                  Headquarters is the operational heart of the agency: an immersive, interactive 3D detective office that communicates the state of the investigation through the environment itself. The central evidence wall acts as the room’s focal point, while desks, terminals, lamps, folders, and agent stations become navigable interface elements.
                </p>
                <p>
                  Rather than presenting a conventional dashboard over the scene, the room places case information inside the world. Selecting the investigation board opens the current case overview; selecting an agent’s station reveals assignments and activity; and the command console gives access to priorities, pending reviews, and report progress. Users can orbit, zoom, pan, inspect hotspots, and return to the default room camera.
                </p>
                <ul>
                  <li>Active case and investigation status</li>
                  <li>Evidence intake and processing progress</li>
                  <li>Agent availability and task assignments</li>
                  <li>Recent case activity and review queue</li>
                  <li>Interactive board, desks, and command terminal</li>
                  <li>Ambient lighting, hover states, and subtle 3D motion</li>
                </ul>
                <span className="story-tag">COMMAND · COORDINATION · SITUATIONAL AWARENESS</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">02</div>
              <div>
                <h3>Case Files — intake and evidence registration</h3>
                <p>
                  Every investigation begins with a dossier. The Case Files station lets the user create a case record with a reference number, title, scope, description, date, and status. Documents and media are then added to that specific case—not to a generic upload drawer—so the evidence remains organised and traceable throughout the workflow.
                </p>
                <p>
                  Each upload becomes an evidence item with its own identifier, filename, source details, received date, notes, and processing status. The interface can preview supported material, flag duplicate files, and indicate when an item needs manual review. Original files should remain preserved while extracted text or derived observations are stored separately.
                </p>
                <ul>
                  <li>Case creation, metadata, and case ownership</li>
                  <li>DOC/DOCX, XLS/XLSX, CSV, JPG/JPEG, HEIC, PNG, and PDF intake</li>
                  <li>Evidence ID, source, date, notes, and file status</li>
                  <li>Document preview and evidence inventory</li>
                  <li>Duplicate, unreadable, or incomplete-file warnings</li>
                  <li>Evidence linked to clues, agent tasks, and report citations</li>
                </ul>
                <span className="story-tag">DOSSIER · EVIDENCE INTAKE · PROVENANCE</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">03</div>
              <div>
                <h3>Investigation Lab — how the team works</h3>
                <p>
                  The Lab converts a dossier into structured investigative tasks. Each agent receives a bounded assignment and returns a work product containing observations, source references, uncertainties, and questions for further review. Detective Argus coordinates the sequence and consolidates reviewed findings; he does not replace source verification or human judgement.
                </p>
                <p>
                  <strong>Officer Lutkin</strong> performs forensic document intelligence: extracting relevant passages, identifying dates and names, describing image or document content, and recording evidence observations with file/page references. <strong>Officer Vanguard</strong> supports intelligence operations by collecting authorised contextual information, documenting sources, and separating sourced material from leads that still require confirmation. <strong>Officer Cortex</strong> compares records, builds timelines, detects inconsistencies and recurring entities, and flags anomalies for examination. <strong>Detective Apex</strong> acts as the independent reviewer—testing assumptions, looking for contradictions, asking what evidence could disprove a theory, and presenting alternative explanations. <strong>Detective Argus</strong> assigns work, tracks progress, resolves task dependencies, and prepares a synthesis only after cross-checking.
                </p>
                <ul>
                  <li>Stage 1: intake and scope definition</li>
                  <li>Stage 2: evidence examination and extraction</li>
                  <li>Stage 3: specialist analysis and task outputs</li>
                  <li>Stage 4: cross-agent comparison and contradiction checks</li>
                  <li>Stage 5: human review and approval</li>
                  <li>Stage 6: report drafting and case closure</li>
                </ul>
                <span className="story-tag">ASSIGN · EXAMINE · ANALYSE · VERIFY · REVIEW</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">04</div>
              <div>
                <h3>Clues & Suspects Web — the connected evidence map</h3>
                <p>
                  The Clues & Suspects Web turns disconnected records into a visual relationship map. A graph canvas displays nodes for people, witnesses, clues, testimonies, places, events, and evidence files. Lines between nodes describe a recorded relationship—such as “mentioned in,” “observed at,” “supports,” “conflicts with,” or “requires verification”—and each connection remains linked to its source.
                </p>
                <p>
                  Users can select a node to inspect its notes, origin, timestamp, associated evidence, and agent observations. Filters help isolate a date range, evidence type, agent, or verification state. Contradictions and missing links can be highlighted for follow-up, while the interface must clearly distinguish a lead or association from proof of wrongdoing.
                </p>
                <ul>
                  <li>Interactive, zoomable graph with draggable nodes</li>
                  <li>Clues, people, testimonies, locations, events, and files</li>
                  <li>Evidence-backed edges with source references</li>
                  <li>Filters by case, date, agent, and review status</li>
                  <li>Contradiction, missing-link, and follow-up markers</li>
                  <li>Click-through from graph item to original evidence</li>
                </ul>
                <span className="story-tag">RELATIONSHIPS · TRACEABILITY · LEADS</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">05</div>
              <div>
                <h3>Team Presentation — hear the investigation</h3>
                <p>
                  The Team Presentation feature transforms reviewed case work into a structured audio briefing. Instead of a single generic narration, the presentation can be divided into agent chapters so the user hears how each specialist approached the case and what remains unresolved. The script should be generated from approved findings and source-linked material.
                </p>
                <p>
                  The briefing opens with Argus establishing the scope and known facts. Lutkin explains the evidence intake and document observations; Vanguard presents sourced context; Cortex walks through timelines, patterns, and anomalies; Apex discusses counterpoints and uncertainty; and Argus closes with the synthesis, limitations, and recommended next steps. A transcript accompanies the audio so users can read, search, and verify each statement.
                </p>
                <ul>
                  <li>Play, pause, seek, volume, and chapter navigation</li>
                  <li>Agent-specific voices or speaker labels</li>
                  <li>Transcript synchronised with playback</li>
                  <li>Evidence references displayed beside relevant statements</li>
                  <li>Separate “confirmed observations” and “open questions” chapters</li>
                  <li>Briefing regeneration after report review</li>
                </ul>
                <span className="story-tag">AUDIO BRIEFING · AGENT VOICES · TRANSCRIPT</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">06</div>
              <div>
                <h3>Report Desk — the final documented output</h3>
                <p>
                  The Report Desk consolidates the case into a professional, readable document. Its purpose is not simply to produce a persuasive narrative; it is to show what was examined, what the evidence supports, where sources disagree, and what remains uncertain. Every important factual statement should be traceable to an evidence item or clearly marked as analysis.
                </p>
                <p>
                  The final report can include an executive summary, case scope, chronology, evidence register, agent findings, cross-verification notes, clue-map summary, unresolved questions, limitations, and appendices. Users can inspect the report before exporting it, correct formatting, and retain version history when revisions are made.
                </p>
                <ul>
                  <li>Structured headings and consistent page alignment</li>
                  <li>Timeline and evidence tables</li>
                  <li>Source citations and evidence IDs</li>
                  <li>Agent contributions and reviewer notes</li>
                  <li>Uncertainty, alternative explanations, and limitations</li>
                  <li>PDF/DOCX export and report version history</li>
                </ul>
                <span className="story-tag">SYNTHESIS · DOCUMENTATION · EXPORT</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">07</div>
              <div>
                <h3>Archives — the agency’s case memory</h3>
                <p>
                  Once a case is completed, paused, or formally closed, its record moves into Archives. The archive is a searchable library of case summaries and preserved investigation artefacts—not merely a list of filenames. Opening an archived case should show its synopsis, chronology, evidence inventory, final report, status history, and the version of the findings that was approved at closure.
                </p>
                <p>
                  Users can search by case reference, title, date, status, or entity; review report versions; and, where permissions allow, reopen a case or duplicate it into a new working dossier. Archived material should retain its original provenance and access controls.
                </p>
                <ul>
                  <li>Searchable case index and summary cards</li>
                  <li>Closed, paused, and historical case filters</li>
                  <li>Final report, evidence inventory, and timeline</li>
                  <li>Activity log and report version history</li>
                  <li>Reopen or create a follow-up case</li>
                  <li>Retention and access controls for sensitive records</li>
                </ul>
                <span className="story-tag">CASE HISTORY · SEARCH · PRESERVATION</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">08</div>
              <div>
                <h3>Agent Investigation — speak to each specialist</h3>
                <p>
                  Agent Investigation gives the user a direct, case-scoped consultation with any member of the unit. Select Argus, Apex, Lutkin, Vanguard, or Cortex individually and ask a question about a finding, an evidence item, a timeline, or an interpretation. The selected agent responds according to its role and the material available to it.
                </p>
                <p>
                  Users can ask for an explanation in simpler terms, request the source behind a statement, challenge a conclusion, ask for counterarguments, or identify what information is missing. A conversation can be cleared to start a fresh question thread without deleting the case, uploaded evidence, or saved notes. Useful responses can be saved into the case only with user confirmation.
                </p>
                <ul>
                  <li>Individual agent selector and role-aware responses</li>
                  <li>Text chat and optional voice conversation</li>
                  <li>Ask about a selected evidence item or report passage</li>
                  <li>Request citations, confidence rationale, or counterarguments</li>
                  <li>Clear chat context while preserving case records</li>
                  <li>Save approved answers as case notes</li>
                </ul>
                <span className="story-tag">ASK · CHALLENGE · CLARIFY · FOLLOW UP</span>
              </div>
            </article>

            <article className="story-row">
              <div className="story-number">09</div>
              <div>
                <h3>Evidence Review — keep conclusions accountable</h3>
                <p>
                  Evidence Review is the quality gate shared across the bureau. It separates raw source material from extracted observations, analytical interpretations, and final conclusions. Agents should expose uncertainty, identify conflicting information, and state when a claim cannot be supported by the available record.
                </p>
                <p>
                  Before a finding is promoted into the final report, a human reviewer can inspect its supporting sources, compare competing explanations, and approve, revise, or reject it. The audit trail records who or what generated an observation, which evidence was referenced, and when a report section changed.
                </p>
                <ul>
                  <li>Source-backed statements and clickable citations</li>
                  <li>Observation / hypothesis / conclusion distinctions</li>
                  <li>Confidence labels with a stated rationale</li>
                  <li>Contradictory evidence and alternative hypotheses</li>
                  <li>Human approval before finalisation</li>
                  <li>Traceable task, edit, and report history</li>
                </ul>
                <span className="story-tag">ACCOUNTABILITY · REVIEW · HUMAN OVERSIGHT</span>
              </div>
            </article>
          </div>
        </section>

        {/* Callout Section */}
        <section className="callout reveal" id="bureau">
          <div>
            <div className="eyebrow">YOUR CASE. OUR BUREAU.</div>
            <h2>The investigation starts here.</h2>
            <p>Enter headquarters, open a dossier, and put the ARGUS & Co. investigative unit to work.</p>
          </div>
          <button className="btn cursor-pointer" onClick={handleAction}>
            ENTER HEADQUARTERS ↗
          </button>
        </section>
      </main>

      {/* Footer */}
      <footer>
        <span>© ARGUS & Co. · FRONTIER DISTRICT · EST. 1891</span>
        <span>OBSERVE CLOSELY · QUESTION EVERYTHING · FOLLOW THE EVIDENCE</span>
      </footer>
    </div>
  );
}
