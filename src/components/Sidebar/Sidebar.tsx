import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import {Menu} from 'antd'
import data from '../../data/data'
import {initEditor, clearEditor, setSelected} from '../../store/actions'
import 'antd/lib/menu/style'
import './Sidebar.scss'
import { ClickParam } from 'antd/lib/menu'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

interface SidebarProps {
  selected: {
    sub: string,
    item: string
  }
  clearEditor: Function,
  initEditor: Function,
  setSelected: Function
}

const mapStateToProps = (state: RootState) => {
  return {
    selected: state.selected
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    clearEditor() {
      return dispatch(clearEditor())
    },
    initEditor(file: File) {
      return dispatch(initEditor(file))
    },
    setSelected(selected: object) {
      return dispatch(setSelected(selected))
    }
  }
}

class Sidebar extends React.Component<SidebarProps> {

  constructor(props: SidebarProps) {
    super(props)
  }

  itemClickHandler = (param: ClickParam) => {
    let subMenu = data.find((e: any) => e.title === param.keyPath[1])
    if(subMenu) {
      let file
      subMenu.children.forEach((e: any) => {
        file = e.children.find((e: any) => e.title === param.keyPath[0])
      })
      if(file) {
        this.loadFile(file)
        this.props.setSelected({
          sub: param.keyPath[1],
          item: param.keyPath[0]
        })
      }
    }
  }

  async loadFile(file: File) {
    await this.props.clearEditor()
    await this.props.initEditor(file)
  }

  render() {
    let subMenus = data.map(e => {
      let groups = e.children.map(e => {
        let items = e.children.map(e => {
          return (<Menu.Item key={e.title}>{e.title}</Menu.Item>)
        })
        return [<MenuItemGroup key={e.title} title={e.title}>{items}</MenuItemGroup>]
      })
      return <SubMenu key={e.title} title={<span>{e.title}</span>}>{groups}</SubMenu>
    })
    return (
      <div className="sidebar-container">
        <Menu defaultSelectedKeys={[this.props.selected.item]} defaultOpenKeys={[this.props.selected.sub]} onClick={this.itemClickHandler} mode="inline">
          {subMenus}
        </Menu>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar as any)