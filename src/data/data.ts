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
      content: point
    }, {
      title: '变量传递',
      type: 'item',
      content: param
    }, {
      title: '事件交互',
      type: 'item',
      content: event
    }]
  }, {
    title: 'ch03',
    type: 'group',
    children: [{
      title: '使用缓冲区',
      type: 'item',
      content: buffer
    }, {
      title: '三角形',
      type: 'item',
      content: triangles
    }, {
      title: '平移',
      type: 'item',
      content: translation
    }, {
      title: '连接变换矩阵',
      type: 'item',
      content: composedMatrix
    }, {
      title: '旋转动画',
      type: 'item',
      content: rotateAnimate
    }]
  }, {
    title: 'ch05',
    type: 'group',
    children: [{
      title: '交错使用缓冲区',
      type: 'item',
      content: multiAttribute
    }, {
      title: 'varying 变量与内插',
      type: 'item',
      content: varying
    }]
  }]
}, {
  title: 'Collections',
  type: 'submenu',
  children: [{
    title: 'Demos',
    type: 'group',
    children: [{
      title: 'Butterfly',
      type: 'item',
      content: butterfly
    }]
  }]
}]