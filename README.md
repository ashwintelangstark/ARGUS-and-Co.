# ARGUS and Co. — Western Investigation Bureau

An AI-Agent-Powered Investigation Agency web application featuring ultra-realistic 3D character avatars, physical/digital evidence examination, autonomous multi-agent deliberations, and certified forensic dossiers.

Built with **React + Vite**, **Node.js + Express**, **SQLite (WAL Mode)**, **Three.js**, and **OpenRouter Free Tier Models**.

---

## ✦ System Architecture & Tech Stack

| Layer | Technology | Description |
|---|---|---|
| **Frontend** | React 18, Vite 5, Tailwind CSS | Modular, responsive noir Western cyberpunk interface with typewriter sound effects and tactile paper/wood textures. |
| **3D Engine** | Three.js (r160) | Ultra-realistic 3D Bureau Headquarters, animated avatars, subsurface scattering skin shaders, eye tracking, blinking, voice pulsing, and biometric inspection modes. |
| **Backend** | Node.js (v24), Express | REST API, Server-Sent Events (SSE) streaming for real-time AI deliberations, and file upload processing with SHA-256 hash generation. |
| **Database** | SQLite (`node:sqlite` / WAL Mode) | Embedded relational database with tables for cases, evidence custody, clues & red yarn graphs, officer deliberations, and certified reports. |
| **AI Multi-Agent** | OpenRouter Free Models | 100% free models (`openrouter/free`, `google/gemma-4-31b-it:free`, `liquid/lfm-2.5-2.6b:free`, `nvidia/nemotron-3.5-lightning:free`, etc.) with automatic fallback. |

---

## ♜ The Bureau Officers & Character References

All 5 investigators are built with 3D western bureau styling, distinct silhouettes, roles, and gender-tailored attire:

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                    ARGUS & CO. ROSTER                                  │
├───────────────────┬───────────────────┬───────────────────┬───────────────────┬────────┤
│ OFFICER LUTKIN    │ DETECTIVE APEX    │ DETECTIVE ARGUS   │ OFFICER VANGUARD  │ CORTEX │
│ Forensics         │ Deputy Review     │ Chief Command     │ Field & OSINT     │ Pattern│
└───────────────────┴───────────────────┴───────────────────┴───────────────────┴────────┘
```

1. **DETECTIVE ARGUS** — *Chief Investigation Officer*
   - **Gender & Demeanor:** Male. Rugged, handsome, wavy disheveled hair, trimmed beard, tailored charcoal vest over white rolled-sleeve shirt, leather shoulder holster, tactical watch.
   - **Investigative Doctrine:** Central leader synthesizing motives and physical evidence; delivers binding verdicts and executive operational directives.
   - **Assigned Free Model:** `openrouter/free` (or `liquid/lfm-2.5-2.6b:free`)
   - **Accent Color:** Amber / Gold (`#f59e0b`)

2. **DETECTIVE APEX** — *Deputy Investigation Officer*
   - **Gender & Demeanor:** Female. Raven wavy hair tied back loosely with face-framing tendrils, motorcycle leather jacket over maroon henley, brass bureau eagle badge on lapel, arms crossed.
   - **Investigative Doctrine:** Relentless Devil's Advocate and red-teamer. Attacks confirmation bias, stress-tests working theories, and exposes defense loopholes.
   - **Assigned Free Model:** `openrouter/free` (or `google/gemma-4-31b-it:free`)
   - **Accent Color:** Royal Amethyst / Purple (`#a855f7`)

3. **OFFICER LUTKIN** — *Forensic Intelligence Officer*
   - **Gender & Demeanor:** Female. Dark hair in chic high bun, round wire-rimmed glasses, monitor headphones around neck, tactical pocket vest over crisp rolled-up shirt.
   - **Investigative Doctrine:** Digital and physical forensics. Validates cryptographic file hashes, inspects audio waveforms, hex bytes, ink drying marks, and chronometer logs.
   - **Assigned Free Model:** `openrouter/free` (or `google/gemma-4-26b-a4b-it:free`)
   - **Accent Color:** Cyan / Neon Blue (`#00d2ff`)

4. **OFFICER VANGUARD** — *Intelligence Operations Officer*
   - **Gender & Demeanor:** Male. Athletic build, swept-back wavy dark hair, stubble, tactical button-down shirt, heavy leather shoulder harness straps.
   - **Investigative Doctrine:** Field intelligence and OSINT. Tracks transit punch-cards, surveillance wires, corporate registrations, suspect movements, and choke points.
   - **Assigned Free Model:** `openrouter/free` (or `nvidia/nemotron-3.5-lightning:free`)
   - **Accent Color:** Tactical Orange (`#f97316`)

5. **OFFICER CORTEX** — *Analytical Intelligence Officer*
   - **Gender & Demeanor:** Male. Voluminous curly/wavy dark fringe, modern thin-rimmed rectangular glasses, black tactical shirt, sharp calculating eyes.
   - **Investigative Doctrine:** Mathematical link graphs, harmonic frequencies, probability vectors, and spatial-temporal cluster anomalies.
   - **Assigned Free Model:** `openrouter/free` (or `cohere/north-mini-code:free`)
   - **Accent Color:** Cyber Mint / Emerald (`#10b981`)

