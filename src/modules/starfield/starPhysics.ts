/**
 * Star field physics engine — pure functions, no DOM dependencies.
 * Handles particle creation, position updates, and screen projection.
 */

export interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
  sideSpeed: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

export interface StarFieldConfig {
  starCount: number;
  maxOpacity: number;
  baseColor: [number, number, number];
  accentColor: [number, number, number];
}

export const DEFAULT_CONFIG: StarFieldConfig = {
  starCount: 800,
  maxOpacity: 0.9,
  baseColor: [255, 255, 255],
  accentColor: [129, 140, 248],
};

export const createStar = (): Star => {
  const z = Math.sqrt(Math.random()) * 0.9 + 0.1;
  return {
    x: Math.random(),
    y: Math.random(),
    z,
    speed: (0.0005 + Math.random() * 0.001) * (1 - z * 0.5),
    sideSpeed: (Math.random() - 0.5) * 0.00015,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: 0.01 + Math.random() * 0.02,
  };
};

export const createStars = (count: number): Star[] =>
  Array.from({ length: count }, createStar);

export const resetStar = (star: Star): Star => {
  const z = 0.9 + Math.random() * 0.1;
  return {
    ...star,
    z,
    x: Math.random(),
    y: Math.random(),
    speed: (0.0005 + Math.random() * 0.001) * (1 - z * 0.5),
    sideSpeed: (Math.random() - 0.5) * 0.00015,
  };
};

export const isStarOutOfBounds = (star: Star): boolean =>
  star.z <= 0.1 || star.x < -0.1 || star.x > 1.1;

export const updateStar = (star: Star): Star => ({
  ...star,
  z: star.z - star.speed,
  x: star.x + star.sideSpeed,
  twinklePhase: star.twinklePhase + star.twinkleSpeed,
});

export interface ProjectedStar {
  screenX: number;
  screenY: number;
  size: number;
  opacity: number;
  r: number;
  g: number;
  b: number;
  shouldRender: boolean;
}

export const projectStar = (
  star: Star,
  width: number,
  height: number,
  mouseX: number,
  mouseY: number,
  config: StarFieldConfig,
): ProjectedStar => {
  const parallax = (1 - star.z) * 0.02;
  const px = (mouseX - 0.5) * parallax;
  const py = (mouseY - 0.5) * parallax;

  const screenX = ((star.x + px - 0.5) * width) / star.z + width / 2;
  const screenY = ((star.y + py - 0.5) * height) / star.z + height / 2;
  const size = Math.min(2.5, (0.4 / star.z) * (star.speed * 1200));
  const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
  const depthOpacity = Math.min(config.maxOpacity, (1 - star.z) * 1.5);
  const opacity = depthOpacity * (0.6 + 0.4 * twinkle);

  const shouldRender =
    screenX > -10 && screenX < width + 10 && screenY > -10 && screenY < height + 10;

  const useAccent = star.twinklePhase % 6 < 1;
  const [r, g, b] = useAccent ? config.accentColor : config.baseColor;

  return { screenX, screenY, size, opacity, r, g, b, shouldRender };
};

export const isGlowStar = (size: number, opacity: number): boolean =>
  size > 1.5 && opacity > 0.6;
