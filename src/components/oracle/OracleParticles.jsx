import { motion } from "framer-motion";

const particles = [...Array(12)];

function OracleParticles() {
  return (
    <div
      style={{
        position: "fixed",
        top: "8%",
        left: "50%",
        transform: "translateX(-50%)",
        width: "520px",
        height: "180px",
        pointerEvents: "none",
        zIndex: 100000,
      }}
    >
      {particles.map((_, i) => {
        const size = Math.random() * 7 + 3;

        return (
          <motion.div
            key={i}
            initial={{
              opacity: 0,
              x: Math.random() * 520,
              y: 130 + Math.random() * 40,
              scale: 0,
            }}
            animate={{
              opacity: [0, 1, 0],
              y: [
                130 + Math.random() * 40,
                Math.random() * 20,
              ],
              scale: [0, 1.3, 0],
            }}
            transition={{
              delay: 1.2 + Math.random(),
              duration: 2.8,
              repeat: Infinity,
              repeatDelay: Math.random() * 2,
            }}
            style={{
              position: "absolute",

              width: size,
              height: size,

              borderRadius: "50%",

              background: "#FFE27A",

              boxShadow: `
                0 0 8px #FFD34D,
                0 0 18px #FFD34D,
                0 0 28px rgba(255,220,120,.9)
              `,
            }}
          />
        );
      })}
    </div>
  );
}

export default OracleParticles;