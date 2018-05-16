import * as React from 'react'
import { connect, Dispatch } from 'react-redux'
import JSEditor from '../JSEditor/JSEditor'
import HTMLEditor from '../HTMLEditor/HTMLEditor'
import CSSEditor from '../CSSEditor/CSSEditor'
import GLSLEditor from '../GLSLEditor/GLSLEditor'
import Result from '../Result/Result'
import {setVerticalDividerPosition, setLeftHorizontalDividerPosition, setRightHorizontalDividerPosition} from '../../store/actions'
import './Editor.scss'

interface EditorProps {
  verticalDivider: number,
  leftHorizontalDivider: {
    [propName: number]: number
  },
  rightHorizontalDivider: {
    [propName: number]: number
  },
  setVerticalDividerPosition: Function,
  setLeftHorizontalDividerPosition: Function,
  setRightHorizontalDividerPosition: Function
}

interface EditorStates {
  leftPanelStyle: {
    flex: number
  },
  activeIndex: number,
  [propName: string]: any
}

const mapStateToProps = (state: RootState) => {
  return {
    verticalDivider: state.dividerPosition.verticalDivider,
    leftHorizontalDivider: state.dividerPosition.leftHorizontalDivider,
    rightHorizontalDivider: state.dividerPosition.rightHorizontalDivider
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setVerticalDividerPosition(position: number) {
      return dispatch(setVerticalDividerPosition(position))
    },
    setLeftHorizontalDividerPosition(index: number, position: number) {
      return dispatch(setLeftHorizontalDividerPosition(index, position))
    },
    setRightHorizontalDividerPosition(index: number, position: number) {
      return dispatch(setRightHorizontalDividerPosition(index, position))
    }
  }
}

class Editor extends React.Component<EditorProps> {

  constructor(props: EditorProps) {
    super(props)
  }

