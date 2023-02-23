import { OrbitControls, Text, useScroll, Center, ScrollControls, PresentationControls } from "@react-three/drei";
import { useRef, useState } from "react";
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import * as THREE from 'three';
import { useFrame } from "@react-three/fiber";
import { easing } from 'maath'
import gsap from "gsap";
import Page1 from "./pages/Page1"
import Page2 from './pages/Page2'
import { Perf } from 'r3f-perf'


export default function App() {

  const box = useRef();

  const [page, setPage] = useState(0);

  useFrame((state, delta) => {
    gsap.to(state.camera.position, 4, { z: 30 });
    // gsap.to(box.current.rotation, 3, { y: Math.PI * 2 });

    if (page === 0) {
      gsap
        .to(box.current.rotation, 3, { y: 0 })
    }
    if (page === 1) {
      gsap
        .to(box.current.rotation, 3, { y: -Math.PI / 2 })
    }
    if (page === 2) {
      gsap
        .to(box.current.rotation, 3, { y: -Math.PI})
    }
    if (page === 3) {
      gsap
        .to(box.current.rotation, 3, { y: -Math.PI * 1.5 })
    }
  })

  const rotateCube = () => {
    box.current.rotation.y += Math.PI / 2;
  }

  return (
    <>
      <Perf />
      <color args={['#000000']} attach='background' />
      {/* <PresentationControls
        global
        polar={[-0.4, 0.2]}
        azimuth={[-1, 0.75]}
        config={{ mass: 2, tension: 400 }}
        snap={{ mass: 2, tension: 400 }}
      > */}
        <group ref={box} position={[0, 0, -3]} onClick={() => setPage(page === 3 ? 0 : page + 1)}>
          <Page1 position={[0, 0, 5.4]}  />
          <Page2 position={[5.4, 0, 0]} rotation={[0, Math.PI / 2, 0]} onClick={() => setPage(2)} />

          <mesh scale={[10.5, 10.5, 10.5]} position={[0, 0, 0]}>
            <boxGeometry />
            <meshStandardMaterial
              toneMapped={false}
              // color={[1.5, 1, 4]} 
              color='white'
              emissive='white'
              emissiveIntensity={0.2}
            />
          </mesh>
        </group>
      {/* </PresentationControls> */}

      <EffectComposer>
        <Bloom mipmapBlur />
      </EffectComposer>



      <ambientLight />


    </>
  );
}