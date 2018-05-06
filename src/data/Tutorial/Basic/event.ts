export default {
  html: `<script src="https://unpkg.com/@webglrun/wutils"></script>
<canvas id="webgl" width="400" height="400"></canvas>`,
  css: ``,
  js: `// 鼠标点击绘制点
let canvas = document.getElementById('webgl')
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
let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
gl.vertexAttrib1f(a_PointSize, 15.0)

// 重置背景色
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

let g_points = []

let canvasWidth = 400
let canvasHeight = 400

// 注册 mousedown 事件
canvas.addEventListener('mousedown', (e) => {
  let x = (e.clientX - canvasWidth / 2) / (canvasWidth / 2)
  let y = - (e.clientY - canvasHeight / 2) / (canvasHeight / 2)
  let color = [Math.random(), Math.random(), Math.random(), 1.0] // 随机颜色
  g_points.push({x, y, color})

  // 重置背景色
  gl.clearColor(1.0, 1.0, 1.0, 1.0)
  gl.clear(gl.COLOR_BUFFER_BIT)

  g_points.forEach(e => {
    gl.vertexAttrib3f(a_Position, e.x, e.y, 0.0)
    gl.uniform4f(u_FragColor, ...e.color)
    // 画点
    gl.drawArrays(gl.POINTS, 0, 1)
  })
})`,
  glsl: {
    vertexShader: `// 定义 attribute 变量
attribute vec4 a_Position;
attribute float a_PointSize;
void main() {
  gl_Position = a_Position;
  gl_PointSize = a_PointSize;
}`,
    fragmentShader: `// 设置精度
precision mediump float;
// 定义 uniform 变量
uniform vec4 u_FragColor;
void main() {
  gl_FragColor = u_FragColor;
}`
  }
}