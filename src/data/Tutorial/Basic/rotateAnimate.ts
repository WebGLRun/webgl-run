export default {
  html: `<script src="https://unpkg.com/@webglrun/wutils"></script>
<script src="https://unpkg.com/v3js"></script>
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

// 重置背景色
gl.clearColor(1.0, 1.0, 1.0, 1.0)

// 取得变量并赋值
let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
let u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor')
gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0)

// 在 Float32Array 类型化数组里定义三个点的位置
let count = 3
let a = new v3.Vector3(0, 0.5, 0)
let b = new v3.Vector3(-0.5, -0.5, 0)
let c = new v3.Vector3(0.5, -0.5, 0)

let vertices = new Float32Array(
  [...a, ...b, ...c]
)

let vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
gl.enableVertexAttribArray(a_Position)

// 旋转角度
let theta = Math.PI / 2

// 旋转转换矩阵
let rotationMatrix = new v3.RotationMatrix()

function render() {
  theta += Math.PI / 360
  rotationMatrix.setupRotateFromXYZAxis('z', theta)
  // 获得变换后三个点位置
  let newA = v3.Matrix4x3.vector3Multiply(a, rotationMatrix)
  let newB = v3.Matrix4x3.vector3Multiply(b, rotationMatrix)
  let newC = v3.Matrix4x3.vector3Multiply(c, rotationMatrix)

  let newVertices = new Float32Array(
    [...newA, ...newB, ...newC]
  )

  gl.clear(gl.COLOR_BUFFER_BIT)

  gl.bufferData(gl.ARRAY_BUFFER, newVertices, gl.STATIC_DRAW)

  // 画三角
  gl.drawArrays(gl.TRIANGLES, 0, count)
  window.requestAnimationFrame(render)
}

window.requestAnimationFrame(render)`,
  glsl: {
    vertexShader: `/// 定义 attribute 变量
attribute vec4 a_Position;
void main() {
  gl_Position = a_Position;
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