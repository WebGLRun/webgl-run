import * as React from 'react'
import * as qs from 'qs'
import * as Cookies from 'js-cookie'
import {connect, Dispatch} from 'react-redux'
import {generateRandomString, popup} from '../../utils/utils'
import {generateResult} from '../../utils/generateResult'
import {message, Dropdown, Menu} from 'antd'
import {setUser, setTitle} from '../../store/actions'
import http from '../../api/http'
import 'antd/lib/message/style/index.css'
import 'antd/lib/menu/style/index.css'
import 'antd/lib/dropdown/style/index.css'
import './Nav.scss'

interface NavProps {
  title: string,
  user: UserInfo,
  fileInfo: FileInfo,
  creator: CreatorInfo,
  editor: any,
  canvasHash: string,
  setUser: Function,
  setTitle: Function
}

const mapStateToProps = (state: RootState) => {
  return {
    title: state.title,
    user: state.user,
    fileInfo: state.fileInfo,
    creator: state.creator,
    editor: state.editor
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUser(user: UserInfo) {
      dispatch(setUser(user))
    },
    setTitle(title: string) {
      dispatch(setTitle(title))
    }
  }
}

export const newClickHandler = () => {
  let reduxSessionCache = sessionStorage.getItem('redux')
  sessionStorage.removeItem('redux')
  window.open('//webgl.run', 'fromNew')
  if(reduxSessionCache) {
    sessionStorage.setItem('redux', reduxSessionCache)
  }
}

class Nav extends React.Component<NavProps> {

  titleInputRef: any

  constructor(props: NavProps) {
    super(props)
  }

  state = {
    titleEditing: false
  }

  loginClickHandler = () => {
    let state = generateRandomString()
    popup(`https://github.com/login/oauth/authorize?client_id=b51c53f84d3a8df0ed43&scope=read:user&state=${state}`, 'Github OAuth', 600, 400)
  }

  saveClickHandler = async () => {

    let canvasResult = generateResult({
      html: this.props.editor.htmlEditor.content,
      css: this.props.editor.cssEditor.content,
      js: (window as any).ts.transpileModule(this.props.editor.jsEditor.content, {
        compilerOptions: {
          target: (window as any).ts.ModuleKind.ESNext
        }
      }).outputText,
      glsl: this.props.editor.glslEditor
    })

    let result = await http.request({
      method: 'POST',
      url: 'https://api.webgl.run/saveCanvas',
      data: {
        hash: this.props.fileInfo.hash,
        title: this.props.title,
        content: {
          editor: this.props.editor,
          result: canvasResult
        },
        creatorId: this.props.user.id
      }
    })
    if(result.data.success) {
      message.success('Saved successfully, redirecting...')
      if(!this.props.fileInfo.hash) {
        location.href = `/${result.data.result.hash}`
      }
    }else {
      message.error(result.data.error)
    }
  }

  forkClickHandler = async () => {
    let canvasResult = generateResult({
      html: this.props.editor.htmlEditor.content,
      css: this.props.editor.cssEditor.content,
      js: (window as any).ts.transpileModule(this.props.editor.jsEditor.content, {
        compilerOptions: {
          target: (window as any).ts.ModuleKind.ESNext
        }
      }).outputText,
      glsl: this.props.editor.glslEditor
    })

    let result = await http.request({
      method: 'POST',
      url: 'https://api.webgl.run/saveCanvas',
      data: {
        hash: '',
        title: this.props.title,
        content: {
          editor: this.props.editor,
          result: canvasResult
        },
        creatorId: this.props.user.id
      }
    })

    if(result.data.success) {
      message.success('Forked successfully, redirecting...', () => {
        location.href = `/${result.data.result.hash}`
      })
    }else {
      message.error(result.data.error)
    }
  }

