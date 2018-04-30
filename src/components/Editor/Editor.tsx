import * as React from 'react'
import JSEditor from '../JSEditor/JSEditor'
import HTMLEditor from '../HTMLEditor/HTMLEditor'
import CSSEditor from '../CSSEditor/CSSEditor'
import Result from '../Result/Result'
import './Editor.scss'

interface EditorProps {}

class Editor extends React.Component {

  constructor(props: EditorProps) {
    super(props)
  }

  leftPanelRef: any
  leftTopPanelRef: any
  rightTopPanelRef: any
  state = {
    leftPanelStyle: {
      flex: 1
    },
    leftTopPanelStyle: {},
    rightTopPanelStyle: {},
    dragStatus: {
      verticalDragging: false,
      leftHorizontalDragging: false,
      rightHorizontalDragging: false,
      startDOMValue: -1,
      startMouseValue: -1
    }
  }

  verticalDividerMouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      dragStatus: {
        verticalDragging: true,
        leftHorizontalDragging: false,
        rightHorizontalDragging: false,
        startMouseValue: e.screenX,
        startDOMValue: this.leftPanelRef.getBoundingClientRect().width
      }
    })
  }

  verticalDividerMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if(this.state.dragStatus.verticalDragging) {
      let width: number = e.screenX - this.state.dragStatus.startMouseValue + this.state.dragStatus.startDOMValue
      if(width < 12) {
        width = 12
      }
      this.setState({
        leftPanelStyle: {
          ...this.state.leftPanelStyle,
          width
        }
      })
    }
  }

  verticalDividerMouseUpHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if(this.state.dragStatus.verticalDragging) {
      this.setState({
        dragStatus: {
          verticalDragging: false,
          leftHorizontalDragging: false,
          rightHorizontalDragging: false,
          startDOMValue: -1,
          startMouseValue: -1
        }
      })
    }
  }

  leftHorizontalDividerMouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      dragStatus: {
        verticalDragging: false,
        leftHorizontalDragging: true,
        rightHorizontalDragging: false,
        startMouseValue: e.screenY,
        startDOMValue: this.leftTopPanelRef.getBoundingClientRect().height
      }
    })
  }

  leftHorizontalDividerMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let height: number = e.screenY - this.state.dragStatus.startMouseValue + this.state.dragStatus.startDOMValue
    if(height < 12) {
      height = 12
    }
    if(this.state.dragStatus.leftHorizontalDragging) {
      this.setState({
        leftTopPanelStyle: {
          height
        }
      })
    }
  }

  leftHorizontalDividerMouseUpHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if(this.state.dragStatus.leftHorizontalDragging) {
      this.setState({
        dragStatus: {
          verticalDragging: false,
          leftHorizontalDragging: false,
          rightHorizontalDragging: false,
          startMouseValue: -1,
          startDOMValue: -1
        }
      })
    }
  }

  rightHorizontalDividerMouseDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    this.setState({
      dragStatus: {
        verticalDragging: false,
        leftHorizontalDragging: false,
        rightHorizontalDragging: true,
        startMouseValue: e.screenY,
        startDOMValue: this.rightTopPanelRef.getBoundingClientRect().height
      }
    })
  }

  rightHorizontalDividerMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    let height: number = e.screenY - this.state.dragStatus.startMouseValue + this.state.dragStatus.startDOMValue
    if(height < 12) {
      height = 12
    }
    if(this.state.dragStatus.rightHorizontalDragging) {
      this.setState({
        rightTopPanelStyle: {
          height
        }
      })
    }
  }

  rightHorizontalDividerMouseUpHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if(this.state.dragStatus.rightHorizontalDragging) {
      this.setState({
        dragStatus: {
          verticalDragging: false,
          leftHorizontalDragging: false,
          rightHorizontalDragging: false,
          startMouseValue: -1,
          startDOMValue: -1
        }
      })
    }
  }

  componentDidMount() {
    if(this.leftPanelRef) {
      this.setState({
        leftPanelStyle: {
          flex: 'none',
          width: this.leftPanelRef.getBoundingClientRect().width
        }
      })
    }
  }

  render() {
    return (
      <div className="editor-container" onMouseMove={this.verticalDividerMouseMoveHandler} onMouseUp={this.verticalDividerMouseUpHandler} onMouseLeave={this.verticalDividerMouseUpHandler}>
        <div className="editor-left-panel" style={this.state.leftPanelStyle} ref={ref => this.leftPanelRef = ref} onMouseMove={this.leftHorizontalDividerMouseMoveHandler} onMouseUp={this.leftHorizontalDividerMouseUpHandler} onMouseLeave={this.leftHorizontalDividerMouseUpHandler}>
          <div className="editor-left-top-panel" ref={ref => this.leftTopPanelRef = ref} style={this.state.leftTopPanelStyle}>
            <HTMLEditor></HTMLEditor>
          </div>
          <div className="editor-horizontal-divider" onMouseDown={this.leftHorizontalDividerMouseDownHandler}></div>
          <div className="editor-left-bottom-panel">
            <JSEditor></JSEditor>
          </div>
        </div>
        <div className="editor-vertical-divider" onMouseDown={this.verticalDividerMouseDownHandler}></div>
        <div className="editor-right-panel" onMouseMove={this.rightHorizontalDividerMouseMoveHandler} onMouseUp={this.rightHorizontalDividerMouseUpHandler} onMouseLeave={this.rightHorizontalDividerMouseUpHandler}>
          <div className="editor-right-top-panel" ref={ref => this.rightTopPanelRef = ref} style={this.state.rightTopPanelStyle}>
            <CSSEditor></CSSEditor>
          </div>
          <div className="editor-horizontal-divider" onMouseDown={this.rightHorizontalDividerMouseDownHandler}></div>
          <div className="editor-right-bottom-panel">
            {(this.state.dragStatus.verticalDragging || this.state.dragStatus.rightHorizontalDragging) && <div className="editor-result-mask"></div>}
            <Result></Result>
          </div>
        </div>
      </div>
    )
  }
}

export default Editor
