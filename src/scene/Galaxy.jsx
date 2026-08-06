import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Galaxy() {

  const points = useRef();

  // Detect mobile
  const isMobile = window.innerWidth < 768;

  // Adaptive particle count
  const STAR_COUNT = isMobile ? 2500 : 12000;

  const particles = useMemo(() => {

    const pos = [];

    for (let i = 0; i < STAR_COUNT; i++) {

      pos.push(
        (Math.random() - 0.5) * 900,
        Math.random() * 450,
        (Math.random() - 0.5) * 900
      );

    }

    return new Float32Array(pos);

  }, [STAR_COUNT]);

  useFrame(({ clock }) => {

    if (points.current) {
      points.current.rotation.y = clock.elapsedTime * 0.002;
    }

  });

  return (

    <points ref={points}>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial
        size={isMobile ? 1.4 : 2.8}
        color="#ffffff"
        transparent
        opacity={1}
        sizeAttenuation
      />

    </points>

  );

}

export default Galaxy;