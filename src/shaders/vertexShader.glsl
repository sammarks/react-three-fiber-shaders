uniform float uTime;
uniform float uRadius;

varying float vDistance;

#include ../../node_modules/glsl-rotate/rotation-3d-y

void main() {
  // Items closer to the center rotate faster.
  float distanceFactor = pow(uRadius - distance(position, vec3(0.0)), 2.0);
  // Items closer to the center are larger.
  float size = distanceFactor * 10.0 + 10.0;
  vec3 particlePosition = position * rotation3dY(uTime * 0.2 * distanceFactor);

  // This is how we pass information to the fragment shader.
  vDistance = distanceFactor;

  vec4 modelPosition = modelMatrix * vec4(particlePosition, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  gl_PointSize = size;

  // Size attenuation
  gl_PointSize *= (1.0 / - viewPosition.z);
}
