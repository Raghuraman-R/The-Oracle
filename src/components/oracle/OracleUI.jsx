import { motion } from "framer-motion";
import "./OracleUI.css";

const isMobile = window.innerWidth < 768;

const title = isMobile ? ["THE", "ORACLE"] : ["THE ORACLE"];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const letter = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function OracleUI() {
  return (
    <div
      style={{
        position: "fixed",
        top: isMobile ? "10%" : "10%",
        left: 0,
        right: 0,
        width: "100%",

        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

        textAlign: "center",

        pointerEvents: "none",

        zIndex: 99999,

        padding: "0 20px",

        boxSizing: "border-box",
      }}
    >
      <motion.h1
        className="oracle-title"
        variants={container}
        initial="hidden"
        animate="show"
        style={{
          margin: 0,

          width: "100%",

          fontWeight: "700",

          color: "#F8E7B0",

          fontFamily: "Cinzel",

          fontSize: isMobile ? "56px" : "76px",

          lineHeight: isMobile ? "0.9" : "1.05",

          letterSpacing: isMobile ? "2px" : "14px",

          textShadow: `
            0 0 6px rgba(255,245,210,0.8),
            0 0 12px rgba(255,230,170,0.7),
            0 0 25px rgba(255,220,120,0.55),
            0 0 45px rgba(255,215,90,0.35),
            0 0 70px rgba(255,200,80,0.20)
          `,
        }}
      >
        {title.map((line, index) => (
          <div
            key={index}
            style={{
              marginBottom: isMobile ? "6px" : "0px",
            }}
          >
            {line.split("").map((char, i) => (
              <motion.span
                key={i}
                variants={letter}
                style={{
                  display: "inline-block",
                }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </div>
        ))}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 1.4,
          duration: 0.8,
        }}
        style={{
          marginTop: isMobile ? "18px" : "20px",

          width: "90%",

          maxWidth: "650px",

          fontSize: isMobile ? "16px" : "22px",

          lineHeight: "1.4",

          letterSpacing: isMobile ? "1px" : "4px",

          color: "#d8d8d8",

          textShadow:
            "0 0 8px rgba(255,255,255,.15)",
        }}
      >
        Seek Wisdom From The Ancient World
      </motion.p>
    </div>
  );
}

export default OracleUI;