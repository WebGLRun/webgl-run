import * as React from 'react'
import * as Cookies from 'js-cookie'
import http from '../../api/http'
import {message, Modal, Button, Input} from 'antd'
import {newClickHandler} from '../Nav/Nav'
import 'antd/lib/modal/style/index.css'
import 'antd/lib/button/style/index.css'
import 'antd/lib/input/style/index.css'
import 'antd/lib/style/index.css'
import './Dashboard.scss'

class Dashboard extends React.Component {

  state: any = {
    login: true,
    canvases: [],
    lists: [],
    listModalVisible: false,
    submitinglist: false,
    listTitle: 'Default List',
    listContent: '',
    listHash: ''
  }

  async componentWillMount() {
    document.title = 'Dashboard - WebGL Run'
    await this.getProfile()
  }

  getProfile = async () => {
    let id = Cookies.get('webgl-run-user-id')
    if(!id) {
      this.setState({
        login: false
      })
    }
    let result = await http.request({
      method: 'get',
      url: 'https://webgl.404forest.com/api/getProfile',
      params: {
        id: Number(id)
      }
    })
    if(result.data.success) {
      this.setState({
        canvases: result.data.result.canvases,
        lists: result.data.result.lists,
      })
    }else {
      message.error(result.data.error)
    }
  }

  gotoCanvas = (hash: string) => {
    window.open(`//webgl.404forest.com/${hash}`)
  }

  addNewCanvas = () => {
    window.open(`//webgl.404forest.com`)
  }

  addlist = () => {
    this.setState({
      listModalVisible: true
    })
  }

  editList = (i: number) => {
    this.setState({
      listModalVisible: true,
      listTitle: this.state.lists[i].title,
      listContent: JSON.parse(this.state.lists[i].content).join(','),
      listHash: this.state.lists[i].hash,
    })
  }

  gotoLists = (hash: string) => {
    window.open(`//webgl.404forest.com/list/${hash}`)
  }

  deleteCanvas = (hash: string) => {
    let id = Cookies.get('webgl-run-user-id')
    if(!id) {
      this.setState({
        login: false
      })
    }

    Modal.confirm({
      title: 'Are you sure delete this canvas?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      maskClosable: true,
      onOk: () => {
        return new Promise((res, rej) => {
          http.request({
            method: 'post',
            url: 'https://webgl.404forest.com/api/deleteCanvas',
            data: {
              id: Number(id),
              hash
            }
          }).then(result => {
            if(result.data.success) {
              message.success('Canvas deleted successfully, refreshing list...')
              this.getProfile()
            }else {
              message.error(result.data.error)
            }
            res()
          })
        })
      },
      onCancel(){}
    })
  }

  deleteList = (hash: string) => {
    let id = Cookies.get('webgl-run-user-id')
    if(!id) {
      this.setState({
        login: false
      })
    }

    Modal.confirm({
      title: 'Are you sure delete this list?',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      maskClosable: true,
      onOk: () => {
        return new Promise((res, rej) => {
          http.request({
            method: 'post',
            url: 'https://webgl.404forest.com/api/deleteList',
            data: {
              id: Number(id),
              hash
            }
          }).then(result => {
            if(result.data.success) {
              message.success('List deleted successfully, refreshing list...')
              this.getProfile()
            }else {
              message.error(result.data.error)
            }
            res()
          })
        })
      },
      onCancel(){}
    })
  }

  handleListModalOk = async () => {
    let id = Cookies.get('webgl-run-user-id')
    if(!id) {
      this.setState({
        login: false
      })
    }
    let result = await http.request({
      method: 'post',
      url: 'https://webgl.404forest.com/api/saveList',
      data: {
        creatorId: Number(id),
        hash: this.state.listHash,
        title: this.state.listTitle,
        content: JSON.stringify(this.state.listContent.split(',').map((e: string) => e.trim()))
      }
    })

    if(result.data.success) {
      message.success('List saved successfully, refreshing list...')
      this.getProfile()
      this.handleListModalCancel()
    }else {
      message.error(result.data.error)
    }
  }

  handleListModalCancel = () => {
    this.setState({
      listModalVisible: false,
      listContent: '',
      listTitle: 'Default List',
      listHash: ''
    })
  }

  listTitleChangeHandler = (e: any) => {
    this.setState({
      listTitle: e.currentTarget.value
    })
  }

  listContentChangeHandler = (e: any) => {
    this.setState({
      listContent: e.currentTarget.value
    })
  }

  render() {
    let loginTip, canvases, canvaseItems, lists, listItems

    if(!this.state.login) {
      loginTip = <p className="no-login-tip">Please log in first.</p>
    }else {
      canvaseItems = this.state.canvases.map((e: any) => {
        return (<li className="section-item canvas-item" key={e.hash}>
        <span className="canvas-item-title" onClick={event => this.gotoCanvas(e.hash)}>{e.title}</span>
        <span className="canvas-item-hash">{e.hash}</span>
        <i className="iconfont icon-delete" onClick={event => this.deleteCanvas(e.hash)}></i>
        </li>)
      })
      canvases = (<div className="dashboard-section canvases">
        <header>My Canvases<i className="iconfont icon-add" onClick={this.addNewCanvas}></i></header>
        <ul className="section-item-ul canvas-item-ul">
          {canvaseItems}
        </ul>
      </div>)
      listItems = this.state.lists.map((e: any, i: number) => {
        return (<li className="section-item lists-item" key={e.hash}>
          <span className="lists-item-title" onClick={event => this.gotoLists(e.hash)}>{e.title}</span>
          <span className="lists-item-content">{JSON.parse(e.content).join(',')}</span>
          <i className="iconfont icon-edit" onClick={event => this.editList(i)}></i>
          <i className="iconfont icon-delete" onClick={event => this.deleteList(e.hash)}></i>
        </li>)
      })
      lists = (<div className="dashboard-section lists">
        <header>My Lists<i className="iconfont icon-add" onClick={this.addlist}></i></header>
        <ul className="section-item-ul lists-item-ul">
          {listItems}
        </ul>
      </div>)
    }

    return (<div className="dashboard-container">
      <div className="nav-container">
        <p className="nav-left-panel">
          <span className="nav-logo" onClick={newClickHandler}>
            <i className="iconfont icon-cube"></i>
            <span>webgl.404forest.com</span>
          </span>
        </p>
      </div>
      {loginTip}
      {canvases}
      {lists}
      <Modal
        visible={this.state.listModalVisible}
        title="Create New List"
        onOk={this.handleListModalOk}
        onCancel={this.handleListModalCancel}
        footer={[
          <Button key="back" onClick={this.handleListModalCancel}>Return</Button>,
          <Button key="submit" type="primary" loading={this.state.submitinglist} onClick={this.handleListModalOk}>
            Submit
          </Button>,
        ]}
      >
        <div className="list-modal-row">
          <label>Title:</label>
          <Input value={this.state.listTitle} placeholder="List Title" onChange={this.listTitleChangeHandler} />
        </div>
        <div className="list-modal-row">
          <label>Canvases:</label>
          <Input.TextArea value={this.state.listContent} autosize={{ minRows: 2, maxRows: 6 }} placeholder="CanvasA hash, CanvasB hash..." onChange={this.listContentChangeHandler} />
        </div>
      </Modal>
    </div>)
  }
}

export default Dashboard