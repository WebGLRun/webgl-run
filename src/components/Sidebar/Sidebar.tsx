import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {Menu, message} from 'antd'
import data from '../../data/data'
import http from '../../api/http'
import {initEditor, clearEditor, setFileInfo} from '../../store/actions'
import 'antd/lib/menu/style/index.css'
import './Sidebar.scss'
import { ClickParam } from 'antd/lib/menu'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface SidebarProps {
  listInfo: {
    list: list,
    selected: string
  }
  clearEditor: Function,
  initEditor: Function,
  setSelected: Function,
  setFileInfo: Function
}

const mapStateToProps = (state: RootState) => {
  return {
    listInfo: state.listInfo
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clearEditor() {
      return dispatch(clearEditor())
    },
    initEditor(file: WebGLFile) {
      return dispatch(initEditor(file))
    },
    setFileInfo(fileInfo: FileInfo) {
      return dispatch(setFileInfo(fileInfo))
    }
  }
}

class Sidebar extends React.Component<SidebarProps> {

  constructor(props: SidebarProps) {
    super(props)
  }

  itemClickHandler = async (param: ClickParam) => {
    if(!param.key) {
      return
    }
    let canvas = await this.getCanvasByHash(param.key)
    if(canvas) {
      await this.loadFile({
        title: canvas.title,
        content: canvas.content,
        creator: {
          id: canvas.creator_id,
          nickName: canvas.nick_name
        }
      }, param.key)
    }
  }

  itemAClickHandler = (e: any) => {
    e.preventDefault()
  }

  async loadFile(file: WebGLFile, hash: string) {
    await this.props.clearEditor()
    await this.props.initEditor(file)
    this.props.setFileInfo({
      type: 'canvas',
      hash
    })
  }

  render() {
    let items = this.props.listInfo.list.items.map((e, i) => {
      return (<Menu.Item key={e.hash}><a onClick={this.itemAClickHandler} href={`//webgl.run/${e.hash}`}>{e.title}</a></Menu.Item>)
    })
    let menu
    if(this.props.listInfo.selected) {
      menu = (<Menu
        defaultSelectedKeys={[this.props.listInfo.selected]}
        defaultOpenKeys={[this.props.listInfo.list.hash]}
        onClick={this.itemClickHandler}
        mode="inline">
        <SubMenu key={this.props.listInfo.list.hash} title={<span>{this.props.listInfo.list.title}</span>}>{items}</SubMenu>
      </Menu>)
    }
    return (
      <div className="sidebar-container">
        {menu}
      </div>
    )
  }

  async componentDidUpdate(prevProps: any) {
    if(!prevProps.listInfo.selected && this.props.listInfo.selected) {
      let canvas = await this.getCanvasByHash(this.props.listInfo.selected)
      if(canvas) {
        this.loadFile({
          title: canvas.title,
          content: canvas.content,
          creator: {
            id: canvas.creator_id,
            nickName: canvas.nick_name
          }
        }, this.props.listInfo.selected)
      }
    }
  }

  getCanvasByHash = async (hash: string) => {
    let result = await http.request({
      method: 'get',
      url: 'https://api.webgl.run/getCanvas',
      params: {
        hash: hash
      }
    })
    if(result.data.success) {
      let file = result.data.result
      return file
    }else {
      message.error(result.data.error, () => {
        location.href = '//webgl.run'
      })
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar as any)