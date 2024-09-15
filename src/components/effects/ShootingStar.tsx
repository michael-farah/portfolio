import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ShootingStarData {
  id: number;
  x: number;
  y: number;
  angle: number;
  duration: number;
}

const ShootingStar: React.FC = () => {
  const [stars, setStars] = useState<ShootingStarData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        const newStar: ShootingStarData = {
          id: Date.now(),
          x: Math.random() * 80 + 10,
          y: Math.random() * 40,
          angle: 30 + Math.random() * 30,
          duration: 0.8 + Math.random() * 0.7,
        };

        setStars((prev) => [...prev.slice(-3), newStar]);

        setTimeout(() => {
          setStars((prev) => prev.filter((s) => s.id !== newStar.id));
        }, newStar.duration * 1000 + 500);
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div aria-hidden="true">
      <AnimatePresence>
        {stars.map((star) => (
          <motion.div
            key={star.id}
            initial={{ opacity: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: Math.cos((star.angle * Math.PI) / 180) * 250,
              y: Math.sin((star.angle * Math.PI) / 180) * 250,
            }}
            transition={{ duration: star.duration, ease: "easeOut" }}
            className="absolute w-[2px] h-[2px] rounded-full bg-white shadow-[0_0_6px_2px_rgba(255,255,255,0.6)]"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
            }}
          >
            {/* Tail */}
            <div
              className="absolute top-0 right-0 w-20 h-[1px] origin-right opacity-60"
              style={{
                background:
                  "linear-gradient(to left, rgba(255,255,255,0.8), transparent)",
                transform: `rotate(${180 + star.angle}deg)`,
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(ShootingStar);
