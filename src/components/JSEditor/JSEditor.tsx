import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import './JSEditor.scss'

interface JSEditorProps {
  content: string
}

interface JSEditorStates {
  editor: null | Object,
  timer: number
}

const mapStateToProps = (state: RootState) => {
  return {
    content: state.editor.jsEditor.content
  }
}

class JSEditor extends React.Component<JSEditorProps> {

  constructor(props: JSEditorProps) {
    super(props)
  }

  state: JSEditorStates = {
    editor: null,
    timer: 0
  }

  render() {
    return (
      <div className="jseditor-container editor-item">
        <header>JavaScript</header>
        <div id="jseditor"></div>
      </div>
    )
  }

  componentDidMount() {
    this.state.timer = window.setInterval(() => {
      if((window as any).monaco) {
        this.state.editor = (window as any).monaco.editor.create(document.getElementById('jseditor') as HTMLElement, {
          value: this.props.content,
          language: 'javascript',
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

export default connect(mapStateToProps)(JSEditor)