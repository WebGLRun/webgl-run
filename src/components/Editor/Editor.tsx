import * as React from 'react'
import JSEditor from '../JSEditor/JSEditor'
import HTMLEditor from '../HTMLEditor/HTMLEditor'
import CSSEditor from '../CSSEditor/CSSEditor'
import Result from '../Result/Result'
import './Editor.scss'

class Editor extends React.Component {
  render() {
    return (
      <div className="editor-container">
        <div className="editor-left-panel">
          <div className="editor-left-top-panel">
            <HTMLEditor></HTMLEditor>
          </div>
          <div className="editor-horizontal-divider"></div>
          <div className="editor-left-bottom-panel">
            <JSEditor></JSEditor>
          </div>
        </div>
        <div className="editor-vertical-divider"></div>
        <div className="editor-right-panel">
          <div className="editor-right-top-panel">
            <CSSEditor></CSSEditor>
          </div>
          <div className="editor-horizontal-divider"></div>
          <div className="editor-right-bottom-panel">
            <Result></Result>
          </div>
        </div>
      </div>
    )
  }
}

export default Editor
