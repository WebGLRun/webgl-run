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

// 取得变量并赋值
let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
let a_Color = gl.getAttribLocation(gl.program, 'a_Color')
let u_ViewMatrix = gl.getUniformLocation(gl.program, 'u_ViewMatrix')

// 在 Float32Array 类型化数组里定义三个点的位置
let count = 9
let vertices = new Float32Array([
  0.0, 0.5, -0.4, 1.0, 0.0, 0.0,
  -0.5, -0.5, -0.4, 1.0, 0.0, 0.0,
  0.5, -0.5, -0.4, 1.0, 0.0, 0.0,
  0.0, -0.5, -0.2, 0.0, 1.0, 0.0,
  -0.5, 0.5, -0.2, 0.0, 1.0, 0.0,
  0.5, 0.5, -0.2, 0.0, 1.0, 0.0,
  0.0, 0.5, 0.0, 0.0, 0.0, 1.0,
  -0.5, -0.5, 0.0, 0.0, 0.0, 1.0,
  0.5, -0.5, 0.0, 0.0, 0.0, 1.0
])

// webgl 中的矩阵是列存储，即 viewMatrix4 数组的前 4 个参数为第一列
let viewMatrix4 = new v3.Matrix4x3(
  1.0, 0.0, 0.0,
  0.0, 1.0, 0.0,
  0.0, 0.0, 1.0,
  0.0, 0.0, 0.0
)

// 根据摄像机参数构建摄像机矩阵
// 提供参数：视点 eye，观察目标点 center, 上方向 up

let eye = new v3.Vector3(0.2, 0, 0.2)
let center = new v3.Vector3(0.1, 0, 0)
let up = new v3.Vector3(0, 1, 0)

// 构建新坐标轴
// z轴 = eye - center
let z = v3.Vector3.plus(eye, v3.Vector3.negate(center))
z.normalize()
let y = up
y.normalize()
let x = v3.Vector3.crossProduct(z, y)
x.normalize()

// 由于两个坐标轴原点不同，计算平移
let tx = v3.Vector3.dotProduct(v3.Vector3.negate(x), eye)
let ty = v3.Vector3.dotProduct(v3.Vector3.negate(y), eye)
let tz = v3.Vector3.dotProduct(v3.Vector3.negate(z), eye)

// 构建变换矩阵，将向量从世界坐标系转换到摄像机坐标系
let viewMatrix4x3 = new v3.Matrix4x3(
  ...x,
  ...y,
  ...z,
  tx, ty, tz
)

console.log(viewMatrix4x3)

gl.uniformMatrix4fv(u_ViewMatrix, false, viewMatrix4x3.getMat4FloatArray())

let vertexBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

let FZIE = vertices.BYTES_PER_ELEMENT

gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, FZIE * 6, 0)
gl.enableVertexAttribArray(a_Position)

gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FZIE * 6, FZIE * 3)
gl.enableVertexAttribArray(a_Color)

// 重置背景色
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

// 画三角
gl.drawArrays(gl.TRIANGLES, 0, count)`,
  glsl: {
    vertexShader: `// 定义 attribute 变量
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_ViewMatrix;
varying vec4 v_Color;
void main() {
  gl_Position = u_ViewMatrix * a_Position;
  v_Color = a_Color;
}`,
    fragmentShader: `precision mediump float;
varying vec4 v_Color;
void main() {
  gl_FragColor = v_Color;
}`
  }
}