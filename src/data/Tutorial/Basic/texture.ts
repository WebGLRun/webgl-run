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
let a_TexCoord = gl.getAttribLocation(gl.program, 'a_TexCoord')
let u_Sampler = gl.getUniformLocation(gl.program, 'u_Sampler')

// 定义顶点坐标和纹理坐标
let count = 4
let verticesTexCoords = new Float32Array([
  -0.5,   0.5,    0.0,    1.0,
  -0.5,   -0.5,   0.0,    0.0,
  0.5,    0.5,    1.0,    1.0,
  0.5,    -0.5,   1.0,    0.0
])

// 重置背景色
gl.clearColor(1.0, 1.0, 1.0, 1.0)
gl.clear(gl.COLOR_BUFFER_BIT)

let vertexTexCoordBuffer = gl.createBuffer()
gl.bindBuffer(gl.ARRAY_BUFFER, vertexTexCoordBuffer)
gl.bufferData(gl.ARRAY_BUFFER, verticesTexCoords, gl.STATIC_DRAW)

let FSIZE = verticesTexCoords.BYTES_PER_ELEMENT

// 分别设置顶点坐标和纹理坐标
gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 4, 0)
gl.enableVertexAttribArray(a_Position)
gl.vertexAttribPointer(a_TexCoord, 2, gl.FLOAT, false, FSIZE * 4, FSIZE * 2)
gl.enableVertexAttribArray(a_TexCoord)

// 创建纹理对象
let texture = gl.createTexture()
let image = new Image()
image.addEventListener('load', () => {
  // 对纹理图像进行 y 轴反转
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  // 激活 0 号纹理单元
  gl.activeTexture(gl.TEXTURE0)
  // 绑定纹理对象
  gl.bindTexture(gl.TEXTURE_2D, texture)
  // 配置纹理对象的参数
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
  // 将纹理图像分配给纹理对象
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
  // 将 0 号纹理单元传递给片元着色器
  gl.uniform1i(u_Sampler, 0)
  gl.clear(gl.COLOR_BUFFER_BIT)
  // 画正方形
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, count)
})
image.src = '/assets/images/sample.jpg'`,
  glsl: {
    vertexShader: `// 定义 attribute 变量
attribute vec4 a_Position;
attribute vec2 a_TexCoord;
varying vec2 v_TexCoord;
void main() {
  gl_Position = a_Position;
  v_TexCoord = a_TexCoord; //将数据传递给片元着色器
}`,
    fragmentShader: `// 设置精度
precision mediump float;
// 定义 uniform 变量
uniform sampler2D u_Sampler;
varying vec2 v_TexCoord;
void main() {
  // 在片元着色器中抽取纹素颜色
  gl_FragColor = texture2D(u_Sampler, v_TexCoord);
}`
  }
}