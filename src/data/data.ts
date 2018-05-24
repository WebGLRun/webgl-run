import point from './Tutorial/Basic/point'
import param from './Tutorial/Basic/param'
import event from './Tutorial/Basic/event'
import buffer from './Tutorial/Basic/buffer'
import triangles from './Tutorial/Basic/triangles'
import translation from './Tutorial/Basic/translation'
import composedMatrix from './Tutorial/Basic/composeMatrix'
import rotateAnimate from './Tutorial/Basic/rotateAnimate'
import multiAttribute from './Tutorial/Basic/multiAttribute'
import varying from './Tutorial/Basic/varying'
import texture from './Tutorial/Basic/texture'
import camera from './Tutorial/Basic/camera'
import butterfly from './Collections/Demos/butterfly'

export default [{
  title: 'Tutorial',
  type: 'submenu',
  children: [{
    title: 'ch02',
    type: 'group',
    children: [{
      title: '绘制一个点',
      type: 'item',
      content: {
        editor: {
          htmlEditor: {
            content: point.html
          },
          cssEditor: {
            content: point.css
          },
          jsEditor: {
            content: point.js
          },
          glslEditor: {
            fragmentShader: {
              content: point.glsl.fragmentShader
            },
            vertexShader: {
              content: point.glsl.vertexShader
            }
          }
        },
        result: ''
      },
      creator: {
        id: 1,
        nickName: 'Anonymous'
      }
    }]
  }]
}]

// export default [{
//   title: 'Tutorial',
//   type: 'submenu',
//   children: [{
//     title: 'ch02',
//     type: 'group',
//     children: [{
//       title: '绘制一个点',
//       type: 'item',
//       content: point,
//       result: ''
//     }, {
//       title: '变量传递',
//       type: 'item',
//       content: param,
//       result: ''
//     }, {
//       title: '事件交互',
//       type: 'item',
//       content: event,
//       result: ''
//     }]
//   }, {
//     title: 'ch03',
//     type: 'group',
//     children: [{
//       title: '使用缓冲区',
//       type: 'item',
//       content: buffer,
//       result: ''
//     }, {
//       title: '三角形',
//       type: 'item',
//       content: triangles,
//       result: ''
//     }, {
//       title: '平移',
//       type: 'item',
//       content: translation,
//       result: ''
//     }, {
//       title: '连接变换矩阵',
//       type: 'item',
//       content: composedMatrix,
//       result: ''
//     }, {
//       title: '旋转动画',
//       type: 'item',
//       content: rotateAnimate,
//       result: ''
//     }]
//   }, {
//     title: 'ch05',
//     type: 'group',
//     children: [{
//       title: '交错使用缓冲区',
//       type: 'item',
//       content: multiAttribute,
//       result: ''
//     }, {
//       title: 'varying 变量与内插',
//       type: 'item',
//       content: varying,
//       result: ''
//     }, {
//       title: '纹理',
//       type: 'item',
//       content: texture,
//       result: ''
//     }]
//   }, {
//     title: 'ch06',
//     type: 'group',
//     children: [{
//       title: '摄像机坐标系',
//       type: 'item',
//       content: camera,
//       result: ''
//     }]
//   }]
// }, {
//   title: 'Collections',
//   type: 'submenu',
//   children: [{
//     title: 'Demos',
//     type: 'group',
//     children: [{
//       title: 'Butterfly',
//       type: 'item',
//       content: butterfly,
//       result: ''
//     }]
//   }]
// }]