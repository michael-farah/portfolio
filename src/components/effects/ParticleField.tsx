import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../ThemeContext";

interface Star {
  x: number;
  y: number;
  z: number;
  speed: number;
  sideSpeed: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

const ParticleField: React.FC<{
  starCount?: number;
  maxOpacity?: number;
}> = ({ starCount = 800, maxOpacity = 0.9 }) => {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  const baseColor = useMemo(
    () => (theme === "dark" ? [255, 255, 255] : [56, 189, 248]),
    [theme],
  );

  const accentColor = useMemo(
    () => (theme === "dark" ? [129, 140, 248] : [99, 102, 241]),
    [theme],
  );

  const stars = useMemo<Star[]>(
    () =>
      Array.from({ length: starCount }, () => {
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
      }),
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
    let time = 0;

    const render = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      time += 1;
      const mouse = mouseRef.current;

      stars.forEach((star) => {
        star.z -= star.speed;
        star.x += star.sideSpeed;
        star.twinklePhase += star.twinkleSpeed;

        // Subtle mouse parallax
        const parallax = (1 - star.z) * 0.02;
        const px = (mouse.x - 0.5) * parallax;
        const py = (mouse.y - 0.5) * parallax;

        if (star.z <= 0.1 || star.x < -0.1 || star.x > 1.1) {
          star.z = 0.9 + Math.random() * 0.1;
          star.x = Math.random();
          star.y = Math.random();
          star.speed = (0.0005 + Math.random() * 0.001) * (1 - star.z * 0.5);
          star.sideSpeed = (Math.random() - 0.5) * 0.00015;
        }

        const screenX = ((star.x + px - 0.5) * width) / star.z + width / 2;
        const screenY = ((star.y + py - 0.5) * height) / star.z + height / 2;
        const size = Math.min(2.5, (0.4 / star.z) * (star.speed * 1200));
        const twinkle = 0.5 + 0.5 * Math.sin(star.twinklePhase);
        const depthOpacity = Math.min(maxOpacity, (1 - star.z) * 1.5);
        const opacity = depthOpacity * (0.6 + 0.4 * twinkle);

        if (
          screenX > -10 &&
          screenX < width + 10 &&
          screenY > -10 &&
          screenY < height + 10
        ) {
          const useAccent = star.twinklePhase % 6 < 1;
          const [r, g, b] = useAccent ? accentColor : baseColor;

          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fill();

          // Glow for brighter stars
          if (size > 1.5 && opacity > 0.6) {
            ctx.beginPath();
            ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.1})`;
            ctx.fill();
          }
        }
      });

      frame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [resizeCanvas, handleMouseMove, stars, baseColor, accentColor, maxOpacity]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default ParticleField;
