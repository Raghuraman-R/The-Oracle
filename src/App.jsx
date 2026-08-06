import { useState } from "react";

import OracleScene from "./scene/OracleScene";

import OracleUI from "./components/oracle/OracleUI";
import OracleSearch from "./components/oracle/OracleSearch";
import OracleParticles from "./components/oracle/OracleParticles";

import HeroSelection from "./components/oracle/HeroSelection";
import HeroIntro from "./components/oracle/HeroIntro";
import OracleChallenge from "./components/oracle/OracleChallenge";

function App() {
  const [showUI, setShowUI] = useState(false);

  const [showHeroes, setShowHeroes] = useState(false);

  const [selectedHero, setSelectedHero] = useState(null);

  const [introHero, setIntroHero] = useState(null);

  const [startQuiz, setStartQuiz] = useState(false);

  return (
    <div className="relative w-screen h-screen overflow-hidden">

      <OracleScene
        onIntroFinished={() => setShowUI(true)}
      />

      {/* Intro Screen */}

      {showUI && !showHeroes && (
        <>
          <OracleParticles />

          <OracleUI />

          <OracleSearch
            onConsult={() => {

              setShowHeroes(true);

            }}
          />
        </>
      )}

      {/* Hero Selection */}

      {showHeroes && !introHero && !startQuiz && (

        <HeroSelection

          selectedHero={selectedHero}

          onSelect={(hero) => {

            setSelectedHero(hero);

            setTimeout(() => {

              setIntroHero(hero);

            }, 900);

          }}

        />

      )}

      {/* Hero Intro */}

      {introHero && !startQuiz && (

        <HeroIntro

          hero={introHero}

          onFinish={() => {

            setStartQuiz(true);

            setIntroHero(null);

          }}

        />

      )}

      {/* Oracle Challenge */}

      {startQuiz && (

        <OracleChallenge

          hero={selectedHero}

        />

      )}

    </div>
  );
}

export default App;