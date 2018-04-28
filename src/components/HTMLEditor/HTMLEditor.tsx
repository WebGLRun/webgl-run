import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import './HTMLEditor.scss'

interface HTMLEditorProps {
  content: string
}

interface HTMLEditorStates {
  editor: null | Monaco,
  timer: number
}

const mapStateToProps = (state: RootState) => {
  return {
    content: state.editor.htmlEditor.content
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
        this.state.editor = (window as any).monaco.editor.create(document.getElementById('htmleditor') as HTMLElement, {
          value: this.props.content,
          language: 'html',
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

export default connect(mapStateToProps)(HTMLEditor)