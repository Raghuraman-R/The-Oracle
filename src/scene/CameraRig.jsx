import { useThree, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

function CameraRig({ onFinish }) {
  const { camera } = useThree();

  const progress = useRef(0);
  const finished = useRef(false);

  useLayoutEffect(() => {
    // Initial moon shot
    camera.position.set(0, 54, -185);
    camera.lookAt(0, 55, -220);
  }, [camera]);

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, 54, -185), // Moon
    new THREE.Vector3(0, 45, -120), // Pull back
    new THREE.Vector3(0, 28, -50),  // Temple reveal
    new THREE.Vector3(0, 8, 30),    // Temple entrance
  ]);

  useFrame((state, delta) => {
    // Stop controlling the camera once the intro finishes
    if (finished.current) return;

    // Hold on the moon for 1.5 seconds
    if (state.clock.elapsedTime > 1.5) {
      progress.current += delta * 0.12;
    }

    if (progress.current >= 1) {
      progress.current = 1;
      finished.current = true;

      if (onFinish) {
        onFinish();
      }

      return;
    }

    camera.position.copy(curve.getPoint(progress.current));

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