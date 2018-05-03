import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {setGLSL, updateResult} from '../../store/actions'
const debounce = require('lodash.debounce')
import './GLSLEditor.scss'

interface GLSLEditorProps {
  name: string,
  content: string,
  setGLSL: Function,
  updateResult: Function
}

interface GLSLEditorStates {
  editor: any,
  timer: number
}

const mapStateToProps = (state: RootState, ownProps: any) => {
  return {
    content: state.editor.glslEditor[ownProps.name].content
  }
}

const mapDispatchToProps = (dispatch: Dispatch, ownProps: any) => {
  return {
    setGLSL(glsl: string) {
      dispatch(setGLSL({
        name: ownProps.name,
        glsl
      }))
    },
    updateResult() {
      dispatch(updateResult())
    }
  }
}

class GLSLEditor extends React.Component<GLSLEditorProps> {

  constructor(props: GLSLEditorProps) {
    super(props)
  }

  state: GLSLEditorStates = {
    editor: null,
    timer: 0
  }

  render() {
    return (
      <div className="glsleditor-container editor-item">
        <header>GLSL({this.props.name})</header>
        <div id={'glsleditor-' + this.props.name} className="glsleditor-hook"></div>
      </div>
    )
  }

  componentDidMount() {
    this.state.timer = window.setInterval(() => {
      if((window as any).monaco) {
        window.clearInterval(this.state.timer)
        this.state.editor = (window as any).monaco.editor.create(document.getElementById('glsleditor-' + this.props.name) as HTMLElement, {
          value: this.props.content,
          language: 'c',
          theme: 'vs-dark',
          minimap: {
            enabled: false
          },
          automaticLayout: true
        })
        setTimeout(() => {
          (window as any)['emmet-monaco'].enableEmmet(this.state.editor, (window as any).emmet)
        }, 0)
        this.state.editor.onDidChangeModelContent(this.modelDidChangeHandler)
        this.state.editor.addCommand([(window as any).monaco.KeyMod.Shift | (window as any).monaco.KeyMod.CtrlCmd | (window as any).monaco.KeyCode.KEY_P], () => {
          this.state.editor.trigger('anyString', 'editor.action.quickCommand')
        })
      }
    }, 200)
  }

  modelDidChangeHandler = () => {
    if(this.props.content !== this.state.editor.getValue()) {
      console.log('set!')
      this.setGLSL()
    }
  }

  setGLSL = debounce(() => {
    console.log('dispatch!!')
    this.props.setGLSL(this.state.editor.getValue())
    this.props.updateResult()
  }, 1000)

  shouldComponentUpdate(nextProps: GLSLEditorProps) {
    console.log('should?', this.state.editor && nextProps.content !== this.state.editor.getValue())
    console.log(nextProps.content, this.state.editor.getValue())
    return this.state.editor && nextProps.content !== this.state.editor.getValue()
  }

  componentDidUpdate() {
    this.state.editor.setValue(this.props.content)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GLSLEditor)