// ─── Hero Section Configuration ───────────────────────────────────────────────
// All values are easily tweakable. Comments explain each knob.

export interface LayerConfig {
  id: string;
  src: string;
  zIndex: number;
  /** 0 = no movement, 1 = full maxOffset movement (higher = moves more with mouse) */
  parallaxFactor: number;
  /** CSS size of the layer relative to the viewport container, e.g. "130%" */
  width: string;
  height: string;
  /** Horizontal offset from center as CSS value, e.g. "-15%" or "0px" */
  offsetX: string;
  /** Vertical offset from center as CSS value */
  offsetY: string;
  /** px blur radius for the depth drop-shadow */
  shadowBlur: number;
  /** CSS color for the drop-shadow, controls both intensity and hue */
  shadowColor: string;
  /** Additional directional shadow (x, y) in px for parallax depth feel */
  shadowOffset: { x: number; y: number };
  objectFit: 'cover' | 'contain';
  /** CSS blur applied to the image itself — simulates depth of field on far layers */
  depthBlur: number;
  /** Toggle visibility without removing from config */
  visible: boolean;
}

export interface DepthOverlayConfig {
  /** z-index between layers */
  zIndex: number;
  /** 0–1 opacity of the dark gradient — lower = more subtle */
  opacity: number;
  /** How far up from the bottom the gradient reaches (0–1 fraction of screen height) */
  reach: number;
}

export interface FogBandConfig {
  /** z-index, place between layer zIndexes to insert fog between specific layers */
  zIndex: number;
  /** Peak opacity of this fog band (0–1) */
  baseOpacity: number;
  /** Vertical center of the fog band as fraction of screen height (0 = top, 1 = bottom) */
  yCenter: number;
  /** Half-height of the fog gradient as fraction of screen height */
  ySpread: number;
  /** Horizontal drift speed multiplier for the noise animation */
  scrollSpeed: number;
}

export interface FogConfig {
  enabled: boolean;
  /** RGB color of the fog */
  color: readonly [number, number, number];
  /** Spatial frequency of the noise (smaller = larger, smoother patches) */
  noiseScale: number;
  /** Time speed of the noise animation (smaller = slower drift) */
  noiseSpeed: number;
  /** Global intensity multiplier (0–1) applied on top of each band's baseOpacity */
  globalIntensity: number;
  bands: FogBandConfig[];
}

export interface SunConfig {
  enabled: boolean;
  /** z-index — use a value between Layer3 (z=20) and Layer2 (z=40) */
  zIndex: number;
  /** Position as fraction of screen (0–1) */
  position: { x: number; y: number };
  /** RGB color of the warm core glow */
  color: readonly [number, number, number];
  /** Tight bright core radius in px */
  coreRadius: number;
  /** Warm inner halo radius in px */
  innerGlowRadius: number;
  /** Wide atmospheric scatter radius in px */
  outerGlowRadius: number;
  /** Overall brightness multiplier (0–1) */
  intensity: number;
  /** Speed of the subtle pulse animation */
  pulseSpeed: number;
  /** Pulse amplitude (0 = static, 0.1 = 10% size variation) */
  pulseAmount: number;
}

export interface LightRayConfig {
  enabled: boolean;
  /** z-index of the canvas (should be above Layer4 but below or above fog as desired) */
  zIndex: number;
  /** Source position as fraction of screen (0–1 for both axes) */
  source: { x: number; y: number };
  /** RGB color of the light */
  color: readonly [number, number, number];
  /** Overall brightness (0–1) */
  intensity: number;
  /** Number of rays to draw */
  rayCount: number;
  /** Total angular spread of the ray fan in degrees */
  spreadAngle: number;
  /** Center angle of the ray fan in degrees (90 = straight down, 0 = right) */
  baseAngle: number;
  /** Length multiplier relative to screen diagonal */
  rayLength: number;
  /** Speed of the flicker/sway animation */
  flickerSpeed: number;
  /** How much each ray's opacity flickers (0 = static, 1 = fully flickers) */
  flickerAmount: number;
}

export interface DarkOverlayConfig {
  enabled: boolean;
  /** 0 = transparent, 1 = fully black */
  opacity: number;
  /** z-index — above everything (> 60) to darken the full scene */
  zIndex: number;
}

export interface ParallaxConfig {
  /** Lerp factor per tick (0–1). Lower = smoother and slower to respond */
  smoothing: number;
  /** Maximum parallax offset in pixels at full mouse deflection */
  maxOffset: number;
}

// ─── Values ───────────────────────────────────────────────────────────────────

