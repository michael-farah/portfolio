import React, { useEffect, useRef, useCallback, useMemo } from "react";
import {
  createStars,
  updateStar,
  isStarOutOfBounds,
  resetStar,
  projectStar,
  isGlowStar,
  DEFAULT_CONFIG,
  type Star,
  type StarFieldConfig,
} from "../../modules/starfield";

const ParticleField: React.FC<{
  starCount?: number;
  maxOpacity?: number;
}> = ({ starCount = 800, maxOpacity = 0.9 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const config = useMemo<StarFieldConfig>(
    () => ({ ...DEFAULT_CONFIG, starCount, maxOpacity }),
    [starCount, maxOpacity],
  );

  const stars = useMemo<Star[]>(
    () => createStars(starCount),
    [starCount],
  );

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);

    let frame: number;

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouse = mouseRef.current;

      for (let i = 0; i < stars.length; i++) {
        const updated = updateStar(stars[i]);
        const final = isStarOutOfBounds(updated) ? resetStar(updated) : updated;
        stars[i] = final;

        const projected = projectStar(final, width, height, mouse.x, mouse.y, config);

        if (!projected.shouldRender) continue;

        const { screenX, screenY, size, opacity, r, g, b } = projected;

        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();

        if (isGlowStar(size, opacity)) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.1})`;
          ctx.fill();
        }
      }

      frame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [resizeCanvas, handleMouseMove, stars, config]);

  return <canvas ref={canvasRef} className="w-full h-full" aria-hidden="true" />;
};

export default ParticleField;
