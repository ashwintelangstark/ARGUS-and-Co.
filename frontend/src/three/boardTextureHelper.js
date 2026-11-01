import * as THREE from 'three';

/**
 * Creates authentic vintage aged index card canvas textures for the 3D Case Board.
 */

// Helper to draw aged paper background with grunge borders
function drawAgedParchment(ctx, w, h, isDarker = false) {
  // Base paper gradient
  const grad = ctx.createLinearGradient(0, 0, w, h);
  if (isDarker) {
    grad.addColorStop(0, '#e2cb9d');
    grad.addColorStop(0.5, '#d6be8e');
    grad.addColorStop(1, '#c7ab7b');
  } else {
    grad.addColorStop(0, '#f2e4c7');
    grad.addColorStop(0.5, '#ebd7b2');
    grad.addColorStop(1, '#dfc79d');
  }
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, w, h);

  // Distressed paper borders
  ctx.strokeStyle = '#8a6438';
  ctx.lineWidth = 4;
  ctx.strokeRect(6, 6, w - 12, h - 12);

  ctx.strokeStyle = '#5a3d1d';
  ctx.lineWidth = 1;
  ctx.strokeRect(10, 10, w - 20, h - 20);

  // Subtle paper grain lines
  ctx.fillStyle = 'rgba(120, 80, 40, 0.05)';
  for (let y = 30; y < h - 20; y += 18) {
    ctx.fillRect(12, y, w - 24, 1);
  }
}

// 1. Central Case Docket Banner Texture
export function createDocketTexture(caseRef, title, priority, status, notes) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  drawAgedParchment(ctx, 1024, 512, false);

  // Header banner
  ctx.fillStyle = '#4a2d18';
  ctx.fillRect(16, 16, 1024 - 32, 58);

  ctx.fillStyle = '#f8ebd1';
  ctx.font = 'bold 28px serif';
  ctx.textAlign = 'center';
  ctx.fillText('ARGUS & CO. — OFFICIAL CASE DOSSIER', 512, 54);

  // Case Reference & Priority line
  ctx.textAlign = 'left';
  ctx.fillStyle = '#872b1d';
  ctx.font = 'bold 24px monospace';
  ctx.fillText(`DOSSIER REF: ${caseRef || 'ARG-1891-001'}`, 36, 116);

  ctx.fillStyle = '#2e1e12';
  ctx.font = 'bold 20px monospace';
  ctx.fillText(`PRIORITY: ${(priority || 'HIGH').toUpperCase()}  |  STATUS: ${(status || 'ACTIVE').toUpperCase()}`, 520, 116);

  // Title
  ctx.fillStyle = '#21140b';
  ctx.font = 'bold 36px serif';
  ctx.fillText(title || 'The Vanishing Ledger of Silvercreek Trust', 36, 172);

  // Divider
  ctx.strokeStyle = '#9c7344';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(36, 195);
  ctx.lineTo(1024 - 36, 195);
  ctx.stroke();

  // Intake Notes / Summary
  ctx.fillStyle = '#3f2b1c';
  ctx.font = '20px monospace';
  ctx.fillText('INTAKE SUMMARY & BRIEFING:', 36, 235);

  const cleanNotes = notes || 'At 02:40 AM, the primary subterranean ledger repository was breached without acoustic tripwire activation. Supervisor code utilized alongside RF carrier suppression.';
  
  // Word wrap notes
  const words = cleanNotes.split(' ');
  let line = '';
  let y = 275;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 920 && n > 0) {
      ctx.fillText(line, 36, y);
      line = words[n] + ' ';
      y += 32;
      if (y > 440) break;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 36, y);

  // Red Classified Bureau Stamp
  ctx.save();
  ctx.translate(840, 420);
  ctx.rotate(-0.15);
  ctx.strokeStyle = '#a62419';
  ctx.lineWidth = 4;
  ctx.strokeRect(-120, -32, 240, 64);
  ctx.fillStyle = '#a62419';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('BUREAU CERTIFIED', 0, -4);
  ctx.font = '14px monospace';
  ctx.fillText('CHAIN OF CUSTODY VERIFIED', 0, 18);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 2. Evidence Piece Card Texture
