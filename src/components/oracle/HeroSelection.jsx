import { motion } from "framer-motion";

const isMobile = window.innerWidth < 768;

const heroes = [
  { name: "Achilles", image: "/characters/achilles.png" },
  { name: "Athena", image: "/characters/athena.png" },
  { name: "Odysseus", image: "/characters/odysseus.png" },
  { name: "Agamemnon", image: "/characters/agamemnon.png" },
  { name: "Helen", image: "/characters/helen.png" },
  { name: "Zeus", image: "/characters/zeus.png" },
];

function HeroSelection({ onSelect, selectedHero }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,.45)",
        backdropFilter: "blur(10px)",
        zIndex: 999999,

        display: "flex",
        flexDirection: "column",
        alignItems: "center",

        overflowY: "auto",

        paddingTop: isMobile ? "70px" : "70px",
        paddingBottom: "40px",
      }}
    >
      <h1
        style={{
          color: "#F5D88A",
          fontFamily: "Cinzel",
          textAlign: "center",
          fontSize: isMobile ? "2.3rem" : "54px",
          marginBottom: "35px",
          lineHeight: 1.1,
        }}
      >
        Choose Your
        <br />
        Ancient Guide
      </h1>

      <div
        style={{
          display: "grid",

          width: "100%",

          maxWidth: isMobile ? "360px" : "820px",

          gridTemplateColumns: isMobile
            ? "1fr 1fr"
            : "repeat(3,1fr)",

          gap: isMobile ? "16px" : "30px",

          justifyItems: "center",
        }}
      >
        {heroes.map((hero) => (
          <motion.div
            key={hero.name}
            onClick={() => onSelect(hero.name)}
            animate={{
              opacity:
                selectedHero && selectedHero !== hero.name ? 0 : 1,

              scale:
                selectedHero === hero.name ? 1.12 : 1,

              y:
                selectedHero === hero.name ? -10 : 0,
            }}
            transition={{
              duration: 0.6,
            }}
            whileHover={{
              scale: selectedHero ? 1.12 : 1.04,
              y: -6,
            }}
            whileTap={{
              scale: 0.96,
            }}
            style={{
              width: isMobile ? "145px" : "220px",

              height: isMobile ? "220px" : "330px",

              borderRadius: "22px",

              border:
                "1px solid rgba(255,220,120,.35)",

              background:
                "linear-gradient(180deg,#1d1d1d,#0d0d0d)",

              display: "flex",

              flexDirection: "column",

              justifyContent: "center",

              alignItems: "center",

              cursor: "pointer",

              overflow: "hidden",

              boxShadow:
                "0 0 15px rgba(255,220,120,.12)",
            }}
          >
            <motion.img
              src={hero.image}
              alt={hero.name}
              draggable={false}
              animate={{
                scale:
                  selectedHero === hero.name ? 1.08 : 1,
              }}
              transition={{
                duration: 0.8,
              }}
              style={{
                width: isMobile ? "95px" : "165px",

                height: isMobile ? "125px" : "210px",

                objectFit: "cover",

                borderRadius: "14px",

                userSelect: "none",

                pointerEvents: "none",
              }}
            />

            <div
              style={{
                marginTop: "16px",

                color: "#F8E7B0",

                fontFamily: "Cinzel",

                fontSize: isMobile ? "18px" : "28px",

                textAlign: "center",
              }}
            >
              {hero.name}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default HeroSelection;