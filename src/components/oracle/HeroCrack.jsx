import { motion } from "framer-motion";

export default function HeroCrack() {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: [0, 1, 0],
      }}
      transition={{
        delay: 0.8,
        duration: 0.45,
      }}
      style={{
        position: "absolute",
        inset: 0,

        zIndex: 50,

        pointerEvents: "none",

        display: "flex",

        justifyContent: "center",

        alignItems: "center",
      }}
    >
      <svg
        width="520"
        height="720"
        viewBox="0 0 520 720"
      >
        <motion.path
          d="M260 0
             L220 120
             L310 210
             L180 360
             L280 470
             L190 610
             L260 720"

          stroke="#FFE082"

          strokeWidth="6"

          fill="none"

          strokeLinecap="round"

          initial={{
            pathLength: 0,
          }}

          animate={{
            pathLength: 1,
          }}

          transition={{
            delay: 0.8,
            duration: 0.6,
          }}
        />
      </svg>
    </motion.div>
  );
}