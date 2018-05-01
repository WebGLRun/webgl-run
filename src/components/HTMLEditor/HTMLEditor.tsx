import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {setHTML, updateResult} from '../../store/actions'
const debounce = require('lodash.debounce')
import './HTMLEditor.scss'

interface HTMLEditorProps {
  content: string,
  setHTML: Function,
  updateResult: Function
}

interface HTMLEditorStates {
  editor: any,
  timer: number
}

const mapStateToProps = (state: RootState) => {
  return {
    content: state.editor.htmlEditor.content
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setHTML(html: string) {
      dispatch(setHTML(html))
    },
    updateResult() {
      dispatch(updateResult())
    }
  }
}

class HTMLEditor extends React.Component<HTMLEditorProps> {

  constructor(props: HTMLEditorProps) {
    super(props)
  }

  state: HTMLEditorStates = {
    editor: null,
    timer: 0
  }

  render() {
    return (
      <div className="htmleditor-container editor-item">
        <header>HTML</header>
        <div id="htmleditor"></div>
      </div>
    )
  }

  componentDidMount() {
    this.state.timer = window.setInterval(() => {
      if((window as any).monaco) {
        window.clearInterval(this.state.timer)
        this.state.editor = (window as any).monaco.editor.create(document.getElementById('htmleditor') as HTMLElement, {
          value: this.props.content,
          language: 'html',
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
      this.setHTML()
    }
  }

  setHTML = debounce(() => {
    this.props.setHTML(this.state.editor.getValue())
    this.props.updateResult()
  }, 1000)

  shouldComponentUpdate(nextProps: HTMLEditorProps) {
    return this.state.editor && nextProps.content !== this.state.editor.getValue()
  }

  componentDidUpdate() {
    this.state.editor.setValue(this.props.content)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HTMLEditor as any)