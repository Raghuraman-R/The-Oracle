import { Billboard, useTexture } from "@react-three/drei";

function Moon() {
  const texture = useTexture("/textures/moon.png");

  return (
    <Billboard
      position={[0, 65, -500]}
      follow
    >
      <mesh>
        <planeGeometry args={[120, 120]} />

        <meshBasicMaterial
          map={texture}
          transparent
          toneMapped={false}
          depthWrite={false}
          opacity={1}
        />
      </mesh>
    </Billboard>
  );
}

export default Moon;