  leftPanelRef: any
  leftPanelRefs: {
    [propName: number]: any
  } = {}
  rightPanelRefs: {
    [propName: number]: any
  } = {}
  state: EditorStates = {
    leftPanelStyle: {
      flex: 1
    },
    activeIndex: -1,
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
      },
      activeIndex: 0
    })
  }

  verticalDividerMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
    if(this.state.dragStatus.verticalDragging) {
      let width: number = e.screenX - this.state.dragStatus.startMouseValue + this.state.dragStatus.startDOMValue
      if(width < 30) {
        width = 30
      }
      this.props.setVerticalDividerPosition(width)
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
        },
        activeIndex: -1
      })
    }
  }

  leftHorizontalDividerMouseDownHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    this.setState({
      [`dragStatus-${index}`]: {
        verticalDragging: false,
        leftHorizontalDragging: true,
        rightHorizontalDragging: false,
        startMouseValue: e.screenY,
        startDOMValue: this.leftPanelRefs[index].getBoundingClientRect().height
      },
      activeIndex: index
    })
  }

  leftHorizontalDividerMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if(this.state.activeIndex !== -1 && this.state[`dragStatus-${index}`]) {
      let height: number = e.screenY - this.state[`dragStatus-${index}`].startMouseValue + this.state[`dragStatus-${index}`].startDOMValue
      if(height < 36) {
        height = 36
      }
      if(this.state[`dragStatus-${index}`].leftHorizontalDragging) {
        this.props.setLeftHorizontalDividerPosition(index, height)
      }
    }
  }

  leftHorizontalDividerMouseUpHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if(this.state.activeIndex !== -1 && this.state[`dragStatus-${index}`] && this.state[`dragStatus-${index}`].leftHorizontalDragging) {
      this.setState({
        [`dragStatus-${index}`]: {
          verticalDragging: false,
          leftHorizontalDragging: false,
          rightHorizontalDragging: false,
          startMouseValue: -1,
          startDOMValue: -1
        },
        activeIndex: -1
      })
    }
  }

  rightHorizontalDividerMouseDownHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    this.setState({
      [`dragStatus-${index}`]: {
        verticalDragging: false,
        leftHorizontalDragging: true,
        rightHorizontalDragging: false,
        startMouseValue: e.screenY,
        startDOMValue: this.rightPanelRefs[index].getBoundingClientRect().height
      },
      activeIndex: index
    })
  }

  rightHorizontalDividerMouseMoveHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if(this.state.activeIndex !== -1 && this.state[`dragStatus-${index}`]) {
      let height: number = e.screenY - this.state[`dragStatus-${index}`].startMouseValue + this.state[`dragStatus-${index}`].startDOMValue
      if(height < 36) {
        height = 36
      }
      if(this.state[`dragStatus-${index}`].leftHorizontalDragging) {
        this.props.setRightHorizontalDividerPosition(index, height)
      }
    }
  }

  rightHorizontalDividerMouseUpHandler = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if(this.state.activeIndex !== -1 && this.state[`dragStatus-${index}`] && this.state[`dragStatus-${index}`].leftHorizontalDragging) {
      this.setState({
        [`dragStatus-${index}`]: {
          verticalDragging: false,
          leftHorizontalDragging: false,
          rightHorizontalDragging: false,
          startMouseValue: -1,
          startDOMValue: -1
        },
        activeIndex: -1
      })
    }
  }

  componentDidMount() {
    if(this.leftPanelRef) {
      this.setState({
        leftPanelStyle: {
          flex: 'none',
        }
      })
      if(!this.props.verticalDivider) {
        this.props.setVerticalDividerPosition(this.leftPanelRef.getBoundingClientRect().width)
      }
    }
  }

  render() {
    return (
      <div className="editor-container" onMouseMove={this.verticalDividerMouseMoveHandler} onMouseUp={this.verticalDividerMouseUpHandler} onMouseLeave={this.verticalDividerMouseUpHandler}>
        <div className="editor-left-panel" style={{...this.state.leftPanelStyle, width: this.props.verticalDivider}} ref={ref => this.leftPanelRef = ref} onMouseMove={e => this.leftHorizontalDividerMouseMoveHandler(e, this.state.activeIndex)} onMouseUp={e => this.leftHorizontalDividerMouseUpHandler(e, this.state.activeIndex)} onMouseLeave={e => this.leftHorizontalDividerMouseUpHandler(e, this.state.activeIndex)}>
          <div className="editor-left-panel-item" ref={ref => this.leftPanelRefs[0] = ref} style={{height: this.props.leftHorizontalDivider[0]}}>
            <HTMLEditor></HTMLEditor>
          </div>
          <div className="editor-horizontal-divider" onMouseDown={e => this.leftHorizontalDividerMouseDownHandler(e, 0)}></div>
          <div className="editor-left-panel-item" ref={ref => this.leftPanelRefs[1] = ref} style={{height: this.props.leftHorizontalDivider[1]}}>
            <GLSLEditor name="vertexShader"></GLSLEditor>
            {/* <JSEditor></JSEditor> */}
          </div>
          <div className="editor-horizontal-divider" onMouseDown={e => this.leftHorizontalDividerMouseDownHandler(e, 1)}></div>
          <div className="editor-left-panel-item">
            <JSEditor></JSEditor>
          </div>
        </div>
        <div className="editor-vertical-divider" onMouseDown={this.verticalDividerMouseDownHandler}></div>
        <div className="editor-right-panel" onMouseMove={e => this.rightHorizontalDividerMouseMoveHandler(e, this.state.activeIndex)} onMouseUp={e => this.rightHorizontalDividerMouseUpHandler(e, this.state.activeIndex)} onMouseLeave={e => this.rightHorizontalDividerMouseUpHandler(e, this.state.activeIndex)}>
          <div className="editor-right-panel-item" ref={ref => this.rightPanelRefs[0] = ref} style={{height: this.props.rightHorizontalDivider[0]}}>
            <CSSEditor></CSSEditor>
          </div>
          <div className="editor-horizontal-divider" onMouseDown={e => this.rightHorizontalDividerMouseDownHandler(e, 0)}></div>
          <div className="editor-right-panel-item" ref={ref => this.rightPanelRefs[1] = ref} style={{height: this.props.rightHorizontalDivider[1]}}>
            <GLSLEditor name="fragmentShader"></GLSLEditor>
          </div>
          <div className="editor-horizontal-divider" onMouseDown={e => this.rightHorizontalDividerMouseDownHandler(e, 1)}></div>
          <div className="editor-right-panel-item">
            {(this.state.activeIndex !== -1) && <div className="editor-result-mask"></div>}
            <Result></Result>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Editor as any)
