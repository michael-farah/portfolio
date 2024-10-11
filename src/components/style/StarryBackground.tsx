import React, { useEffect, useRef, useCallback, useMemo } from "react";
import { useTheme } from "../ThemeContext";

const StarryBackground: React.FC<{
  starColour?: string;
  starCount?: number;
  maxOpacity?: number;
}> = ({
  starColour: starColour = `${useTheme().theme === "dark" ? "rgb(255,255,255)" : "rgb(255, 234, 0)"}`,
  starCount = 1000,
  maxOpacity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const stars = useMemo(
    () =>
      Array.from({ length: starCount }, () => {
        const z = Math.sqrt(Math.random()) * 0.9 + 0.1;
        return {
          x: Math.random(),
          y: Math.random(),
          z,
          speed: (0.0008 + Math.random() * 0.0015) * (1 - z * 0.5),
          sideSpeed: (Math.random() - 0.5) * 0.0002,
        };
      }),
    [starCount],
  );

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.z -= star.speed;
        star.x += star.sideSpeed;

        if (star.z <= 0.1 || star.x < 0 || star.x > 1) {
          star.z = 1;
          star.x = Math.random();
          star.y = Math.random();
          star.speed = (0.0008 + Math.random() * 0.0015) * (1 - star.z * 0.5);
          star.sideSpeed = (Math.random() - 0.5) * 0.0002;
        }

        const screenX =
          ((star.x - 0.5) * canvas.width) / star.z + canvas.width / 2;
        const screenY =
          ((star.y - 0.5) * canvas.height) / star.z + canvas.height / 2;

        const size = Math.min(2.2, (0.4 / star.z) * (star.speed * 900));
        const opacity = Math.min(maxOpacity, (1 - star.z) * 1.5);

        if (
          screenX > 0 &&
          screenX < canvas.width &&
          screenY > 0 &&
          screenY < canvas.height
        ) {
          ctx.beginPath();
          ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
          const [r, g, b] = starColour.match(/\d+/g)?.map(Number) || [
            255, 255, 255,
          ];
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
          ctx.fill();
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resizeCanvas, stars, starColour, maxOpacity]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default StarryBackground;