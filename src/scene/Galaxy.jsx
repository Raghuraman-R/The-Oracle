import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Galaxy() {

  const points = useRef();

  const particles = useMemo(() => {

    const pos = [];

    for(let i=0;i<12000;i++){

      pos.push(
        (Math.random()-0.5)*900,
        Math.random()*450,
        (Math.random()-0.5)*900
      );

    }

    return new Float32Array(pos);

  },[]);

  useFrame(({clock})=>{

    points.current.rotation.y =
      clock.elapsedTime*0.002;

  });

  return(

    <points ref={points}>

      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={particles.length/3}
          array={particles}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial

        size={2.8}

        color="#ffffff"

        transparent

        opacity={1}

        sizeAttenuation

      />

    </points>

  );

}

export default Galaxy;