import { useGLTF, useTexture } from "@react-three/drei";
import { useEffect } from "react";
import * as THREE from "three";

function Temple() {
  const { scene } = useGLTF("/models/temple.glb");

  const maps = useTexture({
    map: "/textures/stone/color.jpg",
    normalMap: "/textures/stone/normal.jpg",
    roughnessMap: "/textures/stone/roughness.jpg",
    aoMap: "/textures/stone/ao.jpg",
    displacementMap: "/textures/stone/height.jpg",
  });

  useEffect(() => {
    maps.map.colorSpace = THREE.SRGBColorSpace;

    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        child.material.map = maps.map;
        child.material.normalMap = maps.normalMap;
        child.material.roughnessMap = maps.roughnessMap;
        child.material.aoMap = maps.aoMap;
        child.material.displacementMap = maps.displacementMap;

        child.material.displacementScale = 0.015;
        child.material.normalScale = new THREE.Vector2(2.5, 2.5);

        child.material.roughness = 0.95;
        child.material.metalness = 0;

        child.material.envMapIntensity = 0.35;

        child.material.needsUpdate = true;
      }
    });
  }, [scene, maps]);

  return (
    <primitive
      object={scene}
      scale={2}
      position={[0, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
}

export default Temple;