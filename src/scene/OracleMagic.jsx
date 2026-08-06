import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const COUNT = 550;

export default function OracleMagic() {
  const points = useRef();

  const particles = useMemo(() => {
    return Array.from({ length: COUNT }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: Math.random() * 3.2,
      height: Math.random() * 5,
      speed: 0.008 + Math.random() * 0.006,
      rise: 0.015 + Math.random() * 0.02,
    }));
  }, []);

  const positions = useMemo(() => {
    return new Float32Array(COUNT * 3);
  }, []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;

    particles.forEach((p, i) => {

      p.angle += p.speed;

      p.height += p.rise;

      if (p.height > 9) {
        p.height = 0;
        p.radius = Math.random() * 3.2;
        p.angle = Math.random() * Math.PI * 2;
      }

      const swirl = p.radius + Math.sin(t * 2 + i) * 0.15;

      positions[i * 3] =
        Math.cos(p.angle) * swirl;

      positions[i * 3 + 1] =
        p.height;

      positions[i * 3 + 2] =
        Math.sin(p.angle) * swirl;

    });

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group position={[0, 0.15, 0]}>

      {/* Rising magical particles */}
      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={COUNT}
            itemSize={3}
          />
        </bufferGeometry>

        <pointsMaterial
          color="#FFE59A"
          size={0.18}
          transparent
          opacity={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>

      {/* Magic circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.8, 3.1, 128]} />
        <meshBasicMaterial
          color="#FFD86A"
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Inner glow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[2.7, 128]} />
        <meshBasicMaterial
          color="#FFE7A5"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

    </group>
  );
}