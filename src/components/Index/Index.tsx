import * as React from 'react'
import Editor from '../Editor/Editor'
import Nav from '../Nav/Nav'
import './Index.scss'

class Index extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="nav">
          <Nav></Nav>
        </div>
        <div className="body">
          <div className="sidebar"></div>
          <Editor></Editor>
        </div>
      </div>
    )
  }
}

export default Index
