import * as React from 'react'
import Editor from '../Editor/Editor'
import Nav from '../Nav/Nav'
import Sidebar from '../Sidebar/Sidebar'
import './Index.scss'

class Index extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="nav">
          <Nav></Nav>
        </div>
        <div className="body">
          <Sidebar></Sidebar>
          <Editor></Editor>
        </div>
      </div>
    )
  }
}

export default Index
