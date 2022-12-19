import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {Tabs} from 'antd'
import {setFileInfo, initEditor} from '../../store/actions'
import http from '../../api/http'
import HTMLEditor from '../HTMLEditor/HTMLEditor'
import CSSEditor from '../CSSEditor/CSSEditor'
import JSEditor from '../JSEditor/JSEditor'
import Result from '../Result/Result'
import GLSLEditor from '../GLSLEditor/GLSLEditor'
import qs from 'qs'
import 'antd/lib/tabs/style/index.css'
import './Embed.scss'

const TabPane = Tabs.TabPane

interface EmbedProps {
  initEditor: Function,
  setFileInfo: Function,
  fileInfo: FileInfo,
  match: {
    params: {
      canvasHash?: string
    }
  },
  location: {
    search: string
  }
}

interface EmbedStates {
  lazyload: boolean,
  run: false
}

const mapStateToProps = (state: RootState) => {
  return {
    fileInfo: state.fileInfo
  }
}

const mapDispatchToProps= (dispatch: Dispatch) => {
  return {
    initEditor(file: WebGLFile) {
      dispatch(initEditor(file))
    },
    setFileInfo(fileInfo: FileInfo) {
      dispatch(setFileInfo(fileInfo))
    }
  }
}

class Embed extends React.Component<EmbedProps> {

  constructor(props: EmbedProps) {
    super(props)
  }

  state: EmbedStates = {
    lazyload: false,
    run: false
  }

  embedRef: any

  buttonClickHandler = () => {
    this.setState({
      run: true
    })
  }

  async componentWillMount() {
    let params = qs.parse(this.props.location.search, {
      ignoreQueryPrefix: true
    })
    if(params.lazyload === 'true') {
      this.setState({
        lazyload: true
      })
    }

    let result = await http.request({
      method: 'get',
      url: 'https://webgl.404forest.com/api/getCanvas',
      params: {
        hash: this.props.match.params.canvasHash
      }
    })
    if(result.data.success) {
      let file = result.data.result
      this.props.initEditor({
        title: file.title,
        content: file.content,
        creator: {
          id: file.creator_id,
          nickName: file.nick_name
        }
      })
      document.title = `${file.title} - WebGL Run`
    }else {
      this.embedRef.innerHTML = 'Canvas Not Found.'
    }
    this.props.setFileInfo({
      type: 'canvas',
      hash: this.props.match.params.canvasHash
    })
  }

  linkClickHandler = () => {
    window.open(`//webgl.run/${this.props.fileInfo.hash}`)
  }

  render() {

    let lazyloadContent = [
      <Tabs defaultActiveKey="Result" key="lazyload-tab">
        <TabPane tab="HTML" key="HTML">
          <div></div>
        </TabPane>
        <TabPane tab="CSS" key="CSS">
          <div></div>
        </TabPane>
        <TabPane tab="JavaScript" key="JavaScript">
          <div></div>
        </TabPane>
        <TabPane tab="Result" key="Result">
          <div></div>
        </TabPane>
      </Tabs>,
      <div className="lazyload-mask" key="lazyload-mask">
        <p className="lazyload-run-button" onClick={this.buttonClickHandler}><span className="iconfont icon-play"></span>Run Canvas</p>
      </div>
    ]

    let content = (
    <Tabs defaultActiveKey="Result">
      <TabPane tab="HTML" key="HTML">
        <HTMLEditor showTitle={false}></HTMLEditor>
      </TabPane>
      <TabPane tab="CSS" key="CSS">
        <CSSEditor showTitle={false}></CSSEditor>
      </TabPane>
      <TabPane tab="JavaScript" key="JavaScript">
        <JSEditor showTitle={false}></JSEditor>
      </TabPane>
      <TabPane tab="Result" key="Result">
        <Result showTitle={false}></Result>
      </TabPane>
    </Tabs>
    )

    return (
      <div className="embed-container" ref={ref => this.embedRef = ref}>
        {!this.state.lazyload || (this.state.lazyload && this.state.run) ? content : lazyloadContent}
        <p className="embed-webgl-run-hook" onClick={this.linkClickHandler}>Edit on<span className="iconfont icon-cube"></span>WebGL.Run</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Embed as any)