import { useThree, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function CameraRig({ onFinish }) {

  const { camera } = useThree();

  const progress = useRef(0);
  const finished = useRef(false);

  const isMobile = window.innerWidth < 768;

  useLayoutEffect(() => {

    if (isMobile) {

      // Mobile starts farther away
      camera.position.set(0, 78, -360);
      camera.lookAt(0, 72, -350);

    } else {

      camera.position.set(0, 54, -185);
      camera.lookAt(0, 55, -220);

    }

  }, [camera, isMobile]);

  const curve = useMemo(() => {

    if (isMobile) {

      return new THREE.CatmullRomCurve3([

        // Moon cinematic shot
        new THREE.Vector3(0, 78, -360),

        // Slow pull
        new THREE.Vector3(0, 72, -300),

        // Temple reveal
        new THREE.Vector3(0, 55, -200),

        // Wider temple
        new THREE.Vector3(0, 35, -80),

        // Final shot
        new THREE.Vector3(0, 12, 55),

      ]);

    }

    return new THREE.CatmullRomCurve3([

      new THREE.Vector3(0, 54, -185),
      new THREE.Vector3(0, 45, -120),
      new THREE.Vector3(0, 28, -50),
      new THREE.Vector3(0, 8, 30),

    ]);

  }, [isMobile]);

  useFrame((state, delta) => {

    if (finished.current) return;

    // Hold longer on the moon
    if (state.clock.elapsedTime > 2) {

      progress.current += delta * 0.085;

    }

    if (progress.current >= 1) {

      progress.current = 1;
      finished.current = true;

      onFinish?.();

      return;

    }

    camera.position.copy(curve.getPoint(progress.current));

    const moonTarget = isMobile
      ? new THREE.Vector3(0, 72, -350)
      : new THREE.Vector3(0, 55, -220);

    const templeTarget = new THREE.Vector3(0, 6, 0);

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