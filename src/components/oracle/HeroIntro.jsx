import { useEffect } from "react";
import { motion } from "framer-motion";
import HeroCrack from "./HeroCrack";
import HeroCamera from "./HeroCamera";

const heroImages = {
  Achilles: "/characters/achilles.png",
  Athena: "/characters/athena.png",
  Odysseus: "/characters/odysseus.png",
  Agamemnon: "/characters/agamemnon.png",
  Helen: "/characters/helen.png",
  Zeus: "/characters/zeus.png",
};

export default function HeroIntro({ hero, onFinish }) {

  const isMobile = window.innerWidth < 768;

  useEffect(() => {

    const timer = setTimeout(() => {

      onFinish?.();

    }, 5000);

    return () => clearTimeout(timer);

  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        backdropFilter: "blur(24px)",
      }}
      transition={{ duration: 1 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999999,
        background: "rgba(0,0,0,.72)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <HeroCamera>

        <div
          style={{
            position: "relative",
            width: isMobile ? "90vw" : "420px",
            height: isMobile ? "70vh" : "580px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >

          {/* Divine Aura */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.4,
            }}
            animate={{
              opacity: 0.95,
              scale: 1.4,
            }}
            transition={{
              delay: 0.8,
              duration: 1.5,
            }}
            style={{
              position: "absolute",
              width: isMobile ? "90vw" : "520px",
              height: isMobile ? "90vw" : "520px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle,#FFE082 0%,rgba(255,220,120,.35) 35%,transparent 70%)",
              filter: "blur(60px)",
            }}
          />

          <HeroCrack />

          <motion.img
            src={heroImages[hero]}
            alt={hero}
            draggable={false}
            initial={{
              opacity: 0,
              scale: 0.75,
              rotate: -4,
            }}
            animate={{
              opacity: 1,
              scale: [1.02, 1.05, 1.02],
              rotate: 0,
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              repeatType: "mirror",
            }}
            style={{
              width: isMobile ? "85vw" : "420px",
              maxHeight: "75vh",
              objectFit: "contain",
              borderRadius: "24px",
              position: "relative",
              zIndex: 10,
              userSelect: "none",
              pointerEvents: "none",
              boxShadow:
                "0 0 80px rgba(255,220,120,.45)",
            }}
          />

        </div>

      </HeroCamera>

      <motion.h1
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 1.3,
          duration: 0.8,
        }}
        style={{
          marginTop: isMobile ? "20px" : "35px",
          color: "#F7E0A1",
          fontFamily: "Cinzel",
          fontSize: isMobile ? "44px" : "72px",
          letterSpacing: isMobile ? "4px" : "8px",
          textShadow:
            "0 0 20px rgba(255,220,120,.6)",
        }}
      >
        {hero.toUpperCase()}
      </motion.h1>

      <motion.h2
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 2.1,
          duration: 0.8,
        }}
        style={{
          color: "#dddddd",
          fontSize: isMobile ? "20px" : "28px",
          letterSpacing: "2px",
          fontFamily: "Cinzel",
          textAlign: "center",
          padding: "0 20px",
        }}
      >
        "I am {hero}."
      </motion.h2>

    </motion.div>
  );
}