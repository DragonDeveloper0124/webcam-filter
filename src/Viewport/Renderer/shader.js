export default {
  vert: `
    varying vec2 vUv;
    uniform sampler2D dispTex;
    uniform float dispAmt;
    void main() {
      vUv = uv;
      vec4 col = texture2D(dispTex, uv);
      float amt = sqrt(col.x * col.x + col.y * col.y + col.z * col.z);
      vec3 disp = vec3(0, 0, amt * dispAmt);
      gl_Position = projectionMatrix *
        modelViewMatrix *
        vec4(position + disp, 1.0);
    }
  `,
  frag: `
    varying vec2 vUv;
    uniform sampler2D colorTex;
    void main() {
      gl_FragColor = texture2D(colorTex, vUv);
    }
  `
}
