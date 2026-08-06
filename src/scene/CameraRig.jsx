import { useThree, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function CameraRig({ onFinish }) {

  const { camera } = useThree();

  const progress = useRef(0);
  const finished = useRef(false);

  useLayoutEffect(() => {

    // Initial cinematic moon shot
    camera.position.set(0, 54, -185);
    camera.lookAt(0, 55, -220);

  }, [camera]);

  // Same animation for Desktop & Mobile
  const curve = useMemo(() => {

    return new THREE.CatmullRomCurve3([

      // Moon
      new THREE.Vector3(0, 54, -185),

      // Pull back
      new THREE.Vector3(0, 45, -120),

      // Temple reveal
      new THREE.Vector3(0, 28, -50),

      // Final entrance
      new THREE.Vector3(0, 8, 30),

    ]);

  }, []);

  useFrame((state, delta) => {

    if (finished.current) return;

    // Hold the moon shot for a moment
    if (state.clock.elapsedTime > 1.5) {
      progress.current += delta * 0.12;
    }

    if (progress.current >= 1) {

      progress.current = 1;
      finished.current = true;

      onFinish?.();

      return;

    }

    // Move camera
    camera.position.copy(curve.getPoint(progress.current));

    // Smoothly change focus from moon to temple
    const moonTarget = new THREE.Vector3(0, 55, -220);
    const templeTarget = new THREE.Vector3(0, 5, 0);

    const target = new THREE.Vector3();
    target.lerpVectors(
      moonTarget,
      templeTarget,
      progress.current
    );

    camera.lookAt(target);

  });

  return null;

}

export default CameraRig;