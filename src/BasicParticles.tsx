import React from 'react'
import { Points } from 'three'

export function BasicParticles() {
  const points = React.useRef<Points>(null)

  return (
    <points ref={points}>
      <sphereGeometry args={[1, 48, 48]} />
      <pointsMaterial color={'#5786F5'} size={0.015} sizeAttenuation />
    </points>
  )
}
