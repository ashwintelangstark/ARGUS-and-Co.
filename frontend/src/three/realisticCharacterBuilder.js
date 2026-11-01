import * as THREE from 'three';

/**
 * Builds authentic 3D Western Bureau detective models tailored to role and gender.
 * Pure procedural Three.js PBR geometry.
 */
export function createRealisticCharacter(agentId, options = {}) {
  const {
    isStudio = false,
    scale = 1.0
  } = options;

  const group = new THREE.Group();
  group.name = `character_${agentId}`;

  // Gendered and role-specific configurations
  const configs = {
    ARGUS: {
      name: 'Detective Argus',
      role: 'Chief Investigation Officer',
      gender: 'Male',
      dusterColor: 0x2b1d14, // Dark walnut brown duster
      vestColor: 0x1a120c,
      accentColor: 0xd0a45c, // Sovereign Gold
      hatColor: 0x1f140e,
      hatBand: 0xd0a45c,
      badgeColor: 0xd4a559, // Gold Sheriff Star
      scale: 1.08,
      height: 1.82,
      isFemale: false,
      hasBeard: true,
      hasGlasses: false
    },
    APEX: {
      name: 'Detective Apex',
      role: 'Deputy Investigation Officer',
      gender: 'Female',
      dusterColor: 0x3d251a, // Rich leather brown duster
      vestColor: 0x4a181e, // Deep crimson henley
      accentColor: 0xb58a62, // Warm bronze
      hatColor: 0x24150f,
      hatBand: 0x9e6c43,
      badgeColor: 0xd1d5db, // Silver Deputy Shield
      scale: 1.0,
      height: 1.70,
      isFemale: true,
      hasPonytail: true,
      hasGlasses: false
    },
    LUTKIN: {
      name: 'Officer Lutkin',
      role: 'Forensic Intelligence Officer',
      gender: 'Female',
      dusterColor: 0x25332c, // Deep forest green duster
      vestColor: 0x1c2621,
      accentColor: 0x9baf8b, // Sage green
      hatColor: 0x181e1b,
      hatBand: 0x829c73,
      badgeColor: 0xc8a462, // Brass Caduceus
      scale: 0.94,
      height: 1.66,
      isFemale: true,
      hasBun: true,
      hasGlasses: 'round'
    },
    VANGUARD: {
      name: 'Officer Vanguard',
      role: 'Intelligence Operations Officer',
      gender: 'Male',
      dusterColor: 0x2a1e16, // Rugged dark brown duster
      vestColor: 0x1d140e,
      accentColor: 0xc08c4c, // Amber brass
      hatColor: 0x1d140e,
      hatBand: 0x9c6a32,
      badgeColor: 0xc4944d, // Brass Star
      scale: 1.04,
      height: 1.84,
      isFemale: false,
      hasSweptHair: true,
      hasHarness: true,
      hasGlasses: false
    },
    CORTEX: {
      name: 'Officer Cortex',
      role: 'Analytical Intelligence Officer',
      gender: 'Male',
      dusterColor: 0x232d2e, // Slate dark teal duster
      vestColor: 0x161d1e,
      accentColor: 0x9caa86, // Muted teal-olive
      hatColor: 0x141b1c,
      hatBand: 0x6e8a75,
      badgeColor: 0xb08f52, // Bronze Compass Badge
      scale: 0.95,
      height: 1.74,
      isFemale: false,
      hasCurledFringe: true,
      hasGlasses: 'rect'
    }
  };

  const cfg = configs[agentId] || configs.ARGUS;

  // Materials with PBR properties
  const mat = (c, r = 0.72, m = 0.08) => new THREE.MeshStandardMaterial({ color: c, roughness: r, metalness: m });
  const dusterMat = mat(cfg.dusterColor, 0.78, 0.08);
  const vestMat = mat(cfg.vestColor, 0.75, 0.12);
  const skinMat = mat(0xc49372, 0.52, 0.04);
  const hairMat = mat(0x191410, 0.78, 0.15);
  const darkwoodMat = mat(0x24160d, 0.7, 0.1);
  const brassMat = mat(cfg.badgeColor, 0.32, 0.85);
  const blackMat = mat(0x14100c, 0.85, 0.12);
  const accentMat = mat(cfg.accentColor, 0.48, 0.45);

  const root = new THREE.Group();
  group.add(root);

  const body = new THREE.Group();
  root.add(body);

  function box(p, w, h, d, m, x, y, z) {
    const o = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
    o.position.set(x, y, z);
    o.castShadow = true;
    o.receiveShadow = true;
    p.add(o);
    return o;
  }

  function cyl(p, r1, r2, h, m, x, y, z, segs = 18) {
    const o = new THREE.Mesh(new THREE.CylinderGeometry(r1, r2, h, segs), m);
    o.position.set(x, y, z);
    o.castShadow = true;
    p.add(o);
    return o;
  }

  // 1. Gendered Torso & Waistcoat
  let torso;
  if (cfg.isFemale) {
    // Feminine silhouette: narrower shoulders, tapered waist, sculpted bust
    torso = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.28, 0.78, 16), dusterMat);
    torso.position.y = 1.32;
    torso.scale.set(1.05, 1.0, 0.8);
    torso.castShadow = true;
    body.add(torso);

    // Subtle feminine bust contouring
    const bust = new THREE.Mesh(new THREE.SphereGeometry(0.18, 14, 10), vestMat);
    bust.scale.set(1.4, 0.9, 0.8);
    bust.position.set(0, 1.42, 0.16);
    body.add(bust);

    // Slimmer lapels
    box(body, 0.09, 0.72, 0.03, accentMat, -0.11, 1.35, 0.32);
    box(body, 0.09, 0.72, 0.03, accentMat, 0.11, 1.35, 0.32);
  } else {
    // Masculine silhouette: broad chest, tapered downwards
    torso = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.75, 6, 14), dusterMat);
    torso.position.y = 1.32;
    torso.scale.set(1.12, 1.0, 0.82);
    torso.castShadow = true;
    body.add(torso);

    // Waistcoat inset
    box(body, 0.44, 0.70, 0.05, vestMat, 0, 1.32, 0.28);

    // Broad duster lapels
    box(body, 0.13, 0.76, 0.035, accentMat, -0.14, 1.35, 0.35);
    box(body, 0.13, 0.76, 0.035, accentMat, 0.14, 1.35, 0.35);

    // Shoulder harness if Vanguard or Argus
    if (cfg.hasHarness || agentId === 'ARGUS') {
      for (const s of [-1, 1]) {
        const strap = box(body, 0.07, 0.82, 0.03, mat(0x18120c), s * 0.24, 1.42, 0.26);
        strap.rotation.z = s * -0.12;
        const buckle = box(body, 0.08, 0.05, 0.04, brassMat, s * 0.24, 1.58, 0.28);
      }
    }
  }

  // 2. Neck & Head
  const neckRadius = cfg.isFemale ? 0.10 : 0.13;
  cyl(body, neckRadius, neckRadius + 0.02, 0.22, skinMat, 0, 1.95, 0);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 2.18, 0);
  root.add(headGroup);

  // Sculpted Cranium & Jaw
  const headGeo = new THREE.SphereGeometry(0.27, 24, 18);
  if (cfg.isFemale) {
    headGeo.scale(0.88, 1.10, 0.95); // Delicate feminine proportions
  } else {
    headGeo.scale(0.96, 1.14, 1.02); // Broad masculine jaw
  }
  const head = new THREE.Mesh(headGeo, skinMat);
  head.castShadow = true;
  headGroup.add(head);

  // Hair styling according to character role & gender
  const haircapGeo = new THREE.SphereGeometry(0.285, 20, 14, 0, Math.PI * 2, 0, Math.PI * 0.6);
  haircapGeo.scale(0.95, 1.12, 1.02);
  const haircap = new THREE.Mesh(haircapGeo, hairMat);
  haircap.position.set(0, 0.06, -0.02);
  headGroup.add(haircap);

  if (cfg.hasBun) {
    // Officer Lutkin: High topknot bun
    const bun = new THREE.Mesh(new THREE.SphereGeometry(0.13, 14, 12), hairMat);
    bun.scale.set(1.1, 0.85, 0.9);
    bun.position.set(0, 0.36, -0.12);
    headGroup.add(bun);
    cyl(headGroup, 0.11, 0.11, 0.03, mat(0x101010), 0, 0.32, -0.12);
  } else if (cfg.hasPonytail) {
    // Detective Apex: Graceful low ponytail
    const pony = new THREE.Mesh(new THREE.ConeGeometry(0.09, 0.42, 10), hairMat);
    pony.position.set(0, 0.02, -0.28);
    pony.rotation.x = -Math.PI * 0.42;
    headGroup.add(pony);
  } else if (cfg.hasBeard) {
    // Detective Argus: Groomed stubble / beard
    const beard = new THREE.Mesh(new THREE.SphereGeometry(0.20, 14, 10, 0, Math.PI * 2, Math.PI * 0.4, Math.PI * 0.5), hairMat);
    beard.scale.set(1.0, 1.05, 1.15);
    beard.position.set(0, -0.10, 0.05);
    headGroup.add(beard);
  }

  // 3. Gendered Western Hat
  const hatCrownR = cfg.isFemale ? 0.17 : 0.20;
  const hatBrimR = cfg.isFemale ? 0.42 : 0.49;

  // Crown
  cyl(headGroup, hatCrownR, hatCrownR + 0.03, 0.26, mat(cfg.hatColor), 0, 0.34, 0);

  // Brim (tilted gracefully if female, straight authoritative if male)
  const brim = new THREE.Mesh(new THREE.CylinderGeometry(hatBrimR, hatBrimR, 0.045, 32), mat(cfg.hatColor));
  brim.position.y = 0.24;
  if (cfg.isFemale) {
    brim.rotation.z = -0.06;
    brim.rotation.x = 0.04;
  }
  brim.castShadow = true;
  headGroup.add(brim);

  // Hat accent band
  cyl(headGroup, hatCrownR + 0.006, hatCrownR + 0.006, 0.045, mat(cfg.hatBand, 0.4, 0.4), 0, 0.28, 0);

  // 4. Spectacles (Lutkin round, Cortex rectangular)
  if (cfg.hasGlasses) {
    const wireMat = mat(0x2b221a, 0.3, 0.9);
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, transmission: 0.96, transparent: true, opacity: 0.8 });

    if (cfg.hasGlasses === 'round') {
      for (const s of [-1, 1]) {
        const rim = new THREE.Mesh(new THREE.TorusGeometry(0.058, 0.005, 8, 20), wireMat);
        rim.position.set(s * 0.084, 0.04, 0.27);
        headGroup.add(rim);

        const lens = new THREE.Mesh(new THREE.CircleGeometry(0.056, 16), glassMat);
        lens.position.set(s * 0.084, 0.04, 0.27);
        headGroup.add(lens);
      }
      const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.05, 8), wireMat);
      bridge.rotation.z = Math.PI / 2;
      bridge.position.set(0, 0.04, 0.27);
      headGroup.add(bridge);
    } else {
      for (const s of [-1, 1]) {
        const rim = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.07, 0.01), wireMat);
        rim.position.set(s * 0.088, 0.04, 0.27);
        headGroup.add(rim);
      }
      const bridge = new THREE.Mesh(new THREE.CylinderGeometry(0.004, 0.004, 0.055, 8), wireMat);
      bridge.rotation.z = Math.PI / 2;
      bridge.position.set(0, 0.04, 0.27);
      headGroup.add(bridge);
    }
  }

  // 5. Gender-Tailored Arms & Hands
  const armRadius = cfg.isFemale ? 0.10 : 0.13;
  const armGeo = new THREE.CapsuleGeometry(armRadius, 0.54, 4, 10);

  for (const s of [-1, 1]) {
    const arm = new THREE.Mesh(armGeo, dusterMat);
    const armSpread = cfg.isFemale ? 0.40 : 0.48;
    arm.position.set(s * armSpread, 1.36, 0.02);
    arm.rotation.z = s * (cfg.isFemale ? 0.18 : 0.22);
    body.add(arm);

    const hand = new THREE.Mesh(new THREE.SphereGeometry(cfg.isFemale ? 0.09 : 0.11, 12, 10), skinMat);
    hand.position.set(s * (armSpread + 0.02), 1.02, 0.05);
    body.add(hand);

    // Duster legs & boots
    const legRadius = cfg.isFemale ? 0.13 : 0.16;
    const leg = new THREE.Mesh(new THREE.CapsuleGeometry(legRadius, 0.62, 4, 10), darkwoodMat);
    leg.position.set(s * (cfg.isFemale ? 0.16 : 0.19), 0.43, 0);
    body.add(leg);

    box(body, cfg.isFemale ? 0.22 : 0.27, 0.13, 0.44, blackMat, s * (cfg.isFemale ? 0.16 : 0.19), 0.08, 0.12);
  }

  // 6. Chest Badge / Insignia
  const badge = box(body, 0.15, 0.15, 0.035, brassMat, 0.22, 1.56, 0.36);
  badge.rotation.z = 0.12;

  // 7. Interactive Floor Halo Ring & Neon Spot
  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(0.52, 0.022, 8, 44),
    new THREE.MeshBasicMaterial({ color: cfg.accentColor, transparent: true, opacity: 0.85 })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.04;
  group.add(ring);

  const outerRing = new THREE.Mesh(
    new THREE.RingGeometry(0.58, 0.60, 32),
    new THREE.MeshBasicMaterial({ color: cfg.accentColor, side: THREE.DoubleSide, transparent: true, opacity: 0.35 })
  );
  outerRing.rotation.x = Math.PI / 2;
  outerRing.position.y = 0.035;
  group.add(outerRing);

  const glow = new THREE.PointLight(cfg.accentColor, 1.4, 3.8);
  glow.position.set(0, 2.3, 0.3);
  group.add(glow);

  group.scale.setScalar(scale);

  // Animation Update Loop
  group.update = function (time, mouseTarget = { x: 0, y: 0 }, isSpeaking = false) {
    // Breathing
    const breath = Math.sin(time * 1.3) * 0.02;
    body.position.y = breath;
    headGroup.position.y = 2.18 + breath * 1.1;

    // Head-tracking mouse cursor
    const targetRotY = THREE.MathUtils.clamp(mouseTarget.x * 0.38, -0.42, 0.42);
    const targetRotX = THREE.MathUtils.clamp(-mouseTarget.y * 0.25, -0.22, 0.22);
    headGroup.rotation.y = THREE.MathUtils.lerp(headGroup.rotation.y, targetRotY, 0.06);
    headGroup.rotation.x = THREE.MathUtils.lerp(headGroup.rotation.x, targetRotX, 0.06);

    // Rotating floor halo
    ring.rotation.z = time * 0.2;
    outerRing.rotation.z = -time * 0.12;

    // Speaking pulsation
    if (isSpeaking) {
      glow.intensity = 2.5 + Math.sin(time * 10.0) * 0.8;
      ring.scale.setScalar(1.0 + Math.sin(time * 8.0) * 0.08);
    } else {
      glow.intensity = 1.3 + Math.sin(time * 1.5) * 0.25;
      ring.scale.setScalar(1.0);
    }
  };

  // 3D Studio Mode Shader Switcher
  group.setRenderMode = function (mode) {
    const isWire = (mode === 'wireframe');
    dusterMat.wireframe = isWire;
    vestMat.wireframe = isWire;
    skinMat.wireframe = isWire;

    if (mode === 'thermal') {
      dusterMat.color.setHex(0x3300aa);
      skinMat.color.setHex(0xff3300);
      accentMat.color.setHex(0xffff00);
      glow.color.setHex(0xff2200);
    } else if (mode === 'hologram') {
      dusterMat.color.setHex(cfg.accentColor);
      skinMat.color.setHex(cfg.accentColor);
      accentMat.color.setHex(cfg.accentColor);
      dusterMat.transparent = true;
      dusterMat.opacity = 0.72;
      glow.color.setHex(cfg.accentColor);
    } else {
      dusterMat.color.setHex(cfg.dusterColor);
      skinMat.color.setHex(0xc49372);
      accentMat.color.setHex(cfg.accentColor);
      dusterMat.transparent = false;
      dusterMat.opacity = 1.0;
      glow.color.setHex(cfg.accentColor);
    }
  };

  return group;
}
