import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import './CSSEditor.scss'

interface CSSEditorProps {
  content: string
}

interface CSSEditorState {
  editor: null | Object,
  timer: number
}

const mapStateToProps = (state: RootState) => {
  return {
    content: state.editor.cssEditor.content
  }
}

class CSSEditor extends React.Component<CSSEditorProps> {

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
          }
        })
        window.clearInterval(this.state.timer)
      }
    }, 200)
  }
}

export default connect(mapStateToProps)(CSSEditor)
