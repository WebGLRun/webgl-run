import * as React from 'react'
import * as qs from 'qs'
import * as Cookies from 'js-cookie'
import {connect, Dispatch} from 'react-redux'
import {generateRandomString, popup} from '../../utils/utils'
import {message} from 'antd'
import {setUser} from '../../store/actions'
import 'antd/lib/message/style/index.css'
import './Nav.scss'

interface NavProps {
  title: string,
  user: UserInfo,
  setUser: Function
}

const mapStateToProps = (state: RootState) => {
  return {
    title: state.title,
    user: state.user
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setUser(user: UserInfo) {
      dispatch(setUser(user))
    }
  }
}

class Nav extends React.Component<NavProps> {

  constructor(props: NavProps) {
    super(props)
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
        message.success('Github log in successfully!')
        this.props.setUser({
          oauthType: msg.oauthType,
          nickName: msg.userData.login
        })
      }
    })

    this.checkUserStatus()
  }

  checkUserStatus = () => {
    let oauthType = Cookies.get('webgl-run-user-oauth-type')
    let nickName = Cookies.get('webgl-run-user-nick-name')
    if(oauthType && nickName) {
      this.props.setUser({
        oauthType,
        nickName
      })
    }else {
      this.props.setUser(null)
    }
  }

  render() {
    let auth
    if(!this.props.user) {
      auth = <span className="tool-button login" onClick={this.loginClickHandler}>Log in with Github</span>
    }else {
      auth = <span className="tool-button">{this.props.user.nickName}</span>
    }

    return (
      <div className="nav-container">
        <p className="nav-brand"><i className="iconfont icon-cube"></i> WebGL.Run</p>
        <p className="title">{this.props.title}</p>
        <div className="nav-tool">
          {auth}
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav as any)
