import { useThree, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function CameraRig({ onFinish }) {

  const { camera } = useThree();

  const progress = useRef(0);
  const finished = useRef(false);

  useLayoutEffect(() => {

    // Same cinematic start for desktop and mobile
    camera.position.set(0, 54, -185);
    camera.lookAt(0, 55, -220);

  }, [camera]);

  const curve = useMemo(() => {

    return new THREE.CatmullRomCurve3([

      // Moon shot
      new THREE.Vector3(0, 54, -185),

      // Slow pull
      new THREE.Vector3(0, 45, -120),

      // Temple reveal
      new THREE.Vector3(0, 28, -50),

      // Temple entrance
      new THREE.Vector3(0, 8, 30),

    ]);

  }, []);

  useFrame((state, delta) => {

    if (finished.current) return;

    // Hold on the moon
    if (state.clock.elapsedTime > 1.5) {

      progress.current += delta * 0.12;

    }

    if (progress.current >= 1) {

      progress.current = 1;
      finished.current = true;

      onFinish?.();

      return;

    }

    camera.position.copy(curve.getPoint(progress.current));

    const moonTarget = new THREE.Vector3(
      0,
      55,
      -220
    );

    const templeTarget = new THREE.Vector3(
      0,
      5,
      0
    );

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