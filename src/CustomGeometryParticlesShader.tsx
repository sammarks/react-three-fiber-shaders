import { useFrame } from '@react-three/fiber'
import React from 'react'
import { AdditiveBlending, MathUtils, Points } from 'three'
import vertexShader from './shaders/vertexShader.glsl'
import fragmentShader from './shaders/fragmentShader.glsl'

export interface CustomGeometryParticlesProps {
  shape: 'box' | 'sphere'
  count: number
}
export function CustomGeometryParticlesShader({ shape, count }: CustomGeometryParticlesProps) {
  const points = React.useRef<Points>(null)
  const radius = 2

  // Create the points.
  const particlesPosition = React.useMemo(() => {
    // Create a Float32Array of count * 3 length
    // -> we are going to generate the x, y, and z values for 2000 particles
    // -> thus we need 6000 items in this array
    const positions = new Float32Array(count * 3)

    if (shape === 'box') {
      for (let i = 0; i < count; i++) {
      // Generate random values for x, y, and z on every loop.
      const x = (Math.random() - 0.5) * 2
      const y = (Math.random() - 0.5) * 2
      const z = (Math.random() - 0.5) * 2

      // We add the 3 values to the attribute array for every loop.
      positions.set([x, y, z], i * 3)
    }
    } else if (shape === 'sphere') {
      for (let i = 0; i < count; i++) {
        const distance = Math.sqrt((Math.random() - 0.5)) * radius
        const theta = MathUtils.randFloatSpread(360)
        const phi = MathUtils.randFloatSpread(360)

        const x = distance * Math.sin(theta) * Math.cos(phi)
        const y = distance * Math.sin(theta) * Math.sin(phi)
        const z = distance * Math.cos(theta)

        positions.set([x, y, z], i * 3)
      }
    }

    return positions
  }, [count, shape])

  const uniforms = React.useMemo(() => {
    return {
      uTime: { value: 0.0 },
      uRadius: { value: radius },
    }
  }, [])

  useFrame(state => {
    const { clock } = state
    points.current!.material.uniforms.uTime.value = clock.elapsedTime
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach={'attributes-position'}
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        blending={AdditiveBlending}
        depthWrite={false}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </points>
  )
}
