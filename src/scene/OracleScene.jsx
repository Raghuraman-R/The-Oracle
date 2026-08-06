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

  // Mobile detection
  const isMobile = window.innerWidth < 768;

  return (
    <Canvas
      style={{
        width: "100vw",
        height: "100vh",
      }}
      shadows
      dpr={isMobile ? 1 : [1, 2]}
      gl={{
        antialias: !isMobile,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: isMobile ? 0.75 : 0.9,
      }}
    >
      {/* Camera */}
      <PerspectiveCamera
        makeDefault
        position={
          isMobile
            ? [0, 58, -245]
            : [0, 54, -185]
        }
        fov={isMobile ? 42 : 35}
      />

      {/* HDRI */}
      {!isMobile && (
        <Environment
          files="/hdri/night.exr"
          background
        />
      )}

      {/* Galaxy */}
      {!isMobile && <Galaxy />}

      {/* Lights */}

      <ambientLight
        intensity={isMobile ? 0.45 : 0.35}
        color="#bfcfff"
      />

      <hemisphereLight
        skyColor="#8fb5ff"
        groundColor="#111111"
        intensity={0.25}
      />

      {/* Moon Light */}
      <directionalLight
        position={[35, 45, -80]}
        intensity={1.2}
        color="#dbe7ff"
        castShadow
        shadow-mapSize-width={isMobile ? 1024 : 4096}
        shadow-mapSize-height={isMobile ? 1024 : 4096}
        shadow-camera-near={1}
        shadow-camera-far={300}
        shadow-camera-left={-80}
        shadow-camera-right={80}
        shadow-camera-top={80}
        shadow-camera-bottom={-80}
      />

      {/* Oracle Golden Glow */}
      <pointLight
        position={[0, 12, 0]}
        intensity={isMobile ? 2.5 : 6}
        color="#FFD977"
        distance={50}
        decay={2}
      />

      {/* Moon */}
      <Moon />

      {/* Oracle Particles */}
      {!isMobile && <OracleMagic />}

      {/* Temple */}
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
      {controlsEnabled && (
        <OrbitControls
          enablePan={false}
          enableDamping
          dampingFactor={0.08}
          minDistance={15}
          maxDistance={150}
          maxPolarAngle={Math.PI / 2}
        />
      )}

      {/* Bloom - Desktop Only */}
      {!isMobile && (
        <EffectComposer>
          <Bloom
            intensity={1.15}
            luminanceThreshold={0.45}
            mipmapBlur
          />
        </EffectComposer>
      )}

    </Canvas>
  );
}

export default OracleScene;