---

## ⚒ Bureau Application Views & Features

### 1. ⌂ 3D Headquarters Scene
- **Interactive 3D Western Bureau**: Rendered in Three.js with realistic aged oak floorboards, darkwood wainscoting, CRT monitors, brass fixtures, and suspended dust particles.
- **Dynamic Time-of-Day Lighting Engine**: Automatically calculates the ambient and directional lighting based on real-world local time or manual selection:
  - *Dawn (5am-8am)*: Pale rose-blue sky mist, soft morning window light, and warm kerosene lanterns.
  - *Day (8am-5pm)*: Sharp golden frontier sunlight through high clerestory windows with PCF soft shadows.
  - *Sunset (5pm-8pm)*: Fiery copper golden-hour atmosphere with dramatic long wall shadows.
  - *Night (8pm-5am)*: Moody film noir palette with flickering desk candles and warm lantern glow pools.
- **Interactive Central Corkboard**:
  - Mounted Western Bureau medallion logo plaque (`favicon.png`) with brass bezel.
  - Pinned Central Case Docket, forensic evidence cards (with live SHA-256 hashes), suspect profiles, and connected red yarn investigation strings.
  - Interactive 3D raycasting: Clicking on any evidence card or suspect card smoothly zooms the camera in close and opens an Evidence Inspector dossier with full chain-of-custody verification.
- **Gender-Tailored Detective Roster**: All 5 specialists feature custom procedural 3D PBR geometry reflecting their roles and silhouettes (custom dusters, Stetson hats, spectacles, deputy and sheriff badges, breathing and mouse gaze-tracking).
- **Floating HUD & Ledger**: Positioned exactly as in the Western Bureau layout, featuring floating detective tags, bureau status indicators, and an interactive ledger.

### 2. ▤ Case Files & Evidence Register
- Dossier intake: Case Reference, Title, Priority, Category, and Intake Notes.
- Drag & Drop Evidence Depository supporting `DOC`, `DOCX`, `XLS`, `CSV`, `JPG`, `PNG`, `PDF`, `TXT`, `DAT`, `LOG`.
- Automatic SHA-256 cryptographic hash generation on upload for tamper-proof chain of custody.
- Registered Case Dossiers ledger with priority indicators, file counts, and action buttons.

### 3. ⚒ Investigation Lab (Autonomous Multi-Agent Conclave)
- Select any registered case dossier to inspect evidence pieces, hashes, and forensic notes.
- **Run Autonomous Bureau Conclave**: Launches a 5-stage sequential investigation where each officer speaks, analyzes, and challenges the case in real-time with live typewriter audio feedback.
- Interactive officer cards linking directly to 1-on-1 interrogation mode.

### 4. ☍ Clues & Suspect Web (Investigation Board)
- Visual corkboard displaying suspect cards, evidence artifacts, crime scenes, and hypotheses.
- Dynamic red yarn stringing tool allowing users to connect related clues together with pins.
- Add, update, or remove clues directly on the board.

### 5. ▧ Classified Reports Desk
- Formal bureaucratic findings reports compiled by the Bureau AI Conclave.
- Sections: Executive Summary, Forensic Assessment (Lutkin), OSINT Surveillance (Vanguard), Anomaly Detection (Cortex), Red-Team Scrutiny (Apex), and Chief Verdict & Directives (Argus).
- Export capabilities: Copy to clipboard, Print / PDF preview, or Download as certified `.txt` dossier.

### 6. ▣ Agency Archives & Audit Ledger
- Searchable historical repository of past cases and evidence items.
- Immutable Bureau Audit Trail logging every evidence registration, case creation, and conclave run with exact timestamps.

### 7. 3D Biometric Character Studio & 1-on-1 Interrogation
- Click on any officer in the 3D scene, roster, or workbench to open a dedicated 360° inspector.
- Four distinct real-time shader modes:
  - **Ultra-Realistic**: Studio 3-point film noir lighting with subsurface skin scattering.
  - **Holographic Scan**: Animated horizontal scanlines and traveling biometric pulse.
  - **3D Wireframe**: Displays raw polygonal facial geometry and illuminated neon vertices.
  - **Thermal Spec**: False-color infrared heatmap simulating facial blood flow.
- Direct 1-on-1 Interrogation chat where the user can question the officer; the 3D avatar moves its jaw and pulses its voice ring in real-time as it answers!

---

## 🚀 Running the Application

### Prerequisites
- Node.js v18+ (tested on Node v24)
- OpenRouter API key configured in `.env` (already set up)

### Quick Start (Server + UI on port 5001)
```bash
# 1. Start the application
npm start

# 2. Open in your browser:
# http://localhost:5001
```

### Development Mode (Concurrent Vite + Express API)
```bash
# Runs Express on :5001 and Vite Dev Server on :5173 with hot reload
npm run dev
```

---

## 🔒 Configuration & Environment (`.env`)

```ini
PORT=5001
FRONTEND_PORT=5173
OPENROUTER_API_KEY=your_openrouter_api_key_here
OPENROUTER_DEFAULT_MODEL=openrouter/free
```

