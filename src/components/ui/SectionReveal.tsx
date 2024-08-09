import React from "react";
import { motion } from "framer-motion";
import { fadeInUp } from "../../utils/animations";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const SectionReveal: React.FC<SectionRevealProps> = ({
  children,
  className = "",
  delay = 0,
}) => {
  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      custom={delay}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default React.memo(SectionReveal);
