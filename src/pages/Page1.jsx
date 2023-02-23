import Ocean from "../components/Ocean";
import { OrbitControls, Text, useScroll, Center, ScrollControls } from "@react-three/drei";
import { useRef } from "react";


export default function Page1({ position, rotation }) {
    const title1 = useRef();
    const title2 = useRef();
    
    return (
        <group position={position} rotation={rotation}>
            <Ocean rotation={[0, 0, 0]} position={[0, 0, -0.01]} />

            <Text
                ref={title1}
                position={[0, 0, 0]}
                scale={1.1}
                color='white'
            >
                SuperFluity Labs
            </Text>
            <Text
                ref={title2}
                position={[0, -1, 0]}
                color='white'
                scale={0.3}
            // outlineBlur
            >
                A Software Product Accelerator Company
            </Text>
        </group>
    )
}