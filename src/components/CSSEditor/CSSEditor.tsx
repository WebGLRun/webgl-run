import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {setCSS, updateResult} from '../../store/actions'
const debounce = require('lodash.debounce')
import './CSSEditor.scss'

interface CSSEditorProps {
  content: string,
  setCSS: Function,
  updateResult: Function
}

interface passedProps {
  showTitle: Boolean
}

interface CSSEditorState {
  editor: any,
  timer: number
}

const mapStateToProps = (state: RootState) => {
  return {
    content: state.editor.cssEditor.content
  }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setCSS(css: string) {
      dispatch(setCSS(css))
    },
    updateResult() {
      dispatch(updateResult())
    }
  }
}

class CSSEditor extends React.Component<CSSEditorProps & passedProps> {

  constructor(props: CSSEditorProps & passedProps) {
    super(props)
  }

  state: CSSEditorState = {
    editor: null,
    timer: 0
  }

  render() {
    return (
      <div className="csseditor-container editor-item">
        {this.props.showTitle ? <header>CSS</header> : ''}
        <div id="csseditor"></div>
      </div>
    )
  }

  componentDidMount() {
    this.state.timer = window.setInterval(() => {
      if((window as any).monaco) {
        window.clearInterval(this.state.timer)
        this.state.editor = (window as any).monaco.editor.create(document.getElementById('csseditor') as HTMLElement, {
          value: this.props.content,
          language: 'css',
          theme: 'vs-dark',
          minimap: {
            enabled: false
          },
          automaticLayout: true
        })
        this.state.editor.onDidChangeModelContent(this.modelDidChangeHandler)
        this.state.editor.addCommand([(window as any).monaco.KeyMod.Shift | (window as any).monaco.KeyMod.CtrlCmd | (window as any).monaco.KeyCode.KEY_P], () => {
          this.state.editor.trigger('anyString', 'editor.action.quickCommand')
        })
      }
    }, 200)
  }

  modelDidChangeHandler = () => {
    if(this.props.content !== this.state.editor.getValue()) {
      this.setCSS()
    }
  }

  setCSS = debounce(() => {
    this.props.setCSS(this.state.editor.getValue())
    this.props.updateResult()
  }, 1000)

  shouldComponentUpdate(nextProps: CSSEditorProps) {
    return this.state.editor && nextProps.content !== this.state.editor.getValue()
  }

  componentDidUpdate() {
    this.state.editor.setValue(this.props.content)
  }
}

export default connect<{}, {}, passedProps>(mapStateToProps, mapDispatchToProps)(CSSEditor as any)
