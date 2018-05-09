import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {setGLSL, updateResult} from '../../store/actions'
import {keyword, variables, functions} from '../../utils/glsl'
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
        <header>GLSL: {this.props.name}</header>
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
        // 注册 glsl 需要自动补全的关键字
        if(!(window as any).registerGLSLHelper) {
          ;(window as any).monaco.languages.registerCompletionItemProvider('c', {
            provideCompletionItems: () => {
              return keyword.map(e => {
                return {
                  label: e,
                  kind: (window as any).monaco.languages.CompletionItemKind.Keyword
                }
              }).concat(functions.map(e => {
                return {
                  label: e,
                  kind: (window as any).monaco.languages.CompletionItemKind.Function
                }
              })).concat(variables.map(e => {
                return {
                  label: e,
                  kind: (window as any).monaco.languages.CompletionItemKind.Variable
                }
              }))
            }
          });
          (window as any).registerGLSLHelper = true
        }
      }
    }, 200)
  }

  modelDidChangeHandler = () => {
    if(this.props.content !== this.state.editor.getValue()) {
      this.setGLSL()
    }
  }

  setGLSL = debounce(() => {
    this.props.setGLSL(this.state.editor.getValue())
    this.props.updateResult()
  }, 1000)

  shouldComponentUpdate(nextProps: GLSLEditorProps) {
    return this.state.editor && nextProps.content !== this.state.editor.getValue()
  }

  componentDidUpdate() {
    this.state.editor.setValue(this.props.content)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GLSLEditor)