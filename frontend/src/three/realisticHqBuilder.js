import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { createRealisticCharacter } from './realisticCharacterBuilder.js';
import { createDocketTexture, createEvidenceTexture, createSuspectTexture } from './boardTextureHelper.js';

export function buildRealisticHqScene(canvas, options = {}) {
  const {
    onAgentClick,
    onEvidenceClick,
    initialCase = null,
    evidenceList = [],
    cluesList = []
  } = options;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x24170f);
  scene.fog = new THREE.Fog(0x24170f, 18, 48);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Camera setup - positioned comfortably inside the room looking into bureau
  const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
  const baseCamPos = new THREE.Vector3(0, 5.8, 7.8);
  const baseLookAt = new THREE.Vector3(0, 2.0, -0.4);
  camera.position.copy(baseCamPos);
  camera.lookAt(baseLookAt);

  // OrbitControls - Bounded strictly inside the 3D room for 360-degree rotation
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.target.copy(baseLookAt);
  controls.minDistance = 2.4;
  controls.maxDistance = 11.5; // Keeps user strictly within the office walls
  controls.minPolarAngle = 0.25; // Prevents clipping through ceiling
  controls.maxPolarAngle = Math.PI / 2 - 0.06; // Prevents sinking under floor
  controls.enablePan = true;

  // ==========================================
  // DYNAMIC TIME-OF-DAY LIGHTING SYSTEM
  // ==========================================
  const hemiLight = new THREE.HemisphereLight(0xffd8a2, 0x29180e, 1.8);
  scene.add(hemiLight);

  // Sun / Clerestory Window Key Light
  const sunLight = new THREE.DirectionalLight(0xffc77d, 3.2);
  sunLight.position.set(-6, 12, 7);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.bias = -0.0004;
  scene.add(sunLight);

  // Warm Desk Lanterns & Kerosene Lamps
  const lanternLeft = new THREE.PointLight(0xffa64b, 24, 18);
  lanternLeft.position.set(-7, 5, -2);
  scene.add(lanternLeft);

  const lanternRight = new THREE.PointLight(0xffbe6b, 20, 18);
  lanternRight.position.set(7, 5, -2);
  scene.add(lanternRight);

  const candle = new THREE.PointLight(0xffd08a, 14, 12);
  candle.position.set(0, 3.5, 2.5);
  scene.add(candle);

  // Bureau Lighting State (Lights Switch)
  let areLightsOn = true;

  function applyLightSwitch(on) {
    areLightsOn = on;
    if (on) {
      hemiLight.intensity = 1.8;
      sunLight.intensity = 3.2;
      lanternLeft.intensity = 24;
      lanternRight.intensity = 20;
      candle.intensity = 14;
      renderer.toneMappingExposure = 1.15;
      scene.background = new THREE.Color(0x24170f);
      scene.fog.color.setHex(0x24170f);
    } else {
      // Atmospheric noir darkness in headquarters
      hemiLight.intensity = 0.25;
      sunLight.intensity = 0.2;
      lanternLeft.intensity = 4.0;
      lanternRight.intensity = 4.0;
      candle.intensity = 7.0;
      renderer.toneMappingExposure = 0.70;
      scene.background = new THREE.Color(0x0c0704);
      scene.fog.color.setHex(0x0c0704);
    }
  }

  // Time-of-Day Configurations
  const lightingProfiles = {
    dawn: {
      bgColor: 0x1a161b,
      fogColor: 0x1a161b,
      hemiSky: 0xb5c6db,
      hemiGround: 0x241812,
      hemiIntensity: 1.4,
      sunColor: 0xffd2a6,
      sunIntensity: 2.2,
      sunPos: [-9, 7, 6],
      lanternIntensity: 16,
      exposure: 1.05
    },
    day: {
      bgColor: 0x36281e,
      fogColor: 0x36281e,
      hemiSky: 0xfff4e6,
      hemiGround: 0x3d2a1c,
      hemiIntensity: 2.4,
      sunColor: 0xfffaed,
      sunIntensity: 4.2,
      sunPos: [-4, 14, 6],
      lanternIntensity: 8,
      exposure: 1.25
    },
    sunset: {
      bgColor: 0x2b170e,
      fogColor: 0x2b170e,
      hemiSky: 0xff8833,
      hemiGround: 0x261208,
      hemiIntensity: 1.8,
      sunColor: 0xff6611,
      sunIntensity: 3.8,
      sunPos: [-12, 5, 4],
      lanternIntensity: 22,
      exposure: 1.15
    },
    night: {
      bgColor: 0x120c08,
      fogColor: 0x120c08,
      hemiSky: 0x443022,
      hemiGround: 0x140c06,
      hemiIntensity: 1.0,
      sunColor: 0x6688aa,
      sunIntensity: 1.2,
      sunPos: [-6, 10, 5],
      lanternIntensity: 32,
      exposure: 1.1
    }
  };

  function getAutoTimeProfile() {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 8) return 'dawn';
    if (hr >= 8 && hr < 17) return 'day';
    if (hr >= 17 && hr < 20) return 'sunset';
    return 'night';
  }

  let activeTimeMode = 'auto';
  let targetProfile = lightingProfiles[getAutoTimeProfile()];

  function applyLightingProfile(prof) {
    scene.background.setHex(prof.bgColor);
    scene.fog.color.setHex(prof.fogColor);
    hemiLight.color.setHex(prof.hemiSky);
    hemiLight.groundColor.setHex(prof.hemiGround);
    hemiLight.intensity = prof.hemiIntensity;

    sunLight.color.setHex(prof.sunColor);
    sunLight.intensity = prof.sunIntensity;
    sunLight.position.set(...prof.sunPos);

    lanternLeft.intensity = prof.lanternIntensity;
    lanternRight.intensity = prof.lanternIntensity * 0.85;
    renderer.toneMappingExposure = prof.exposure;
  }
  applyLightingProfile(targetProfile);

  // Material helpers
  const mat = (c, r = 0.75, m = 0) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const wood = mat(0x654025);
  const darkwood = mat(0x29180f);
  const wall = mat(0x4b3020);
  const floor = mat(0x3a281b);
  const brass = mat(0xb58a4d, 0.35, 0.65);
  const paper = mat(0xd8c49a);
  const black = mat(0x17120e);
  const screen = new THREE.MeshStandardMaterial({
    color: 0x32414a,
    emissive: 0x273a3c,
    emissiveIntensity: 0.55
  });

  function box(p, w, h, d, m, x, y, z) {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    o.castShadow = true;
    o.receiveShadow = true;
    p.add(o);
    return o;
  }

  function cyl(p, r1, r2, h, m, x, y, z) {
    const o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, 18), m);
    o.position.set(x, y, z);
    o.castShadow = true;
    p.add(o);
    return o;
  }

  // Room Architecture - 360-degree Enclosed Western Bureau Office
  box(scene, 24, 0.4, 22, floor, 0, -0.25, 0);       // Floor
  box(scene, 24, 8, 0.4, wall, 0, 3.8, -9);          // North Wall (Case Investigation Board)
  box(scene, 0.4, 8, 22, wall, -12, 3.8, 0);         // West Wall (Clerestory & Evidence Lockers)
  box(scene, 0.4, 8, 22, wall, 12, 3.8, 0);          // East Wall (Telegraph Desk & Archives)
  box(scene, 24, 8, 0.4, wall, 0, 3.8, 9.8);         // South Entrance Wall (Enclosing 360 space)
  box(scene, 24, 0.3, 22, darkwood, 0, 7.8, 0);      // Darkwood Coffered Ceiling

  // South Entrance Wall: Frontier District Double Doors with Brass Hardware
  box(scene, 4.4, 6.2, 0.15, darkwood, 0, 3.1, 9.6);
  box(scene, 1.8, 2.4, 0.06, brass, -1.0, 4.2, 9.58);
  box(scene, 1.8, 2.4, 0.06, brass, 1.0, 4.2, 9.58);
  cyl(scene, 0.04, 0.04, 0.28, brass, -0.15, 3.2, 9.5);
  cyl(scene, 0.04, 0.04, 0.28, brass, 0.15, 3.2, 9.5);

  // Ceiling Heavy Timber Beams (Historic Western Architecture)
  for (let z = -7; z <= 8; z += 3.5) {
    box(scene, 24, 0.35, 0.45, darkwood, 0, 7.6, z);
  }
  for (let x = -8; x <= 8; x += 8) {
    box(scene, 0.45, 0.35, 21, darkwood, x, 7.6, 0);
  }

  // Floor Planks Grids
  for (let x = -10; x <= 10; x += 2) {
    box(scene, 0.025, 0.015, 21, mat(0x8a6845), x, 0.01, 0);
  }
  for (let z = -8; z < 9; z += 2) {
    box(scene, 23, 0.015, 0.025, mat(0x8a6845), 0, 0.01, z);
  }

  // ==========================================
  // CASE INVESTIGATION BOARD (INTERACTIVE)
  // ==========================================
  box(scene, 10.6, 4.4, 0.3, darkwood, 0, 4.3, -8.65);
  box(scene, 10.2, 4.1, 0.07, mat(0x795638), 0, 4.3, -8.43);

  // Western Bureau Medallion Logo (fevicon.png) mounted above central board
  const texLoader = new THREE.TextureLoader();
  const logoTex = texLoader.load('/assets/logo.png');
  logoTex.colorSpace = THREE.SRGBColorSpace;
  const logoPlate = new THREE.Mesh(
    new THREE.CircleGeometry(1.25, 32),
    new THREE.MeshStandardMaterial({
      map: logoTex,
      roughness: 0.32,
      metalness: 0.68,
      transparent: true
    })
  );
  logoPlate.position.set(0, 6.9, -8.44);
  scene.add(logoPlate);

  const logoBezel = new THREE.Mesh(new THREE.TorusGeometry(1.26, 0.04, 8, 32), brass);
  logoBezel.position.set(0, 6.9, -8.43);
  scene.add(logoBezel);

  // Central Case Docket Banner pinned at top of the board
  const currentCase = initialCase || {
    case_ref: 'ARG-1891-001',
    title: 'The Vanishing Ledger of Silvercreek Trust',
    priority: 'High',
    status: 'Active',
    notes: 'Subterranean repository vault breached at 02:40 AM without acoustic alarm. Supervisor key deployed with RF carrier suppression.'
  };

  const docketTex = createDocketTexture(
    currentCase.case_ref,
    currentCase.title,
    currentCase.priority,
    currentCase.status,
    currentCase.notes
  );

  const docketMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(4.2, 1.8),
    new THREE.MeshStandardMaterial({ map: docketTex, roughness: 0.85 })
  );
  docketMesh.position.set(0, 5.0, -8.36);
  docketMesh.castShadow = true;
  docketMesh.userData = { type: 'docket', caseData: currentCase };
  scene.add(docketMesh);

  // Brass pins for docket
  cyl(scene, 0.04, 0.04, 0.05, brass, -1.95, 5.8, -8.32);
  cyl(scene, 0.04, 0.04, 0.05, brass, 1.95, 5.8, -8.32);

  // Dynamic Evidence Cards on Board
  const interactiveCards = [docketMesh];
  const boardYarnPoints = [
    new THREE.Vector3(0, 4.4, -8.32) // Docket center
  ];

  // Default evidence items if none provided
  const evidenceItems = (evidenceList && evidenceList.length > 0) ? evidenceList : [
    { id: 1, original_name: 'vault_access_logs.csv', file_type: 'CSV', hash_sha256: '8a4f9b2d3c91e704b2a8d1e3c79a0b4e', created_at: '1891-10-24 02:41:19' },
    { id: 2, original_name: 'audio_wiretap_intercept.wav', file_type: 'AUDIO', hash_sha256: 'c3e4a1b8d79f0412e8b2a3c4d5e6f7a8', created_at: '1891-10-24 03:15:00' },
    { id: 3, original_name: 'pier9_manifest_photo.jpg', file_type: 'IMAGE', hash_sha256: 'e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0', created_at: '1891-10-24 05:20:45' }
  ];

  // Pin evidence cards on left and right flanks of the board
  evidenceItems.slice(0, 4).forEach((ev, idx) => {
    const isLeft = (idx % 2 === 0);
    const row = Math.floor(idx / 2);
    const ex = isLeft ? -3.4 + (row * 0.2) : 3.4 - (row * 0.2);
    const ey = 3.3 - (row * 1.35);
    const ez = -8.35;

    const evTex = createEvidenceTexture(
      idx + 1,
      ev.original_name,
      ev.file_type,
      ev.hash_sha256,
      ev.created_at
    );

    const evMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.15),
      new THREE.MeshStandardMaterial({ map: evTex, roughness: 0.88 })
    );
    evMesh.position.set(ex, ey, ez);
    evMesh.rotation.z = (idx % 2 === 0 ? 0.03 : -0.04);
    evMesh.castShadow = true;
    evMesh.userData = { type: 'evidence', data: ev };
    scene.add(evMesh);
    interactiveCards.push(evMesh);

    // Pushpin
    const pin = cyl(scene, 0.035, 0.035, 0.05, brass, ex, ey + 0.52, ez + 0.03);
    boardYarnPoints.push(new THREE.Vector3(ex, ey + 0.45, ez + 0.02));
  });

  // Suspects & Clues Pinned along center-lower row
  const cluesData = (cluesList && cluesList.length > 0) ? cluesList : [
    { id: 1, title: 'Suspect: Elias Vance', category: 'SUSPECT', description: 'Railway transit punch logged 2 miles from claimed off-duty location.', is_hypothesis: false },
    { id: 2, title: 'Pier 9 Cargo Manifest', category: 'LOCATION', description: 'Port registry entries show undeclared crated machinery loaded onto vessel.', is_hypothesis: false },
    { id: 3, title: 'Inside Accomplice Ring', category: 'HYPOTHESIS', description: 'Dual supervisor key deployed simultaneously with acoustic suppression.', is_hypothesis: true }
  ];

  cluesData.slice(0, 3).forEach((clue, idx) => {
    const cx = -1.6 + (idx * 1.6);
    const cy = 2.85 + (Math.sin(idx * 2) * 0.15);
    const cz = -8.35;

    const clueTex = createSuspectTexture(clue.title, clue.category, clue.description, clue.is_hypothesis);
    const clueMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(1.4, 1.1),
      new THREE.MeshStandardMaterial({ map: clueTex, roughness: 0.85 })
    );
    clueMesh.position.set(cx, cy, cz);
    clueMesh.rotation.z = (idx % 2 === 0 ? -0.025 : 0.03);
    clueMesh.castShadow = true;
    clueMesh.userData = { type: 'clue', data: clue };
    scene.add(clueMesh);
    interactiveCards.push(clueMesh);

    cyl(scene, 0.035, 0.035, 0.05, brass, cx, cy + 0.50, cz + 0.03);
    boardYarnPoints.push(new THREE.Vector3(cx, cy + 0.42, cz + 0.02));
  });

  // Interconnected Red Investigation Yarn Strings
  const yarnMat = new THREE.LineBasicMaterial({ color: 0x9e2417, linewidth: 2 });
  if (boardYarnPoints.length >= 2) {
    for (let i = 1; i < boardYarnPoints.length; i++) {
      const pts = [boardYarnPoints[0], boardYarnPoints[i]];
      scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), yarnMat));

      if (i > 1 && i % 2 === 0) {
        const crossPts = [boardYarnPoints[i - 1], boardYarnPoints[i]];
        scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(crossPts), yarnMat));
      }
    }
  }

  // Western Desks, CRT monitors, and Chairs
  // ==========================================
  // WORKING CRT TERMINAL SYSTEM BUILDER
  // ==========================================
  const activeTerminals = [];

  function createWorkingTerminal(x, y, z, rotY, officerId, title, hexColor, accentHex) {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 320;
    const ctx = canvas.getContext('2d');

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;

    const screenMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      emissive: new THREE.Color(accentHex),
      emissiveMap: texture,
      emissiveIntensity: 0.95,
      roughness: 0.22,
      metalness: 0.15
    });

    // Terminal Monitor Chassis Group
    const monitorGroup = new THREE.Group();
    monitorGroup.position.set(x, y, z);
    monitorGroup.rotation.y = rotY;

    // Heavy Brass & Black Cast CRT Chassis
    box(monitorGroup, 1.25, 0.9, 0.45, black, 0, 0.45, 0);
    // Working Glowing Screen Face
    const screenMesh = new THREE.Mesh(new THREE.BoxGeometry(1.12, 0.74, 0.04), screenMaterial);
    screenMesh.position.set(0, 0.45, 0.23);
    monitorGroup.add(screenMesh);
    // Brass Bezel & Knurled Dials
    box(monitorGroup, 1.26, 0.05, 0.46, brass, 0, 0.92, 0);
    cyl(monitorGroup, 0.035, 0.035, 0.06, brass, 0.52, 0.15, 0.25);
    cyl(monitorGroup, 0.035, 0.035, 0.06, brass, 0.44, 0.15, 0.25);
    // Swivel Neck & Heavy Base
    box(monitorGroup, 0.16, 0.4, 0.16, brass, 0, -0.15, 0);
    box(monitorGroup, 0.65, 0.08, 0.42, brass, 0, -0.36, 0);
    // Mechanical Keyboard on table in front of screen
    box(monitorGroup, 0.85, 0.06, 0.35, darkwood, 0, -0.36, 0.52);
    box(monitorGroup, 0.8, 0.03, 0.3, mat(0x1a1a1a), 0, -0.32, 0.52);
    // Telegraph Sender Key
    cyl(monitorGroup, 0.045, 0.045, 0.08, brass, 0.55, -0.34, 0.48);

    scene.add(monitorGroup);

    let frame = 0;
    const terminalObj = {
      officerId,
      update: (time) => {
        frame++;
        if (frame % 2 !== 0) return; // 30fps screen refresh for top efficiency

        // CRT Screen Background
        ctx.fillStyle = '#080d0d';
        ctx.fillRect(0, 0, 512, 320);

        // Phosphor cathode glow
        const grad = ctx.createRadialGradient(256, 160, 20, 256, 160, 260);
        grad.addColorStop(0, hexColor + '1f');
        grad.addColorStop(1, '#000000bb');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 512, 320);

        // CRT Raster scanlines
        ctx.fillStyle = 'rgba(0, 0, 0, 0.32)';
        for (let py = 0; py < 320; py += 4) {
          ctx.fillRect(0, py, 512, 2);
        }

        // Top Header Banner
        ctx.fillStyle = hexColor;
        ctx.fillRect(16, 16, 480, 28);
        ctx.fillStyle = '#080808';
        ctx.font = 'bold 15px "Courier New", monospace';
        ctx.fillText(`[ARGUS & CO.] · ${title}`, 26, 36);

        const blink = Math.sin(time * 5.0) > 0 ? '● LIVE' : '○ LIVE';
        ctx.fillText(blink, 416, 36);

        // Monospace Telemetry Body
        ctx.fillStyle = hexColor;
        ctx.font = '13px "Courier New", monospace';
        const lineY = (idx) => 72 + idx * 22;

        if (officerId === 'ARGUS') {
          ctx.fillText(`CHIEF EXECUTIVE DIRECTIVE: ACTIVE`, 24, lineY(0));
          ctx.fillText(`BUREAU CONCLAVE: 5 AGENTS SYNCHRONIZED`, 24, lineY(1));
          ctx.fillText(`DIRECTIVE: SYNTHESIZING VERDICT & CULPRIT`, 24, lineY(2));
          ctx.fillText(`COMMAND STATUS: EVIDENCE VAULT SEALED`, 24, lineY(3));
        } else if (officerId === 'LUTKIN') {
          ctx.fillText(`CRYPTOGRAPHIC REGISTER INTEGRITY: OK`, 24, lineY(0));
          ctx.fillText(`SHA-256: 7f83b165... VERIFIED IMMUTABLE`, 24, lineY(1));
          ctx.fillText(`SPECTROGRAM: 14.4 kHz CARRIER DETECTED`, 24, lineY(2));
          ctx.fillText(`CHEMICAL INK CHROMATOGRAPHY: FORGERY`, 24, lineY(3));
        } else if (officerId === 'CORTEX') {
          ctx.fillText(`PROBABILITY MATRIX: 94.2% CORRELATION`, 24, lineY(0));
          ctx.fillText(`TEMPORAL CLUSTERS: 02:40 AM SPIKE`, 24, lineY(1));
          ctx.fillText(`EIGENVECTOR ANOMALY: NON-RANDOM PATTERN`, 24, lineY(2));
          ctx.fillText(`RELATIONAL GRAPH: 12 EDGES LOCKED`, 24, lineY(3));
        } else if (officerId === 'VANGUARD') {
          ctx.fillText(`TRANSIT MANIFEST: CARGO #9923 UNMARKED`, 24, lineY(0));
          ctx.fillText(`WIRE INTERCEPT: PACKET DETECTED AT GATE`, 24, lineY(1));
          ctx.fillText(`OSINT RADAR: DISTRICT BOUNDARY MONITORED`, 24, lineY(2));
          ctx.fillText(`LOGISTICS TRACE: CIPHER CORRIDOR ACTIVE`, 24, lineY(3));
        } else if (officerId === 'APEX') {
          ctx.fillText(`ADVERSARIAL RED-TEAM AUDIT: IN PROGRESS`, 24, lineY(0));
          ctx.fillText(`STRESS-TEST: NIGHT PATROL ALIBI FAILED`, 24, lineY(1));
          ctx.fillText(`HYPOTHESIS DEFENSE: INSIDE JOB PROVEN`, 24, lineY(2));
          ctx.fillText(`CONFIRMATION BIAS DEFENSE: 100% OK`, 24, lineY(3));
        }

        // Live Oscilloscope Waveform
        ctx.strokeStyle = hexColor;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        const waveBaseY = 220;
        for (let px = 24; px < 488; px += 4) {
          const freq = (px * 0.05) + time * 3.5;
          const waveY = waveBaseY + Math.sin(freq) * 16 + Math.cos(freq * 1.8) * 8;
          if (px === 24) ctx.moveTo(px, waveY);
          else ctx.lineTo(px, waveY);
        }
        ctx.stroke();

        // Telemetry Data Bar
        ctx.fillStyle = hexColor + '33';
        ctx.fillRect(24, 252, 464, 18);
        const barW = ((Math.sin(time * 1.5) + 1) / 2) * 464;
        ctx.fillStyle = hexColor;
        ctx.fillRect(24, 252, barW, 18);

        // Blinking Prompt
        const cur = Math.sin(time * 6.0) > 0 ? '_' : ' ';
        ctx.fillText(`BUREAU-V7.1> TELEMETRY_STREAM_OK ${cur}`, 24, 298);

        texture.needsUpdate = true;
      }
    };

    activeTerminals.push(terminalObj);
    return monitorGroup;
  }

  // ==========================================
  // ADJUSTABLE DESK CHAIR BUILDER
  // ==========================================
  function createAdjustableChair(homeX, homeY, homeZ, homeRotY, deskZ) {
    const chairGroup = new THREE.Group();
    chairGroup.position.set(homeX, homeY, homeZ);
    chairGroup.rotation.y = homeRotY;

    // Swivel Seat & Brass Base
    cyl(chairGroup, 0.55, 0.55, 0.12, darkwood, 0, 0.65, 0);
    cyl(chairGroup, 0.08, 0.08, 0.75, brass, 0, 0.27, 0);
    // 5-Star Caster Brass Spindles
    for (let a = 0; a < 5; a++) {
      const angle = (a / 5) * Math.PI * 2;
      const leg = box(chairGroup, 0.42, 0.04, 0.06, brass, Math.cos(angle) * 0.22, 0.08, Math.sin(angle) * 0.22);
      leg.rotation.y = angle;
    }
    // High-Back Ergonomic Wooden/Brass Backrest
    box(chairGroup, 0.9, 0.95, 0.12, darkwood, 0, 1.25, -0.38);
    // Padded Armrests
    box(chairGroup, 0.12, 0.06, 0.55, darkwood, -0.42, 0.95, -0.05);
    box(chairGroup, 0.12, 0.06, 0.55, darkwood, 0.42, 0.95, -0.05);

    scene.add(chairGroup);

    return {
      group: chairGroup,
      homePos: new THREE.Vector3(homeX, homeY, homeZ),
      homeRotY,
      currentSlide: 0.2, // 0 = tucked under desk, 1 = pulled back to sit
      update: (isSeated, isApproaching, dt) => {
        // When approaching desk to station: chair pulls back smoothly (adjusting out)
        // When seated: chair tucks neatly under desk
        // When free roaming: chair sits relaxed
        let targetSlide = 0.2;
        let targetRot = homeRotY;

        if (isSeated) {
          targetSlide = 0.0; // tucked under desk
          targetRot = homeRotY;
        } else if (isApproaching) {
          targetSlide = 0.55; // pulled back to allow detective to step in
          targetRot = homeRotY + 0.18; // slight welcoming swivel
        }

        chairGroup.position.z = THREE.MathUtils.lerp(chairGroup.position.z, homeZ + (targetSlide * (homeZ > deskZ ? 0.6 : -0.6)), 0.08);
        chairGroup.rotation.y = THREE.MathUtils.lerp(chairGroup.rotation.y, targetRot, 0.08);
      }
    };
  }

  function desk(x, z, w = 3) {
    box(scene, w, 0.2, 1.5, wood, x, 1, z);
    for (const dx of [-w / 2 + 0.15, w / 2 - 0.15]) {
      for (const dz of [-0.58, 0.58]) {
        box(scene, 0.13, 0.95, 0.13, brass, x + dx, 0.48, z + dz);
      }
    }
    box(scene, 1.1, 0.06, 0.7, darkwood, x, 0.16, z);
  }

  // 1. Officer Lutkin Desk (Left North): Forensics Desk with Working Cyan Terminal & Chair
  desk(-7, -1);
  createWorkingTerminal(-7, 1.48, -1.2, 0, 'LUTKIN', 'OFFICER LUTKIN · FORENSIC INTEL', '#00e5ff', 0x00e5ff);
  const chairLutkin = createAdjustableChair(-7, 0, 0.18, Math.PI, -1);

  // 2. Officer Cortex Desk (Right North): Analytics Desk with Working Emerald Terminal & Chair
  desk(7, -1);
  createWorkingTerminal(7, 1.48, -1.2, 0, 'CORTEX', 'OFFICER CORTEX · ANALYTICAL MATRIX', '#2ecc71', 0x2ecc71);
  const chairCortex = createAdjustableChair(7, 0, 0.18, Math.PI, -1);

  // 3. Detective Apex Desk (Left South): Deputy Audit Desk with Working Amethyst Terminal & Chair
  desk(-7, 4, 2.7);
  createWorkingTerminal(-7, 1.48, 3.8, 0, 'APEX', 'DETECTIVE APEX · RED-TEAM AUDIT', '#c084fc', 0xc084fc);
  const chairApex = createAdjustableChair(-7, 0, 5.18, Math.PI, 4);

  // 4. Officer Vanguard Desk (Right South): OSINT Intel Desk with Working Orange Terminal & Chair
  desk(7, 4, 2.7);
  createWorkingTerminal(7, 1.48, 3.8, 0, 'VANGUARD', 'OFFICER VANGUARD · FIELD & OSINT', '#fb923c', 0xfb923c);
  const chairVanguard = createAdjustableChair(7, 0, 5.18, Math.PI, 4);

  // 5. Central Briefing Table (with Chief Argus's Command System & Adjustable Executive Chair)
  box(scene, 5.4, 0.22, 2.8, wood, 0, 1.15, 2.1);
  for (const x of [-2.35, 2.35]) {
    for (const z of [1.1, 3.1]) {
      box(scene, 0.15, 1, 0.15, brass, x, 0.55, z);
    }
  }
  // Chief Argus Command Terminal on Central Table (Facing South towards Argus)
  createWorkingTerminal(0, 1.62, 2.3, 0, 'ARGUS', 'DETECTIVE ARGUS · BUREAU COMMAND', '#f59e0b', 0xf59e0b);
  const chairArgus = createAdjustableChair(0, 0, 3.35, Math.PI, 2.1);

  const officerChairs = {
    ARGUS: chairArgus,
    APEX: chairApex,
    LUTKIN: chairLutkin,
    VANGUARD: chairVanguard,
    CORTEX: chairCortex
  };

  // Western wall decor: Beams, lanterns, wanted poster frames, CRT terminals
  for (const x of [-8, 0, 8]) {
    box(scene, 3, 0.18, 0.3, darkwood, x, 7.5, -1);
    box(scene, 1.2, 0.18, 0.18, brass, x, 7.35, -1);
  }
  for (const x of [-9, 9]) {
    box(scene, 1.25, 1.7, 0.12, darkwood, x, 4.5, -8.68);
    box(scene, 1.02, 1.45, 0.035, paper, x, 4.5, -8.59);
  }
  for (const x of [-8, -5, 5, 8]) {
    box(scene, 1.45, 1, 0.14, darkwood, x, 5.8, -8.7);
    box(scene, 1.25, 0.78, 0.04, screen, x, 5.8, -8.6);
  }

  // ==========================================
  // THE 5 GENDER-TAILORED DETECTIVES (STATIONS & POSTURES)
  // ==========================================
  const agents = [
    { name: 'ARGUS', x: 0, z: 3.35, rotY: Math.PI, scale: 1.08, gender: 'Male', role: 'Chief Investigation Officer' },
    { name: 'APEX', x: -7, z: 5.18, rotY: Math.PI, scale: 1.0, gender: 'Female', role: 'Deputy Investigation Officer' },
    { name: 'LUTKIN', x: -7, z: 0.18, rotY: Math.PI, scale: 0.94, gender: 'Female', role: 'Forensic Intelligence Officer' },
    { name: 'VANGUARD', x: 7, z: 5.18, rotY: Math.PI, scale: 1.04, gender: 'Male', role: 'Intelligence Operations Officer' },
    { name: 'CORTEX', x: 7, z: 0.18, rotY: Math.PI, scale: 0.95, gender: 'Male', role: 'Analytical Intelligence Officer' }
  ];

  // Open Corridor Waypoints (Strictly Avoiding All Tables and Desks)
  const officeWaypoints = [
    // Case Board Inspection (North Aisle)
    { x: -2.8, z: -5.8, rotY: Math.PI },
    { x: 0.0, z: -5.8, rotY: Math.PI },
    { x: 2.8, z: -5.8, rotY: Math.PI },
    // Left Open Corridor (Between Left Desks and Central Table)
    { x: -3.8, z: -2.2, rotY: 0 },
    { x: -3.8, z: 0.8, rotY: 0 },
    { x: -3.8, z: 2.4, rotY: Math.PI / 2 },
    { x: -3.8, z: 4.2, rotY: 0 },
    // Right Open Corridor (Between Right Desks and Central Table)
    { x: 3.8, z: -2.2, rotY: 0 },
    { x: 3.8, z: 0.8, rotY: 0 },
    { x: 3.8, z: 2.4, rotY: -Math.PI / 2 },
    { x: 3.8, z: 4.2, rotY: 0 },
    // South Open Corridor (Behind Central Table)
    { x: -2.2, z: 6.2, rotY: 0 },
    { x: 0.0, z: 6.2, rotY: 0 },
    { x: 2.2, z: 6.2, rotY: 0 },
    // Clerestory & Archives Corners
    { x: -10.2, z: -4.5, rotY: Math.PI / 4 },
    { x: 10.2, z: -4.5, rotY: -Math.PI / 4 }
  ];

  let isFreeMode = true; // Agents move freely by default until assigned work
  const figures = [];

  agents.forEach((a, idx) => {
    const char = createRealisticCharacter(a.name, { scale: a.scale });
    char.position.set(a.x, 0, a.z);
    char.rotation.y = a.rotY || 0;
    scene.add(char);

    figures.push({
      name: a.name,
      group: char,
      agentData: a,
      homePos: new THREE.Vector3(a.x, 0, a.z),
      homeRotY: a.rotY || 0,
      currentPos: new THREE.Vector3(a.x, 0, a.z),
      targetPos: new THREE.Vector3(a.x, 0, a.z),
      targetRotY: a.rotY || 0,
      state: 'idle', // 'idle' | 'walking'
      idleTimer: 1.5 + idx * 1.8, // staggered initial movement
      walkCycle: Math.random() * 10,
      speed: 1.25 + (idx % 3) * 0.15,
      isAssignedWork: false,
      phase: Math.random() * 6
    });
  });

  // Mouse Raycasting & Hover Interactivity
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }
  canvas.addEventListener('mousemove', onMouseMove);

  function onClick(e) {
    const rect = canvas.getBoundingClientRect();
    const clickMouse = new THREE.Vector2(
      ((e.clientX - rect.left) / rect.width) * 2 - 1,
      -((e.clientY - rect.top) / rect.height) * 2 + 1
    );
    raycaster.setFromCamera(clickMouse, camera);
    const intersects = raycaster.intersectObjects(scene.children, true);

    for (const hit of intersects) {
      let cur = hit.object;

      // 1. Check if clicked an Evidence or Clue Card on the Board
      if (cur.userData && (cur.userData.type === 'evidence' || cur.userData.type === 'clue' || cur.userData.type === 'docket')) {
        targetCamPos.set(cur.position.x * 0.7, cur.position.y, cur.position.z + 2.8);
        targetLookAt.set(cur.position.x, cur.position.y, cur.position.z);
        isTransitioning = true;

        if (typeof onEvidenceClick === 'function') {
          onEvidenceClick(cur.userData);
        }
        return;
      }

      // 2. Check if clicked an Officer
      while (cur && cur !== scene) {
        if (cur.name && cur.name.startsWith('character_')) {
          const aId = cur.name.replace('character_', '');
          if (typeof onAgentClick === 'function') {
            onAgentClick(aId);
          }
          return;
        }
        cur = cur.parent;
      }
    }
  }
  canvas.addEventListener('click', onClick);

  // Resize handler
  function handleResize() {
    const rect = canvas.getBoundingClientRect();
    const w = rect.width || canvas.clientWidth || window.innerWidth;
    const h = rect.height || canvas.clientHeight || window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  window.addEventListener('resize', handleResize);
  handleResize();

  // Animation Loop
  let isRunning = true;
  let isTransitioning = false;
  let targetCamPos = baseCamPos.clone();
  let targetLookAt = baseLookAt.clone();
  let activeSpeakerName = null;
  const clock = new THREE.Clock();

  function animate() {
    if (!isRunning) return;
    requestAnimationFrame(animate);

    const dt = Math.min(clock.getDelta(), 0.1);
    const t = clock.getElapsedTime();

    // 1. Update Live Working Computer Terminals (Glowing animated CRT telemetry)
    activeTerminals.forEach(term => term.update(t));

    // 2. Autonomous Detective Movement, Obstacle Avoidance & Stationing
    figures.forEach(f => {
      const isSpeaking = (f.name === activeSpeakerName);
      const officerChair = officerChairs[f.name];
      const distToDesk = Math.hypot(f.homePos.x - f.currentPos.x, f.homePos.z - f.currentPos.z);

      if (isFreeMode && !f.isAssignedWork) {
        // Agent is free to roam: standing posture
        f.isSitting = false;
        if (officerChair) officerChair.update(false, false, dt);

        if (f.state === 'walking') {
          // Route through intermediate corridor waypoint if path crosses central table
          let dest = f.targetPos;
          if (f.intermediatePos) {
            const distToInter = Math.hypot(f.intermediatePos.x - f.currentPos.x, f.intermediatePos.z - f.currentPos.z);
            if (distToInter > 0.35) {
              dest = f.intermediatePos;
            } else {
              f.intermediatePos = null;
            }
          }

          const dx = dest.x - f.currentPos.x;
          const dz = dest.z - f.currentPos.z;
          const dist = Math.hypot(dx, dz);

          if (dist > 0.15) {
            // Smoothly face walking direction
            const moveAngle = Math.atan2(dx, dz);
            let diffAngle = moveAngle - f.group.rotation.y;
            while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;
            while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
            f.group.rotation.y += diffAngle * 0.08;

            // Advance position along corridor
            const step = Math.min(f.speed * dt, dist);
            f.currentPos.x += (dx / dist) * step;
            f.currentPos.z += (dz / dist) * step;

            // Physical repulsion from central briefing table (NEVER pass through table)
            if (f.currentPos.x > -2.85 && f.currentPos.x < 2.85 && f.currentPos.z > 0.65 && f.currentPos.z < 3.55) {
              f.currentPos.x = f.currentPos.x < 0 ? -3.05 : 3.05;
            }

            f.group.position.x = f.currentPos.x;
            f.group.position.z = f.currentPos.z;

            f.walkCycle += dt;
            if (f.group.update) {
              f.group.update(t, mouse, isSpeaking, true, f.walkCycle, false);
            }
          } else {
            // Arrived at destination waypoint
            f.state = 'idle';
            f.idleTimer = 4.5 + Math.random() * 6.0;
            if (f.group.update) {
              f.group.update(t, mouse, isSpeaking, false, 0, false);
            }
          }
        } else {
          // Idle / inspecting board or documents
          f.group.rotation.y = THREE.MathUtils.lerp(f.group.rotation.y, f.targetRotY, 0.05);
          if (f.group.update) {
            f.group.update(t, mouse, isSpeaking, false, 0, false);
          }

          f.idleTimer -= dt;
          if (f.idleTimer <= 0) {
            // Pick next destination in open corridors
            const candidateWaypoints = officeWaypoints.filter(wp =>
              Math.hypot(wp.x - f.currentPos.x, wp.z - f.currentPos.z) > 2.5
            );
            const nextWp = candidateWaypoints[Math.floor(Math.random() * candidateWaypoints.length)] || officeWaypoints[0];

            // If crossing the central table, insert intermediate corridor waypoint
            const crossesCenter = (f.currentPos.z < 0.65 && nextWp.z > 3.55) || (f.currentPos.z > 3.55 && nextWp.z < 0.65);
            if (crossesCenter) {
              const aisleX = (f.currentPos.x <= 0 && nextWp.x <= 0) ? -3.8 : 3.8;
              f.intermediatePos = new THREE.Vector3(aisleX, 0, 2.1);
            } else {
              f.intermediatePos = null;
            }

            f.targetPos.set(nextWp.x, 0, nextWp.z);
            f.targetRotY = nextWp.rotY;
            f.state = 'walking';
          }
        }
      } else {
        // Stationed at Assigned Work Desk
        const isApproachingDesk = distToDesk < 1.8 && distToDesk > 0.15;
        const isAtDesk = distToDesk <= 0.15;

        // Animate chair adjusting and pulling in/out
        if (officerChair) {
          officerChair.update(isAtDesk, isApproachingDesk, dt);
        }

        if (!isAtDesk) {
          f.isSitting = false;

          // Route around central table if returning to station
          let dest = f.homePos;
          if (f.intermediatePos) {
            const distToInter = Math.hypot(f.intermediatePos.x - f.currentPos.x, f.intermediatePos.z - f.currentPos.z);
            if (distToInter > 0.35) {
              dest = f.intermediatePos;
            } else {
              f.intermediatePos = null;
            }
          } else {
            const crossesCenter = (f.currentPos.z < 0.65 && f.homePos.z > 3.55) || (f.currentPos.z > 3.55 && f.homePos.z < 0.65);
            if (crossesCenter && Math.abs(f.homePos.x) > 2.0) {
              const aisleX = f.homePos.x < 0 ? -3.8 : 3.8;
              f.intermediatePos = new THREE.Vector3(aisleX, 0, 2.1);
              dest = f.intermediatePos;
            }
          }

          const dx = dest.x - f.currentPos.x;
          const dz = dest.z - f.currentPos.z;
          const dist = Math.hypot(dx, dz);

          // Smoothly face walking direction
          const moveAngle = Math.atan2(dx, dz);
          let diffAngle = moveAngle - f.group.rotation.y;
          while (diffAngle < -Math.PI) diffAngle += Math.PI * 2;
          while (diffAngle > Math.PI) diffAngle -= Math.PI * 2;
          f.group.rotation.y += diffAngle * 0.08;

          const step = Math.min(f.speed * dt, dist);
          f.currentPos.x += (dx / dist) * step;
          f.currentPos.z += (dz / dist) * step;

          // Repel from central table
          if (f.name !== 'ARGUS' && f.currentPos.x > -2.85 && f.currentPos.x < 2.85 && f.currentPos.z > 0.65 && f.currentPos.z < 3.55) {
            f.currentPos.x = f.currentPos.x < 0 ? -3.05 : 3.05;
          }

          f.group.position.x = f.currentPos.x;
          f.group.position.z = f.currentPos.z;

          f.walkCycle += dt;
          if (f.group.update) {
            f.group.update(t, mouse, isSpeaking, true, f.walkCycle, false);
          }
        } else {
          // Detective is at desk: seated in adjusted chair typing/analyzing live system screen
          f.isSitting = true;
          f.group.position.x = f.homePos.x;
          f.group.position.z = f.homePos.z;
          f.group.rotation.y = THREE.MathUtils.lerp(f.group.rotation.y, f.homeRotY, 0.08);

          if (f.group.update) {
            f.group.update(t, mouse, isSpeaking, false, 0, true);
          }
        }
      }
    });

    // 3. Project Agent Name & Designation Badges from 3D World to Screen Coordinates
    const canvasRect = canvas.getBoundingClientRect();
    const cw = canvasRect.width;
    const ch = canvasRect.height;

    figures.forEach(f => {
      const tagEl = document.getElementById(`agent-tag-${f.name}`);
      if (tagEl) {
        const tagWorld = new THREE.Vector3();
        f.group.getWorldPosition(tagWorld);
        tagWorld.y += (f.isSitting ? 1.85 : 2.45); // Adjust height when sitting
        tagWorld.project(camera);

        if (tagWorld.z < 1.0 && tagWorld.z > -1.0) {
          const screenX = (tagWorld.x * 0.5 + 0.5) * cw;
          const screenY = (-(tagWorld.y * 0.5) + 0.5) * ch;
          tagEl.style.display = 'block';
          tagEl.style.left = `${screenX.toFixed(1)}px`;
          tagEl.style.top = `${screenY.toFixed(1)}px`;
        } else {
          tagEl.style.display = 'none';
        }
      }
    });

    // Candle micro-flicker
    candle.intensity = 14 + Math.sin(t * 14.0) * 0.8 + Math.cos(t * 7.0) * 0.5;

    // Smooth Camera Transition if moving to an officer or evidence card
    if (isTransitioning) {
      camera.position.lerp(targetCamPos, 0.06);
      controls.target.lerp(targetLookAt, 0.06);
      if (camera.position.distanceTo(targetCamPos) < 0.08) {
        isTransitioning = false;
      }
    }

    // Keep camera and controls target strictly inside the room for 360-degree rotation
    camera.position.x = THREE.MathUtils.clamp(camera.position.x, -10.8, 10.8);
    camera.position.y = THREE.MathUtils.clamp(camera.position.y, 0.9, 7.0);
    camera.position.z = THREE.MathUtils.clamp(camera.position.z, -8.0, 8.8);

    controls.target.x = THREE.MathUtils.clamp(controls.target.x, -5.5, 5.5);
    controls.target.y = THREE.MathUtils.clamp(controls.target.y, 0.9, 4.8);
    controls.target.z = THREE.MathUtils.clamp(controls.target.z, -5.5, 5.0);

    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  return {
    destroy: () => {
      isRunning = false;
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
      canvas.removeEventListener('click', onClick);
      controls.dispose();
      renderer.dispose();
    },
    focusAgent: (agentName) => {
      const match = figures.find(x => x.name === agentName);
      if (match) {
        targetCamPos.set(match.currentPos.x * 0.35, 6.5, match.currentPos.z + 5.0);
        targetLookAt.set(match.currentPos.x, 1.8, match.currentPos.z);
        isTransitioning = true;
      }
    },
    focusBoard: () => {
      targetCamPos.set(0, 4.4, -4.2);
      targetLookAt.set(0, 4.3, -8.4);
      isTransitioning = true;
    },
    resetCamera: () => {
      targetCamPos.copy(baseCamPos);
      targetLookAt.copy(baseLookAt);
      isTransitioning = true;
    },
    setActiveSpeaker: (agentName) => {
      activeSpeakerName = agentName;
    },
    setFreeRoam: (free) => {
      isFreeMode = free;
      if (!free) {
        figures.forEach(f => {
          f.state = 'walking';
          f.targetPos.copy(f.homePos);
          f.targetRotY = f.homeRotY;
        });
      }
    },
    isFreeRoam: () => isFreeMode,
    assignWork: (agentName, isAssigned) => {
      const f = figures.find(x => x.name === agentName);
      if (f) {
        f.isAssignedWork = isAssigned;
        if (isAssigned) {
          f.state = 'walking';
          f.targetPos.copy(f.homePos);
          f.targetRotY = f.homeRotY;
        }
      }
    },
    setLightingMode: (mode) => {
      activeTimeMode = mode;
      const key = (mode === 'auto') ? getAutoTimeProfile() : mode;
      if (lightingProfiles[key]) {
        applyLightingProfile(lightingProfiles[key]);
      }
    },
    getActiveLightingMode: () => activeTimeMode,
    toggleLights: () => {
      applyLightSwitch(!areLightsOn);
      return areLightsOn;
    },
    setLights: (on) => {
      applyLightSwitch(on);
      return areLightsOn;
    },
    areLightsOn: () => areLightsOn,
    setPause: (paused) => {
      isRunning = !paused;
      if (isRunning) animate();
    }
  };
}
