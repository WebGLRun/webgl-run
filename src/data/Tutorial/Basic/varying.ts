export default {
  html: `<script src="https://unpkg.com/@webglrun/wutils"></script>
<canvas id="webgl" width="400" height="400"></canvas>`,
  css: ``,
  js: `let canvas = document.getElementById('webgl')
let gl = canvas.getContext('webgl')

// 装载 shader
wutils.initProgramWithShadersSource(
  gl,
  $shaders.vertexShader,
  $shaders.fragmentShader,
)

// 取得变量并赋值
let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
let a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize')
let a_Color = gl.getAttribLocation(gl.program, 'a_Color')

// 在 Float32Array 类型化数组里交错定义三个点的位置大小颜色
let count = 3
let vertices = new Float32Array([
  0.0, 0.5, 10.0, 1.0, 0.0, 0.0,
  -0.5, -0.5, 20.0, 0.0, 1.0, 0.0,
  0.5, -0.5, 30.0, 0.0, 0.0, 1.0
])

let vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

let FSIZE = vertices.BYTES_PER_ELEMENT

// 分别设置取用位置、大小、颜色
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 6, 0)
gl.enableVertexAttribArray(a_Position)

gl.vertexAttribPointer(a_PointSize, 1, gl.FLOAT, false, FSIZE * 6, FSIZE * 2)
gl.enableVertexAttribArray(a_PointSize)

gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 6, FSIZE * 3)
gl.enableVertexAttribArray(a_Color)

// 重置背景色
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 画三角
// v_Color 变量在传入片元着色器之前经过了内插，形成渐变颜色
gl.drawArrays(gl.TRIANGLES, 0, 3)`,
  glsl: {
    vertexShader: `// 定义 attribute 变量
attribute vec4 a_Position;
attribute float a_PointSize;
attribute vec4 a_Color;
varying vec4 v_Color;
void main() {
  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
  v_Color = a_Color; //将数据传递给片元着色器
}`,
    fragmentShader: `// 设置精度
precision mediump float;
// 定义 uniform 变量
varying vec4 v_Color;
void main() {
  gl_FragColor = v_Color;
}`
  }
}