import { describe, it, expect } from "vitest";
import {
  createStar,
  createStars,
  resetStar,
  updateStar,
  isStarOutOfBounds,
  projectStar,
  isGlowStar,
  DEFAULT_CONFIG,
  type Star,
} from "../starPhysics";

describe("starPhysics", () => {
  describe("createStar", () => {
    it("should create a star with valid properties", () => {
      const star = createStar();
      expect(star.x).toBeGreaterThanOrEqual(0);
      expect(star.x).toBeLessThanOrEqual(1);
      expect(star.y).toBeGreaterThanOrEqual(0);
      expect(star.y).toBeLessThanOrEqual(1);
      expect(star.z).toBeGreaterThan(0);
      expect(star.z).toBeLessThanOrEqual(1);
      expect(star.speed).toBeGreaterThan(0);
      expect(star.twinklePhase).toBeGreaterThanOrEqual(0);
      expect(star.twinkleSpeed).toBeGreaterThan(0);
    });
  });

  describe("createStars", () => {
    it("should create the requested number of stars", () => {
      const stars = createStars(50);
      expect(stars).toHaveLength(50);
    });

    it("should return an empty array for count 0", () => {
      const stars = createStars(0);
      expect(stars).toHaveLength(0);
    });
  });

  describe("isStarOutOfBounds", () => {
    it("should return true when z <= 0.1", () => {
      const star: Star = { ...createStar(), z: 0.05 };
      expect(isStarOutOfBounds(star)).toBe(true);
    });

    it("should return true when x < -0.1", () => {
      const star: Star = { ...createStar(), x: -0.2 };
      expect(isStarOutOfBounds(star)).toBe(true);
    });

    it("should return true when x > 1.1", () => {
      const star: Star = { ...createStar(), x: 1.2 };
      expect(isStarOutOfBounds(star)).toBe(true);
    });

    it("should return false for in-bounds star", () => {
      const star: Star = { ...createStar(), x: 0.5, z: 0.5 };
      expect(isStarOutOfBounds(star)).toBe(false);
    });
  });

  describe("updateStar", () => {
    it("should decrease z by speed", () => {
      const star: Star = { ...createStar(), z: 0.5, speed: 0.001 };
      const updated = updateStar(star);
      expect(updated.z).toBeCloseTo(0.499);
    });

    it("should advance twinklePhase by twinkleSpeed", () => {
      const star: Star = { ...createStar(), twinklePhase: 1, twinkleSpeed: 0.02 };
      const updated = updateStar(star);
      expect(updated.twinklePhase).toBeCloseTo(1.02);
    });

    it("should not mutate the original star", () => {
      const star = createStar();
      const originalZ = star.z;
      updateStar(star);
      expect(star.z).toBe(originalZ);
    });
  });

  describe("resetStar", () => {
    it("should reset z to near 1", () => {
      const star: Star = { ...createStar(), z: 0.05 };
      const reset = resetStar(star);
      expect(reset.z).toBeGreaterThanOrEqual(0.9);
    });

    it("should randomize x and y", () => {
      const star = createStar();
      const reset = resetStar(star);
      expect(reset.x).toBeGreaterThanOrEqual(0);
      expect(reset.x).toBeLessThanOrEqual(1);
    });
  });

  describe("projectStar", () => {
    const config = DEFAULT_CONFIG;
    const width = 800;
    const height = 600;

    it("should project a star within the viewport", () => {
      const star: Star = {
        x: 0.5, y: 0.5, z: 0.5,
        speed: 0.001, sideSpeed: 0,
        twinklePhase: 0, twinkleSpeed: 0.02,
      };
      const projected = projectStar(star, width, height, 0.5, 0.5, config);
      expect(projected.screenX).toBeGreaterThan(-10);
      expect(projected.screenX).toBeLessThan(width + 10);
      expect(projected.screenY).toBeGreaterThan(-10);
      expect(projected.screenY).toBeLessThan(height + 10);
      expect(projected.shouldRender).toBe(true);
    });

    it("should mark off-screen stars as not renderable", () => {
      const star: Star = {
        x: 5, y: 0.5, z: 0.5,
        speed: 0.001, sideSpeed: 0,
        twinklePhase: 0, twinkleSpeed: 0.02,
      };
      const projected = projectStar(star, width, height, 0.5, 0.5, config);
      expect(projected.shouldRender).toBe(false);
    });

    it("should use accent color when twinklePhase is in accent range", () => {
      const star: Star = {
        x: 0.5, y: 0.5, z: 0.5,
        speed: 0.001, sideSpeed: 0,
        twinklePhase: 0.5,
        twinkleSpeed: 0.02,
      };
      const projected = projectStar(star, width, height, 0.5, 0.5, config);
      expect(projected.r).toBe(config.accentColor[0]);
      expect(projected.g).toBe(config.accentColor[1]);
      expect(projected.b).toBe(config.accentColor[2]);
    });

    it("should use base color when twinklePhase is outside accent range", () => {
      const star: Star = {
        x: 0.5, y: 0.5, z: 0.5,
        speed: 0.001, sideSpeed: 0,
        twinklePhase: 3,
        twinkleSpeed: 0.02,
      };
      const projected = projectStar(star, width, height, 0.5, 0.5, config);
      expect(projected.r).toBe(config.baseColor[0]);
      expect(projected.g).toBe(config.baseColor[1]);
      expect(projected.b).toBe(config.baseColor[2]);
    });
  });

  describe("isGlowStar", () => {
    it("should return true for large bright stars", () => {
      expect(isGlowStar(2.0, 0.7)).toBe(true);
    });

    it("should return false for small stars", () => {
      expect(isGlowStar(1.0, 0.7)).toBe(false);
    });

    it("should return false for dim stars", () => {
      expect(isGlowStar(2.0, 0.5)).toBe(false);
    });
  });

  describe("DEFAULT_CONFIG", () => {
    it("should have sensible defaults", () => {
      expect(DEFAULT_CONFIG.starCount).toBe(800);
      expect(DEFAULT_CONFIG.maxOpacity).toBe(0.9);
      expect(DEFAULT_CONFIG.baseColor).toEqual([255, 255, 255]);
      expect(DEFAULT_CONFIG.accentColor).toEqual([129, 140, 248]);
    });
  });
});
