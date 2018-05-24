import * as React from 'react'
import * as qs from 'qs'
import http from '../../api/http'
import {sendMessage, wait} from '../../utils/utils'
import './OAuth.scss'

interface OAuthProps {
  match: {
    params: {
      source: string
    }
  }
}

class OAuth extends React.Component<OAuthProps> {

  state = {
    info: ''
  }

  async componentWillMount() {
    let params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true
    })
    if(this.props.match.params.source === 'github') {
      if(params.code) {
        let result = await http.request({
          method: 'POST',
          url: 'https://api.webgl.run/oauth/github',
          data: {
            code: params.code
          }
        })
        if(result.data.success) {
          sendMessage(JSON.stringify({
            token: result.data.token,
            userData: result.data.userData,
            oauthType: 'github',
            id: result.data.id
          }))
          setTimeout(() => {
            window.close()
          }, 0)
        }else {
          this.state.info = result.data.error
        }
      }
    }
  }

  render() {
    return (
      <div className="oauth-container">
        <p>Logining...</p>
        <p>{this.state.info}</p>
      </div>
    )
  }
}

export default OAuth