  componentWillMount() {
    window.addEventListener('storage', e => {
      if(e.key === 'message') {
        if(!e.newValue) {
          return
        }
        let msg = JSON.parse(e.newValue)
        message.success('Github log in successfully!')
        this.props.setUser({
          oauthType: msg.oauthType,
          nickName: msg.userData.login,
          id: Number(msg.id)
        })
      }
    })

    this.checkUserStatus()
  }

  checkUserStatus = () => {
    let oauthType = Cookies.get('webgl-run-user-oauth-type')
    let nickName = Cookies.get('webgl-run-user-nick-name')
    let id = Cookies.get('webgl-run-user-id')
    if(oauthType && nickName && id) {
      this.props.setUser({
        oauthType,
        nickName,
        id: Number(id)
      })
    }else {
      this.props.setUser({
        oauthType: '',
        nickName: 'Anonymous',
        id: 1
      })
    }
  }

  editTitle = () => {
    this.setState({
      titleEditing: true
    })
    setTimeout(() => {
      this.titleInputRef.focus()
    }, 0)
  }

  stopEditTitle = () => {
    this.setState({
      titleEditing: false
    })
  }

  handleTitleChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.props.setTitle((e.target as HTMLInputElement).value)
  }

  logout = async () => {
    let result = await http.request({
      method: 'get',
      url: 'https://api.webgl.run/logout',
    })
    if(result.data.success) {
      message.success('Log out successfully, refreshing...', () => {
        location.reload()
      })
    }else {
      message.error(result.data.error)
    }
  }

  dropDownClickHandler = (e: any) => {
    switch(e.key) {
      case('logout'): {
        this.logout()
        break
      }
      case('gotoDashboard'): {
        let reduxSessionCache = sessionStorage.getItem('redux')
        sessionStorage.removeItem('redux')
        window.open('//webgl.run/u/dashboard')
        if(reduxSessionCache) {
          sessionStorage.setItem('redux', reduxSessionCache)
        }
        break
      }
    }
  }

  render() {
    const menu = (
      <Menu onClick={this.dropDownClickHandler}>
        <Menu.Item key="gotoDashboard">
          <p>Dashboard</p>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <p>Log out</p>
        </Menu.Item>
      </Menu>
    )
    let auth, save, fork, editIcon, title
    if(this.props.user.id === 1) {
      auth = <span className="tool-button login" onClick={this.loginClickHandler}>Log in with Github</span>
    }else {
      auth = <Dropdown overlay={menu} placement='bottomRight' trigger={['click']}>
        <span className="tool-button">{this.props.user.nickName}<i className='iconfont icon-down'></i></span>
      </Dropdown>
    }

    // 新 canvas
    // 或者用户自己的 canvas 允许 save
    if((this.props.fileInfo.type === 'canvas' && !this.props.fileInfo.hash) || (this.props.user.id !== 1 && this.props.fileInfo.type === 'canvas' && this.props.fileInfo.hash && this.props.user.id === this.props.creator.id)) {
      save = <span className="tool-button" onClick={this.saveClickHandler}>Save</span>
    }

    // 对于所有已有的 canvas 都可以 fork
    if(this.props.fileInfo.type === 'canvas' && this.props.fileInfo.hash) {
      fork = <span className="tool-button" onClick={this.forkClickHandler}>Fork</span>
    }

    if(!this.state.titleEditing) {
      editIcon = <i className='iconfont icon-edit' onClick={this.editTitle}></i>
      title = this.props.title
    }else {
      title = <input className='title-input' ref={ref => this.titleInputRef = ref}  value={this.props.title} onChange={this.handleTitleChange} onBlur={this.stopEditTitle} />
    }

    return (
      <div className="nav-container">
        <p className="nav-brand" onClick={newClickHandler}><i className="iconfont icon-cube"></i> WebGL.Run</p>
        <p className="title">{title}{editIcon}</p>
        <div className="nav-tool">
          <span className="tool-button" onClick={newClickHandler}>New</span>
          {save}
          {fork}
          {auth}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav as any)
