import * as React from 'react'
import {Menu} from 'antd'
import 'antd/lib/menu/style'
import './Sidebar.scss'

const SubMenu = Menu.SubMenu
const MenuItemGroup = Menu.ItemGroup

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sidebar-container">
        <Menu defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} mode="inline">
          <SubMenu key="sub1" title={<span><span>Navigation One</span></span>}>
            <MenuItemGroup key="g1" title="Item 1">
              <Menu.Item key="1">Option 1</Menu.Item>
              <Menu.Item key="2">Option 2</Menu.Item>
            </MenuItemGroup>
            <MenuItemGroup key="g2" title="Item 2">
              <Menu.Item key="3">Option 3</Menu.Item>
              <Menu.Item key="4">Option 4</Menu.Item>
            </MenuItemGroup>
          </SubMenu>
        </Menu>
      </div>
    )
  }
}

export default Sidebar