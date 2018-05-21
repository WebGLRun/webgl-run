import * as React from 'react'
import * as qs from 'qs'
import * as axios from 'axios'
import {connect, Dispatch} from 'react-redux'
import {generateRandomString, popup} from '../../utils/utils'
import {message} from 'antd'
import 'antd/lib/message/style/index.css'
import './Nav.scss'

interface NavProps {
  title: string
}

interface NavStates {
  userData: Object | null
}

const mapStateToProps = (state: RootState) => {
  return {
    title: state.title
  }
}

class Nav extends React.Component<NavProps> {

  constructor(props: NavProps) {
    super(props)
  }

  state: NavStates = {
    userData: null
  }

  loginClickHandler = () => {
    let state = generateRandomString()
    popup(`https://github.com/login/oauth/authorize?client_id=b51c53f84d3a8df0ed43&scope=read:user&state=${state}`, 'Github OAuth', 600, 400)
  }

  componentWillMount() {
    let params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    })

    window.addEventListener('storage', e => {
      if(e.key === 'message') {
        if(!e.newValue) {
          return
        }
        let msg = JSON.parse(e.newValue)
        localStorage.setItem('webglrun:oauthType', msg.oauthType)
        localStorage.setItem('webglrun:token', msg.token)
        localStorage.setItem('webglrun:userData', JSON.stringify(msg.userData))
        this.setState({
          userData: msg.userData
        })
        message.success('Github log in successfully!')
      }
    })
  }

  render() {
    return (
      <div className="nav-container">
        <p className="nav-brand"><i className="iconfont icon-cube"></i> WebGL.Run</p>
        <p className="title">{this.props.title}</p>
        <div className="nav-tool">
          {this.state.userData ? '' : <span className="tool-button login" onClick={this.loginClickHandler}>Login</span>}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Nav)
