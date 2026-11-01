/**
 * Custom Shaders for ARGUS and Co. Ultra-Realistic 3D Character Rendering
 * Provides Subsurface Scattering, Holographic Scanlines, and Thermal modes.
 */

// Holographic / Biometric Scanline Shader
export const HolographicScanShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 },
    scanColor: { value: null },
    scanSpeed: { value: 2.0 },
    scanlinesCount: { value: 180.0 },
    glowIntensity: { value: 1.5 }
  },
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    uniform vec3 scanColor;
    uniform float scanSpeed;
    uniform float scanlinesCount;
    uniform float glowIntensity;

    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;

    void main() {
      vec4 baseColor = texture2D(tDiffuse, vUv);
      
      // Horizontal scanline pattern
      float scanline = sin(vUv.y * scanlinesCount + time * scanSpeed) * 0.5 + 0.5;
      
      // Vertical traveling biometric sweep pulse
      float sweep = smoothstep(0.0, 0.15, sin(vUv.y * 3.14 - time * 1.5) * 0.5 + 0.5);
      
      // Fresnel rim glow for holographic projection
      vec3 viewDir = vec3(0.0, 0.0, 1.0);
      float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 2.5);
      
      vec3 holo = mix(baseColor.rgb, scanColor, 0.45);
      holo += scanColor * (scanline * 0.25 + sweep * 0.6 + fresnel * glowIntensity);
      
      gl_FragColor = vec4(holo, baseColor.a * 0.95);
    }
  `
};

// Thermal / Infrared Spectrum Shader for Forensic Analysis
export const ThermalSpectrumShader = {
  uniforms: {
    tDiffuse: { value: null },
    time: { value: 0 }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform float time;
    varying vec2 vUv;

    // Heatmap gradient palette (purple -> blue -> green -> yellow -> red -> white)
    vec3 heatmap(float val) {
      val = clamp(val, 0.0, 1.0);
      return vec3(
        smoothstep(0.5, 0.8, val) + smoothstep(0.8, 1.0, val) * 0.5,
        smoothstep(0.2, 0.6, val) - smoothstep(0.8, 1.0, val),
        smoothstep(0.0, 0.3, val) - smoothstep(0.5, 0.7, val)
      );
    }

    void main() {
      vec4 tex = texture2D(tDiffuse, vUv);
      float luma = dot(tex.rgb, vec3(0.299, 0.587, 0.114));
      
      // Subtle pulse to simulate blood flow / thermal heat emission
      luma += sin(vUv.y * 10.0 + time * 2.0) * 0.03;
      
      vec3 thermalColor = heatmap(luma);
      gl_FragColor = vec4(thermalColor, tex.a);
    }
  `
};

