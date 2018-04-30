import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {setCSS} from '../../store/actions'
import './CSSEditor.scss'

interface CSSEditorProps {
  content: string,
  setCSS: Function
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
    }
  }
}

class CSSEditor extends React.Component<CSSEditorProps > {

  constructor(props: CSSEditorProps) {
    super(props)
  }

  state: CSSEditorState = {
    editor: null,
    timer: 0
  }

  render() {
    return (
      <div className="csseditor-container editor-item">
        <header>CSS</header>
        <div id="csseditor"></div>
      </div>
    )
  }

  componentDidMount() {
    this.state.timer = window.setInterval(() => {
      if((window as any).monaco) {
        this.state.editor = (window as any).monaco.editor.create(document.getElementById('csseditor') as HTMLElement, {
          value: this.props.content,
          language: 'css',
          theme: 'vs-dark',
          minimap: {
            enabled: false
          },
          automaticLayout: true
        })
        this.state.editor.onDidChangeModelContent((e: any) => {
          this.props.setCSS(this.state.editor.getValue())
        })
        window.clearInterval(this.state.timer)
      }
    }, 200)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSEditor as any)
