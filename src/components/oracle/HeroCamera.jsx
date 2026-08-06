import { motion } from "framer-motion";

export default function HeroCamera({ children }) {

  const isMobile = window.innerWidth < 768;

  return (
    <motion.div
      initial={{
        scale: isMobile ? 0.65 : 0.78,
        y: isMobile ? 60 : 40,
        opacity: 0,
      }}
      animate={{
        scale: isMobile
          ? [0.85, 0.92, 0.96]
          : [0.95, 1.03, 1.08],
        y: isMobile
          ? [35, 10, 0]
          : [20, 0, -8],
        opacity: 1,
      }}
      transition={{
        duration: 3,
        ease: "easeOut",
      }}
      style={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {children}
    </motion.div>
  );
}