import { extend } from '@react-three/fiber'
import { DataTexture, FloatType, RGBAFormat, ShaderMaterial, MathUtils } from 'three'

import simulationVertexShader from './shaders/simulationVertexShader.glsl'
import simulationFragmentShader from './shaders/simulationFragmentShader.glsl'

const generatePositions = (width: number, height: number) => {
  // we need to create a vec4 since we're passing the positions to the fragment shader
  // data textures need to have 4 components: R, G, B and A
  const length = width * height * 4
  const data = new Float32Array(length)

  // Replace this with another implementation...
  for (let i = 0; i < length; i++) {
    const stride = i * 4

    const distance = Math.sqrt((Math.random() - 0.5)) * 2.0
    const theta = MathUtils.randFloatSpread(360)
    const phi = MathUtils.randFloatSpread(360)

    data[stride] = distance * Math.sin(theta) * Math.cos(phi)
    data[stride + 1] = distance * Math.sin(theta) * Math.sin(phi)
    data[stride + 2] = distance * Math.cos(theta)
    data[stride + 3] = 1.0 // This value will not have any impact.
  }

  return data
}

class SimulationMaterial extends ShaderMaterial {
  constructor(size) {
    // Create a data texture with our positions data
    const positionsTexture = new DataTexture(
      generatePositions(size, size),
      size,
      size,
      RGBAFormat,
      FloatType,
    )
    positionsTexture.needsUpdate = true

    const simulationUniforms = {
      // Pass the positions data texture as a uniform
      positions: { value: positionsTexture },
      uFrequency: { value: 0.25 },
      uTime: { value: 0 },
    }

    super({
      uniforms: simulationUniforms,
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    })
  }
}

// Make the simulation material available as a JSX element in our canvas
extend({ SimulationMaterial })
