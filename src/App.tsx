import React from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { CustomGeometryParticles } from './CustomGeometryParticles'
import './scene.css'
import { CustomGeometryParticlesShader } from './CustomGeometryParticlesShader'
import { FBOParticles } from './FBOParticles'

export function Scene() {
  return (
    <Canvas camera={{ position: [1.5, 1.5, 1.5] }}>
      <ambientLight intensity={0.5} />
      {/* <directionalLight position={[-1, 2, 2]} intensity={4} /> */}
      {/* <CustomGeometryParticles shape={'sphere'} count={2000} /> */}
      {/* <CustomGeometryParticlesShader shape={'sphere'} count={4000} /> */}
      <FBOParticles />
      <OrbitControls autoRotate />
    </Canvas>
  )
}

export default function App() {
  return <Scene />
}
