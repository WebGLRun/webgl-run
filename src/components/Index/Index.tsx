import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {message} from 'antd'
import Editor from '../Editor/Editor'
import Nav from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar'
import {setFileInfo, initEditor, resetStore} from '../../store/actions'
import http from '../../api/http'
import '../../../assets/iconfont/iconfont.css'
import '../Index/Index.scss'

interface IndexProps {
  fileInfo: FileInfo,
  match: {
    params: {
      canvasHash: string
    }
  },
  setFileInfo: Function,
  initEditor: Function,
  resetStore: Function
}

const mapStateToProps = (state: RootState) => {
  return {
    fileInfo: state.fileInfo
  }
}

const mapDispatchToProps= (dispatch: Dispatch) => {
  return {
    setFileInfo(fileInfo: FileInfo) {
      dispatch(setFileInfo(fileInfo))
    },
    initEditor(file: WebGLFile) {
      dispatch(initEditor(file))
    },
    resetStore() {
      dispatch(resetStore())
    }
  }
}

class Index extends React.Component<IndexProps> {

  constructor(props: IndexProps) {
    super(props)
  }

  async componentWillMount() {
    if(this.props.match.params.canvasHash) {
      if(this.props.fileInfo.hash !== this.props.match.params.canvasHash) {
        let result = await http.request({
          method: 'get',
          url: 'https://api.webgl.run/getCanvas',
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
        }else {
          message.error(result.data.error)
        }
      }

      this.props.setFileInfo({
        type: 'canvas',
        hash: this.props.match.params.canvasHash
      })
    }else {
      this.props.setFileInfo({
        type: 'canvas',
        hash: ''
      })
      if(window.name === 'fromNew') {
        this.props.resetStore()
      }
    }
  }

  render() {

    let sidebar
    if(this.props.fileInfo.type === 'list') {
      sidebar = <Sidebar></Sidebar>
    }

    return (
      <div className="root">
        <div className="nav">
          <Nav></Nav>
        </div>
        <div className="body">
          {sidebar}
          <Editor></Editor>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index as any)