export const heroConfig = {
  // Layer order: index 0 = Layer4 (furthest back), index 3 = Layer1 (closest)
  layers: [
    {
      id: 'layer4',
      src: '/hero/Layer4.png',
      zIndex: 0,
      parallaxFactor: 0.2,
      width: '110%',
      height: '110%',
      offsetX: '-50%',
      offsetY: '-0%',
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 25, 0.0)',
      shadowOffset: { x: 0, y: 0 },
      objectFit: 'cover',
      depthBlur: 1,
      visible: true,
    },
    {
      id: 'layer3',
      src: '/hero/Layer3.png',
      zIndex: 20,
      parallaxFactor: 0.2,
      width: '120%',
      height: '120%',
      offsetX: '-0%',
      offsetY: '-0%',
      shadowBlur: 0,
      shadowColor: 'rgba(25, 25, 25, 0.0)',
      shadowOffset: { x: 2, y: 6 },
      objectFit: 'cover',
      depthBlur: 0,
      visible: false,
    },
    {
      id: 'layer2',
      src: '/hero/Layer2.png',
      zIndex: 40,
      parallaxFactor: 0.4,
      width: '116%',
      height: '116%',
      offsetX: '0%',
      offsetY: '0%',
      shadowBlur: 0,
      shadowColor: 'rgba(0, 0, 25, 0.0)',
      shadowOffset: { x: 3, y: 10 },
      objectFit: 'cover',
      depthBlur: 0,
      visible: false,
    },
    {
      id: 'layer1',
      src: '/hero/Layer1.png',
      zIndex: 60,
      parallaxFactor: 0.4,
      width: '110%',
      height: '110%',
      offsetX: '0%',
      offsetY: '0%',
      shadowBlur: 2,
      shadowColor: 'rgba(0, 0, 25, 0.1)',
      shadowOffset: { x: 0, y: 0 },
      objectFit: 'cover',
      depthBlur: 0,
      visible: true,
    },
  ] as LayerConfig[],

  // Dark depth overlays between layers — no animation, no color, just darkness at the base
  depthOverlays: [
    // Between Layer4 and Layer3 — heaviest ground shadow
    { zIndex: 10, opacity: 0.35, reach: 0.65 },
    // Between Layer3 and Layer2
    { zIndex: 30, opacity: 0.20, reach: 0.55 },
    // Between Layer2 and Layer1 — lightest
    { zIndex: 50, opacity: 0.12, reach: 0.45 },
  ] as DepthOverlayConfig[],

  sun: {
    enabled: false,
    zIndex: 65,                        // above all layers (Layer1 z=60) so it's not covered
    position: { x: 0.60, y: 0.90 },   // 60% ancho, 90% altura
    color: [255, 230, 140] as const,   // amarillo cálido
    coreRadius: 28,                    // px — disco solar visible
    innerGlowRadius: 130,              // px — halo cálido cercano
    outerGlowRadius: 480,              // px — dispersión atmosférica
    intensity: 0.88,
    pulseSpeed: 0.0025,
    pulseAmount: 0.04,
  } as SunConfig,

  fog: {
    enabled: false,
    // Slightly warm neutral — works for forest ground mist
    color: [220, 230, 215] as const,
    noiseScale: 0.0022,
    noiseSpeed: 0.00015,
    globalIntensity: 0.45,
    bands: [
      // Deep ground mist just above Layer4 — densest, hugs the floor
      { zIndex: 10, baseOpacity: 0.50, yCenter: 0.82, ySpread: 0.18, scrollSpeed: 0.06 },
      // Mid haze between Layer3 and Layer2
      { zIndex: 30, baseOpacity: 0.30, yCenter: 0.75, ySpread: 0.15, scrollSpeed: 0.04 },
      // Faint surface breath between Layer2 and Layer1
      { zIndex: 50, baseOpacity: 0.18, yCenter: 0.78, ySpread: 0.12, scrollSpeed: 0.02 },
    ],
  } as FogConfig,

  lightRay: {
    enabled: false,
    // z=5 puts the rays just above the background (Layer4 z=0) and below the first fog (z=10)
    // Set to 65 or higher to have rays appear above all layers instead
    zIndex: 5,
    source: { x: 0.60, y: 0.05 },
    color: [255, 248, 210] as const,
    intensity: 0.62,
    rayCount: 14,
    spreadAngle: 44,
    baseAngle: 92,
    rayLength: 1.45,
    flickerSpeed: 0.7,
    flickerAmount: 0.20,
  } as LightRayConfig,

  darkOverlay: {
    enabled: true,
    opacity: 0.35,   // ← subí/bajá este valor para oscurecer la escena
    zIndex: 70,      // por encima de todo (incluido el sol en z=65)
  } as DarkOverlayConfig,

  parallax: {
    smoothing: 0.07,
    maxOffset: 30,
  } as ParallaxConfig,
};

export type HeroConfig = typeof heroConfig;
