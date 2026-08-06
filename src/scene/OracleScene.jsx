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

  const isMobile = window.innerWidth < 768;

  return (

    <div
      style={{
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: isMobile
          ? "url('/backgrounds/night.jpg') center center / cover no-repeat"
          : "#000",
      }}
    >

      <Canvas
        style={{
          width: "100vw",
          height: "100vh",
          background: "transparent",
        }}
        shadows={!isMobile}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{
          alpha: true,
          antialias: !isMobile,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: isMobile ? 0.65 : 0.9,
        }}
      >

        {/* Camera */}

        <PerspectiveCamera
          makeDefault
          position={
            isMobile
              ? [0, 65, -300]
              : [0, 54, -185]
          }
          fov={isMobile ? 40 : 35}
        />

        {/* HDRI only on Desktop */}

        {!isMobile && (
          <Environment
            files="/hdri/night.exr"
            background
          />
        )}

        {/* Galaxy */}

        <Galaxy />

        {/* Lights */}

        <ambientLight
          intensity={isMobile ? 0.28 : 0.35}
          color="#bfcfff"
        />

        <hemisphereLight
          skyColor="#8fb5ff"
          groundColor="#111111"
          intensity={0.18}
        />

        <directionalLight
          position={[35, 45, -80]}
          intensity={isMobile ? 0.7 : 1.15}
          color="#dbe7ff"
          castShadow={!isMobile}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />

        <pointLight
          position={[0, 12, 0]}
          intensity={isMobile ? 2 : 5}
          color="#FFD977"
          distance={50}
          decay={2}
        />

        {/* Scene */}

        <Moon />

        <OracleMagic />

        <Temple />

        {/* Camera Animation */}

        <CameraRig
          onFinish={() => {

            setControlsEnabled(true);

            if (onIntroFinished) {

              setTimeout(() => {

                onIntroFinished();

              }, 700);

            }

          }}
        />

        {/* Controls */}

        {!isMobile && controlsEnabled && (

          <OrbitControls
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            minDistance={15}
            maxDistance={150}
            maxPolarAngle={Math.PI / 2}
          />

        )}

        {/* Bloom */}

        <EffectComposer>

          <Bloom
            intensity={isMobile ? 0.35 : 1.15}
            luminanceThreshold={0.72}
            mipmapBlur={!isMobile}
          />

        </EffectComposer>

      </Canvas>

    </div>

  );

}

export default OracleScene;