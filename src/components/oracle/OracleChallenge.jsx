import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function OracleChallenge({ hero }) {
  const isMobile = window.innerWidth < 768;
  const [quiz, setQuiz] = useState(null);
  const [visibleClues, setVisibleClues] = useState(1);
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState(null);
  const [movieNumber, setMovieNumber] = useState(1);
  const [score, setScore] = useState(0);

  async function loadNewMovie() {
    const res = await fetch(`https://the-oracle-9zdh.onrender.com/oracle/${hero}`);
    const data = await res.json();

    setQuiz(data);
    setGuess("");
    setResult(null);
    setVisibleClues(1);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    loadNewMovie();
  }, [hero]);

  if (!quiz) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999999,
        background: "rgba(0,0,0,.78)",
        backdropFilter: "blur(18px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "20px 15px" : "40px",
        overflowY: "auto",
        justifyContent: isMobile ? "flex-start" : "center",
      }}
    >
      <h1 style={{
        color:"#F5D88A",
        fontFamily:"Cinzel",
        fontSize: isMobile ? "42px" : "64px",
        letterSpacing:"8px"
      }}>
        {hero.toUpperCase()}
      </h1>

      <h3 style={{
        color:"#d5d5d5",
        marginBottom:"10px",
        letterSpacing:"2px"
      }}>
        "I sense another tale..."
      </h3>

      <div style={{
        color:"#FFD76C",
        marginBottom:"25px",
        fontSize: isMobile ? "28px" : "clamp(2rem,6vw,4.5rem)",
        textAlign:"center",
        fontFamily:"Cinzel"
      }}>
        Movie {movieNumber} / 10
        <br/>
        Score : {score}
      </div>

      <div style={{display:"flex",gap:"8px",marginBottom:"25px"}}>
        {Array.from({length:5}).map((_,i)=>(
          <span key={i} style={{fontSize:"30px",color:"#FFD54F"}}>
            {i < 5-visibleClues+1 ? "★":"☆"}
          </span>
        ))}
      </div>

      <motion.div layout style={{
        width: isMobile ? "92vw" : "500px",
        background:"rgba(255,255,255,.05)",
        border:"1px solid rgba(255,220,120,.25)",
        borderRadius:"18px",
        padding: isMobile ? "18px" : "30px",
        maxHeight: isMobile ? "280px" : "500px",
        overflowY: "auto",
      }}>
        {quiz.clues.slice(0,visibleClues).map((clue,index)=>(
          <motion.div
            key={index}
            initial={{opacity:0,y:15}}
            animate={{opacity:1,y:0}}
            style={{
              color:"#EFEFEF",
              fontSize: isMobile ? "17px" : "22px",
              lineHeight: "1.5",
              marginBottom:"15px"
            }}
          >
            📜 {clue}
          </motion.div>
        ))}
      </motion.div>

      <input
        value={guess}
        onChange={(e)=>setGuess(e.target.value)}
        placeholder="Guess the movie..."
        style={{
          width: isMobile ? "92vw" : "750px",
          marginTop:"35px",
          padding:"18px",
          borderRadius:"999px",
          border:"none",
          outline:"none",
          textAlign:"center",
          fontSize:"22px"
        }}
      />

      <button
        onClick={async()=>{
          fetch("https://the-oracle-9zdh.onrender.com/oracle/guess", {
            method:"POST",
            headers:{
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              sessionId:quiz.sessionId,
              guess:guess
            })
          });

          const data = await res.json();

          setResult(data);

          if(data.correct){
            setScore(prev=>prev+1);
          }
        }}
        style={{
          marginTop:"20px",
          padding:"16px 55px",
          border:"none",
          borderRadius:"999px",
          background:"#D8B44A",
          cursor:"pointer",
          fontWeight:"bold",
          fontSize:"18px"
        }}
      >
        CONSULT
      </button>

      {result && (
        <motion.div
          initial={{opacity:0,y:20}}
          animate={{opacity:1,y:0}}
          style={{marginTop:"25px",textAlign:"center"}}
        >
          <div style={{
            fontSize: isMobile ? "24px" : "30px",
            fontFamily:"Cinzel",
            color:result.correct ? "#7CFC00" : "#ff6b6b"
          }}>
            {result.correct ? "⚔ CORRECT ⚔" : "⚔ WRONG ⚔"}
          </div>

          <div style={{
            marginTop:"12px",
            color:"#F5D88A",
            fontSize:"22px"
          }}>
            {result.message}
          </div>

          {!result.correct && (
            <div style={{
              marginTop:"10px",
              color:"#fff",
              fontSize:"20px"
            }}>
              Answer : <b>{result.answer}</b>
            </div>
          )}

          <button
            onClick={()=>{
              if(movieNumber>=10){
                alert("Journey Complete!");
                return;
              }

              setMovieNumber(prev=>prev+1);
              loadNewMovie();
            }}
            style={{
              marginTop:"30px",
              padding:"18px 55px",
              border:"none",
              borderRadius:"999px",
              cursor:"pointer",
              background:"#D8B44A",
              fontWeight:"bold",
              fontSize:"20px"
            }}
          >
            ⚜ CONTINUE THE JOURNEY ⚜
          </button>
        </motion.div>
      )}

      {!result && visibleClues<4 && (
        <button
          onClick={()=>setVisibleClues(prev=>prev+1)}
          style={{
            marginTop:"22px",
            background:"none",
            border:"none",
            color:"#FFD76C",
            cursor:"pointer",
            fontSize:"18px"
          }}
        >
          Reveal Next Clue
        </button>
      )}
    </motion.div>
  );
}

export default OracleChallenge;
