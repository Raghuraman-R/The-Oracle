import { useThree, useFrame } from "@react-three/fiber";
import { useLayoutEffect, useRef } from "react";
import * as THREE from "three";

function CameraRig({ onFinish }) {

  const { camera } = useThree();

  const progress = useRef(0);
  const finished = useRef(false);

  const isMobile = window.innerWidth < 768;

  useLayoutEffect(() => {

    if (isMobile) {

      camera.position.set(0, 70, -320);
      camera.lookAt(0, 65, -320);

    } else {

      camera.position.set(0, 54, -185);
      camera.lookAt(0, 55, -220);

    }

  }, [camera, isMobile]);

  const curve = new THREE.CatmullRomCurve3(

    isMobile
      ? [
          new THREE.Vector3(0, 70, -320),
          new THREE.Vector3(0, 60, -230),
          new THREE.Vector3(0, 40, -120),
          new THREE.Vector3(0, 12, 60),
        ]
      : [
          new THREE.Vector3(0, 54, -185),
          new THREE.Vector3(0, 45, -120),
          new THREE.Vector3(0, 28, -50),
          new THREE.Vector3(0, 8, 30),
        ]

  );

  useFrame((state, delta) => {

    if (finished.current) return;

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

    const moonTarget = isMobile
      ? new THREE.Vector3(0, 65, -320)
      : new THREE.Vector3(0, 55, -220);

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