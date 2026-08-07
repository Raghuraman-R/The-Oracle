import { useState } from "react";
import * as THREE from "three";

import { Canvas } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Environment,
  OrbitControls,
} from "@react-three/drei";

import CameraRig from "./CameraRig";
import Temple from "./Temple";
import Moon from "./Moon";
import Galaxy from "./Galaxy";
import OracleMagic from "./OracleMagic";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

function OracleScene({ onIntroFinished }) {

  const [controlsEnabled, setControlsEnabled] = useState(false);
  const [githubVisible, setGithubVisible] = useState(false);

  const isMobile = window.innerWidth < 768;

  const githubUrl = "https://github.com/Raghuraman-R/";

  return (

    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",

        background: isMobile
          ? "url('/backgrounds/night.jpg') center center / cover no-repeat"
          : "#000",
      }}
    >

      {/* ============================= */}
      {/* GITHUB BUTTON */}
      {/* ============================= */}

      <a
        href={githubUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View GitHub Repository"
        style={{
          position: "absolute",

          top: isMobile ? "18px" : "24px",
          right: isMobile ? "18px" : "28px",

          width: isMobile ? "46px" : "54px",
          height: isMobile ? "46px" : "54px",

          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          borderRadius: "50%",

          background:
            "rgba(15, 15, 15, 0.72)",

          border:
            "1px solid rgba(247, 224, 161, 0.45)",

          backdropFilter: "blur(10px)",

          boxShadow:
            "0 0 20px rgba(247, 224, 161, 0.18)",

          zIndex: 1000,

          opacity: githubVisible ? 1 : 0,

          transform: githubVisible
            ? "translateY(0) scale(1)"
            : "translateY(-20px) scale(0.8)",

          pointerEvents:
            githubVisible ? "auto" : "none",

          transition:
            "opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease",

          textDecoration: "none",

          WebkitTapHighlightColor: "transparent",
        }}

        onMouseEnter={(e) => {

          e.currentTarget.style.transform =
            "translateY(0) scale(1.1)";

          e.currentTarget.style.boxShadow =
            "0 0 30px rgba(247, 224, 161, 0.55)";

        }}

        onMouseLeave={(e) => {

          e.currentTarget.style.transform =
            "translateY(0) scale(1)";

          e.currentTarget.style.boxShadow =
            "0 0 20px rgba(247, 224, 161, 0.18)";

        }}
      >

        {/* GitHub SVG */}

        <svg
          width={isMobile ? "24" : "28"}
          height={isMobile ? "24" : "28"}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >

          <path
            d="M12 2C6.477 2 2 6.477 2 12C2 16.418 4.865 20.167 8.84 21.49C9.34 21.58 9.52 21.273 9.52 21.007C9.52 20.77 9.512 20.14 9.508 19.31C6.726 19.91 6.14 17.97 6.14 17.97C5.685 16.815 5.03 16.507 5.03 16.507C4.122 15.886 5.1 15.899 5.1 15.899C6.105 15.97 6.635 16.931 6.635 16.931C7.527 18.459 8.977 18.02 9.54 17.763C9.63 17.116 9.889 16.676 10.175 16.428C7.955 16.175 5.62 15.316 5.62 11.316C5.62 10.176 6.027 9.244 6.697 8.514C6.583 8.263 6.227 7.208 6.795 5.769C6.795 5.769 7.67 5.489 9.5 6.728C10.33 6.497 11.2 6.382 12.07 6.378C12.94 6.382 13.81 6.497 14.64 6.728C16.47 5.489 17.345 5.769 17.345 5.769C17.913 7.208 17.557 8.263 17.443 8.514C18.113 9.244 18.52 10.176 18.52 11.316C18.52 15.327 16.181 16.171 13.955 16.42C14.315 16.731 14.635 17.345 14.635 18.285C14.635 19.63 14.623 20.712 14.623 21.007C14.623 21.276 14.803 21.586 15.31 21.49C19.283 20.165 22.145 16.417 22.145 12C22.145 6.477 17.668 2 12 2Z"
            fill="#F7E0A1"
          />

        </svg>

      </a>


      {/* ============================= */}
      {/* THREE.JS SCENE */}
      {/* ============================= */}

      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          background: "transparent",
        }}

        shadows={!isMobile}

        dpr={
          isMobile
            ? 1
            : [1, 2]
        }

        gl={{
          alpha: true,

          antialias: !isMobile,

          powerPreference:
            "high-performance",

          toneMapping:
            THREE.ACESFilmicToneMapping,

          toneMappingExposure: 0.9,
        }}
      >

        {/* ============================= */}
        {/* CAMERA */}
        {/* ============================= */}

        <PerspectiveCamera
          makeDefault
          position={[0, 54, -185]}
          fov={35}
        />


        {/* ============================= */}
        {/* DESKTOP HDRI */}
        {/* ============================= */}

        {!isMobile && (

          <Environment
            files="/hdri/night.exr"
            background
          />

        )}


        {/* ============================= */}
        {/* GALAXY */}
        {/* ============================= */}

        <Galaxy />


        {/* ============================= */}
        {/* LIGHTING */}
        {/* ============================= */}

        <ambientLight
          intensity={0.35}
          color="#bfcfff"
        />

        <hemisphereLight
          skyColor="#8fb5ff"
          groundColor="#111111"
          intensity={0.18}
        />

        <directionalLight
          position={[35, 45, -80]}
          intensity={1.15}
          color="#dbe7ff"

          castShadow={!isMobile}

          shadow-mapSize-width={
            isMobile ? 1024 : 4096
          }

          shadow-mapSize-height={
            isMobile ? 1024 : 4096
          }

          shadow-camera-near={1}
          shadow-camera-far={300}

          shadow-camera-left={-80}
          shadow-camera-right={80}

          shadow-camera-top={80}
          shadow-camera-bottom={-80}
        />

        <pointLight
          position={[0, 12, 0]}

          intensity={
            isMobile ? 2.5 : 6
          }

          color="#FFD977"

          distance={50}

          decay={2}
        />


        {/* ============================= */}
        {/* SCENE OBJECTS */}
        {/* ============================= */}

        <Moon />

        <OracleMagic />

        <Temple />


        {/* ============================= */}
        {/* CAMERA ANIMATION */}
        {/* ============================= */}

        <CameraRig
          onFinish={() => {

            // Enable interaction
            setControlsEnabled(true);

            // Show GitHub button
            setGithubVisible(true);

            // Finish Oracle intro
            if (onIntroFinished) {

              setTimeout(() => {

                onIntroFinished();

              }, 700);

            }

          }}
        />


        {/* ============================= */}
        {/* ORBIT CONTROLS */}
        {/* ============================= */}

        {controlsEnabled && (

          <OrbitControls
            enablePan={false}

            enableDamping

            dampingFactor={0.08}

            minDistance={15}

            maxDistance={150}

            maxPolarAngle={
              Math.PI / 2
            }

            enableZoom={true}

            enableRotate={true}

            touches={{
              ONE: THREE.TOUCH.ROTATE,

              TWO: THREE.TOUCH.DOLLY_PAN,
            }}
          />

        )}


        {/* ============================= */}
        {/* BLOOM */}
        {/* ============================= */}

        <EffectComposer>

          <Bloom
            intensity={
              isMobile
                ? 0.45
                : 1.15
            }

            luminanceThreshold={0.72}

            mipmapBlur={!isMobile}
          />

        </EffectComposer>

      </Canvas>

    </div>

  );
}

export default OracleScene;