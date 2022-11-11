import React from 'react'
import { Mesh, Quaternion, Vector3 } from 'three'

export function TwistedBox() {
  const mesh = React.useRef<Mesh>(null)
  const quaternion = new Quaternion()

  React.useEffect(() => {
    // Get the current attributes of the geometry.
    const currentPositions = mesh.current?.geometry.attributes.position
    // Copy the attributes
    const originalPositions = currentPositions?.clone()
    const originalPositionsArray = originalPositions?.array || []

    // Go through each vector (series of 3 values) and modify the values
    for (let i = 0; i < originalPositionsArray.length; i=i+3) {
      const modifiedPositionVector = new Vector3(originalPositionsArray[i], originalPositionsArray[i + 1], originalPositionsArray[i + 2])
      const upVector = new Vector3(0, 1, 0)

      // Rotate along the y axis (0, 1, 0)
      // The higher along the Y axis the vertex is, the more we rotate.
      quaternion.setFromAxisAngle(upVector, (Math.PI / 180) * (modifiedPositionVector.y + 10) * 100)
      modifiedPositionVector.applyQuaternion(quaternion)

      // Apply the modified position vector coordinates to the current position attributes array
      // @ts-ignore TS doesn't like updating the coordinates like this
      currentPositions.array[i] = modifiedPositionVector.x
      // @ts-ignore
      currentPositions.array[i + 1] = modifiedPositionVector.y
      // @ts-ignore
      currentPositions.array[i + 2] = modifiedPositionVector.z
    }

    if (currentPositions) {
      currentPositions.needsUpdate = true
    }
  }, [])

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1, 10, 10, 10]} />
      <meshLambertMaterial color={'hotpink'} emissive={'hotpink'} />
    </mesh>
  )
}
