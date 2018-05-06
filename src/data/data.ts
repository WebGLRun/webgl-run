import point from './Tutorial/Basic/point'
import param from './Tutorial/Basic/param'
import event from './Tutorial/Basic/event'
import butterfly from './Collections/Demos/butterfly'

export default [{
  title: 'Tutorial',
  type: 'submenu',
  children: [{
    title: 'Basic',
    type: 'group',
    children: [{
      title: 'ch02.绘制一个点',
      type: 'item',
      content: point
    }, {
      title: 'ch02.变量传递',
      type: 'item',
      content: param
    }, {
      title: 'ch02.事件交互',
      type: 'item',
      content: event
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