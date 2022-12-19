import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {message} from 'antd'
import Editor from '../Editor/Editor'
import Nav from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar'
import {setFileInfo, initEditor, resetStore, setMode, setList, setListSelected} from '../../store/actions'
import http from '../../api/http'
import '../../../assets/iconfont/iconfont.css'
import '../Index/Index.scss'

interface IndexProps {
  mode: string,
  fileInfo: FileInfo,
  listInfo: {
    list: list,
    selected: string
  },
  match: {
    params: {
      canvasHash?: string,
      listHash?: string
    }
  },
  setFileInfo: Function,
  initEditor: Function,
  resetStore: Function,
  setMode: Function,
  setList: Function,
  setListSelected: Function
}

const mapStateToProps = (state: RootState) => {
  return {
    fileInfo: state.fileInfo,
    mode: state.mode,
    listInfo: state.listInfo
  }
}

const mapDispatchToProps= (dispatch: Dispatch) => {
  return {
    setFileInfo(fileInfo: FileInfo) {
      dispatch(setFileInfo(fileInfo))
    },
    setMode(mode: string) {
      dispatch(setMode(mode))
    },
    initEditor(file: WebGLFile) {
      dispatch(initEditor(file))
    },
    resetStore() {
      dispatch(resetStore())
    },
    setList(list: list) {
      dispatch(setList(list))
    },
    setListSelected(selected: string) {
      dispatch(setListSelected(selected))
    }
  }
}

class Index extends React.Component<IndexProps> {

  constructor(props: IndexProps) {
    super(props)
  }

  async componentWillMount() {
    if(this.props.match.params.canvasHash) {
      // canvas 展示模式
      this.props.setMode('canvas')
      if(this.props.fileInfo.hash !== this.props.match.params.canvasHash) {
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
          message.error(result.data.error, () => {
            location.href = '//webgl.404forest.com'
          })
        }
      }
      this.props.setFileInfo({
        type: 'canvas',
        hash: this.props.match.params.canvasHash
      })
    }else if(this.props.match.params.listHash) {
      // list 模式
      this.props.setMode('list')
      if(this.props.match.params.listHash !== this.props.listInfo.list.hash) {
        let result = await http.request({
          method: 'get',
          url: 'https://webgl.404forest.com/api/getList',
          params: {
            hash: this.props.match.params.listHash
          }
        })

        if(result.data.success) {
          this.props.setList({
            title: result.data.result.title,
            items: result.data.result.content,
            hash: this.props.match.params.listHash
          })
          this.props.setListSelected(result.data.result.content[0].hash)
        }else {
          message.error(result.data.error)
        }
      }
    }else {
      // 新建模式
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
    if(this.props.mode === 'list') {
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