export function createEvidenceTexture(itemNum, filename, fileType, hash, date) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  drawAgedParchment(ctx, 512, 420, true);

  // Top header tab
  ctx.fillStyle = '#3a2414';
  ctx.fillRect(12, 12, 512 - 24, 46);

  ctx.fillStyle = '#fbeacf';
  ctx.font = 'bold 22px monospace';
  ctx.textAlign = 'left';
  ctx.fillText(`EVIDENCE ITEM #${itemNum}`, 26, 43);

  // File type badge
  ctx.fillStyle = '#872b1d';
  ctx.fillRect(380, 20, 100, 30);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText((fileType || 'FILE').toUpperCase(), 430, 41);

  // Filename
  ctx.textAlign = 'left';
  ctx.fillStyle = '#21140b';
  ctx.font = 'bold 24px serif';
  ctx.fillText(filename || 'access_vault_log.csv', 26, 105);

  // Divider
  ctx.strokeStyle = '#8c673d';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(26, 125);
  ctx.lineTo(512 - 26, 125);
  ctx.stroke();

  // Cryptographic details
  ctx.fillStyle = '#5c3d23';
  ctx.font = '16px monospace';
  ctx.fillText('CRYPTOGRAPHIC CHECKSUM:', 26, 160);

  ctx.fillStyle = '#1c120a';
  ctx.font = 'bold 15px monospace';
  const cleanHash = hash || '8a4f9b2d3c91e7048a4f9b2d3c91e7048a4f9b2d3c91e704';
  ctx.fillText(cleanHash.slice(0, 26), 26, 190);
  ctx.fillText(cleanHash.slice(26, 52) || '00b4e21a89c7d4e3f1a2b3', 26, 215);

  ctx.fillStyle = '#5c3d23';
  ctx.font = '16px monospace';
  ctx.fillText(`LOGGED: ${date || '1891-10-24 02:41:19'}`, 26, 265);
  ctx.fillText('STATUS: LOCKED IN EVIDENCE ARCHIVE', 26, 295);

  // Stamp
  ctx.save();
  ctx.translate(380, 345);
  ctx.rotate(0.12);
  ctx.strokeStyle = '#1f5f3f';
  ctx.lineWidth = 3;
  ctx.strokeRect(-90, -26, 180, 52);
  ctx.fillStyle = '#1f5f3f';
  ctx.font = 'bold 18px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('HASH VERIFIED', 0, 5);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// 3. Suspect & Clue Profile Card Texture
export function createSuspectTexture(title, category, description, isHypothesis = false) {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  drawAgedParchment(ctx, 512, 420, false);

  // Header band
  ctx.fillStyle = isHypothesis ? '#522919' : '#1e292a';
  ctx.fillRect(12, 12, 512 - 24, 46);

  ctx.fillStyle = '#fbeacf';
  ctx.font = 'bold 20px monospace';
  ctx.textAlign = 'left';
  ctx.fillText((category || 'LEAD').toUpperCase(), 26, 42);

  // Title
  ctx.fillStyle = '#24150b';
  ctx.font = 'bold 24px serif';
  ctx.fillText(title || 'Person of Interest', 26, 100);

  // Divider
  ctx.strokeStyle = '#8c673d';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(26, 120);
  ctx.lineTo(512 - 26, 120);
  ctx.stroke();

  // Description
  ctx.fillStyle = '#452f1e';
  ctx.font = '18px monospace';
  const words = (description || 'Key entity implicated in the timeline. Cross-referenced with port manifests and railway punch records.').split(' ');
  let line = '';
  let y = 160;
  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > 440 && n > 0) {
      ctx.fillText(line, 26, y);
      line = words[n] + ' ';
      y += 28;
      if (y > 330) break;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, 26, y);

  // Stamp
  ctx.save();
  ctx.translate(370, 350);
  ctx.rotate(-0.08);
  ctx.strokeStyle = isHypothesis ? '#9e3223' : '#a36d2c';
  ctx.lineWidth = 3;
  ctx.strokeRect(-95, -26, 190, 52);
  ctx.fillStyle = isHypothesis ? '#9e3223' : '#a36d2c';
  ctx.font = 'bold 17px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(isHypothesis ? 'WORKING HYPOTHESIS' : 'SURVEILLANCE ORDER', 0, 6);
  ctx.restore();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}
