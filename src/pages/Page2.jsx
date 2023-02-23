import MagicMirror from "../components/MagicMirror";
import { Environment, useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export default function Page2({position, rotation}) {
    const {scene} = useGLTF('./city/scene.gltf');
    const city = useRef();

    useFrame((state, delta) => {
        city.current.rotation.y += delta * 0.08;
    });

    return (
        <group position={position} rotation={rotation}> 
            <MagicMirror>
                <Environment preset="city" />
                <primitive ref={city} object={scene} scale={2.5} rotation={[0.3, 0, 0]} />
            </MagicMirror>
        </group>
    );
}