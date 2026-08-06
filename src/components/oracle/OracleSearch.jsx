import { motion } from "framer-motion";

function OracleSearch({ onConsult }) {
  const isMobile = window.innerWidth < 768;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 0.3,
        duration: 1,
      }}
      style={{
        position: "fixed",
        bottom: isMobile ? "35px" : "60px",

        left: 0,
        right: 0,

        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        zIndex: 99999,
      }}
    >
      <motion.button
        onClick={onConsult}
        animate={{
          y: [0, -6, 0],
          boxShadow: [
            "0 0 18px rgba(255,210,100,.25)",
            "0 0 38px rgba(255,220,120,.55)",
            "0 0 18px rgba(255,210,100,.25)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        whileHover={{
          scale: 1.06,
          boxShadow: "0 0 60px rgba(255,220,120,.8)",
        }}
        whileTap={{
          scale: 0.95,
        }}
        style={{
          width: isMobile ? "300px" : "380px",

          maxWidth: "90vw",

          padding: isMobile ? "16px 24px" : "18px 44px",

          borderRadius: "999px",

          border: "2px solid rgba(255,220,120,.75)",

          background:
            "linear-gradient(180deg,#F5D86A 0%, #D8B44A 45%, #A67C18 100%)",

          color: "#1a1406",

          fontSize: isMobile ? "16px" : "18px",

          fontWeight: "700",

          letterSpacing: isMobile ? "2px" : "3px",

          cursor: "pointer",

          fontFamily: "Cinzel, serif",

          textShadow:
            "0 1px 2px rgba(255,255,255,.35)",

          boxShadow:
            "0 0 25px rgba(255,210,100,.35)",

          outline: "none",
        }}
      >
         CONSULT THE ORACLE 
      </motion.button>
    </motion.div>
  );
}

export default OracleSearch;