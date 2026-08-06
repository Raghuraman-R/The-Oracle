import { motion } from "framer-motion";

export default function HeroCamera({ children }) {
  return (
    <motion.div
      initial={{
        scale: 0.78,
        y: 40,
        opacity: 0,
      }}
      animate={{
        scale: [0.95, 1.03, 1.08],
        y: [20, 0, -8],
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