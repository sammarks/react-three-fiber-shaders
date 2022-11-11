import { useFrame } from '@react-three/fiber'
import React from 'react'
import { MathUtils, Points } from 'three'

export interface CustomGeometryParticlesProps {
  shape: 'box' | 'sphere'
  count: number
}
export function CustomGeometryParticles({ shape, count }: CustomGeometryParticlesProps) {
  const points = React.useRef<Points>(null)

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
      const distance = 1
      for (let i = 0; i < count; i++) {
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

  // Animate the points.
  useFrame(state => {
    const { clock } = state
    if (!points.current) return
    for (let i = 0; i < count; i++) {
      const i3 = i * 3

      points.current.geometry.attributes.position.array[i3] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01
      points.current.geometry.attributes.position.array[i3 + 1] += Math.cos(clock.elapsedTime + Math.random() * 10) * 0.01
      points.current.geometry.attributes.position.array[i3 + 2] += Math.sin(clock.elapsedTime + Math.random() * 10) * 0.01
    }

    points.current.geometry.attributes.position.needsUpdate = true
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
      <pointsMaterial
        size={0.015}
        color={'#5786F5'}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  )
}
