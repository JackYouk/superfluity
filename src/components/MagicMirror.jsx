import { useFrame, createPortal } from '@react-three/fiber'
import { useFBO, PerspectiveCamera } from '@react-three/drei'
import * as THREE from 'three'
import { useState, useRef } from 'react'

export default function MagicMirror({ children, ...props }) {
    const cam = useRef()
    // useFBO creates a WebGL2 buffer for us, it's a helper from the "drei" library
    const fbo = useFBO()
    // The is a separate scene that we create, React will portal into that
    const [scene] = useState(() => new THREE.Scene())
    // Tie this component into the render-loop
    useFrame((state) => {
      // Our portal has its own camera, but we copy the originals world matrix
      cam.current.matrixWorldInverse.copy(state.camera.matrixWorldInverse)
      // Then we set the render-target to the buffer that we have created
      state.gl.setRenderTarget(fbo)
      // We render the scene into it, using the local camera that is clamped to the planes aspect ratio
      state.gl.render(scene, cam.current)
      // And flip the render-target to the default again
      state.gl.setRenderTarget(null)
    })
    return (
      <>
        <mesh {...props}>
          <planeGeometry args={[10, 10]} />
          {/* The "mirror" is just a boring plane, but it receives the buffer texture */}
          <meshBasicMaterial map={fbo.texture} />
        </mesh>
        <PerspectiveCamera manual ref={cam} fov={50} aspect={10 / 10} onUpdate={(c) => c.updateProjectionMatrix()} />
        {/* This is React being awesome, we portal this components children into the separate scene above */}
        {createPortal(children, scene)}
      </>
    )
  }