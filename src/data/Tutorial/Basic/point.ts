export default {
  html: `<canvas id="webgl" width="400" height="400"></canvas>`,
  css: ``,
  js: `let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// 创建 shader
let vertexShader = gl.createShader(gl.VERTEX_SHADER)
let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

// 编译 shader
gl.shaderSource(vertexShader, window.$shaders.vertexShader)
gl.shaderSource(fragmentShader, window.$shaders.fragmentShader)
gl.compileShader(vertexShader)
gl.compileShader(fragmentShader)

// 创建 program
let program = gl.createProgram()

// Attach shader
gl.attachShader(program, vertexShader)
gl.attachShader(program, fragmentShader)

// 关联 progtam
gl.linkProgram(program)
gl.useProgram(program)

// 重置背景色
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 画点
gl.drawArrays(gl.POINTS, 0, 1)`,
  glsl: {
    vertexShader: `void main() {
  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);
  gl_PointSize = 10.0;
}`,
    fragmentShader: `void main() {
  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
}`
  }
}