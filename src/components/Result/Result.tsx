import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import Iframe from '../../utils/iframe'
import {createElement} from '../../utils/createElement'
import './Result.scss'

interface ResultProps {
  result: string
}

interface passedProps {
  showTitle: Boolean
}

interface ResultState {
  iframe: null | Iframe,
  showConsole: boolean,
  fullScreen: boolean,
  showMeter: boolean
}

const mapStateToProps = (state: RootState) => {
  return {
    result: state.result.content
  }
}

class Result extends React.Component<ResultProps & passedProps> {

  constructor(props: ResultProps & passedProps) {
    super(props)
  }

  state: ResultState = {
    iframe: null,
    showConsole: true,
    fullScreen: false,
    showMeter: false
  }

  fullScreenStyle = {
    position: 'fixed',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 9999
  }

  consoleIconClickHandler = () => {
    if(this.state.iframe) {
      if(this.state.showConsole) {
        (this.state.iframe as any).$dom.contentWindow.vConsole.hide()
      }else {
        (this.state.iframe as any).$dom.contentWindow.vConsole.show()
      }
    }
  }

  refreshIconClickHandler = () => {
    if(this.state.iframe) {
      this.state.iframe.setHTML(this.props.result)
      setTimeout(() => {
        if(this.state.iframe) {
          if(this.state.showConsole) {
            (this.state.iframe as any).$dom.contentWindow.vConsole.show()
          }
        }
      }, 200)
    }
  }

  fullScreenIconClickHandler = () => {
    this.setState({
      fullScreen: !this.state.fullScreen
    })
  }

  meterIconClickHandler = () => {
    if(this.state.iframe) {
      if(this.state.showMeter) {
        (this.state.iframe as any).$dom.contentWindow._meterHide()
      }else {
        (this.state.iframe as any).$dom.contentWindow._meterShow()
      }
    }
  }

  render() {
    return (
      <div className="result-container editor-item" style={this.state.fullScreen ? this.fullScreenStyle as any : {}}>
        {this.props.showTitle ?
          <header>Result
            <i className={`iconfont icon-meter ${this.state.showMeter ? 'active' : ''}`} onClick={this.meterIconClickHandler}></i>
            <i className={`iconfont icon-console ${this.state.showConsole ? 'active' : ''}`} onClick={this.consoleIconClickHandler}></i>
            <i className={`iconfont ${this.state.fullScreen ? 'icon-fullscreenexit' : 'icon-full-screen'}`} onClick={this.fullScreenIconClickHandler}></i>
            <i className="iconfont icon-refresh" onClick={this.refreshIconClickHandler}></i>
          </header> : ''
        }
        <div className="result-content">
          <div id="result-hook" ref="resultHook"></div>
        </div>
      </div>
    )
  }

  showConsole = () => {
    this.setState({
      showConsole: true
    })
  }

  hideConsole = () => {
    this.setState({
      showConsole: false
    })
  }

  showMeter = () => {
    this.setState({
      showMeter: true
    })
  }

  hideMeter = () => {
    this.setState({
      showMeter: false
    })
  }

  componentDidMount() {
    (window as any).showConsole = this.showConsole
    ;(window as any).hideConsole = this.hideConsole
    ;(window as any).showMeter = this.showMeter
    ;(window as any).hideMeter = this.hideMeter
    this.state.iframe = new Iframe(this.refs.resultHook as HTMLElement)
    this.state.iframe.setHTML(this.props.result)
    setTimeout(() => {
      if(this.state.showConsole) {
        (this.state.iframe as any).$dom.contentWindow.vConsole.show()
      }
    }, 100);
  }

  componentDidUpdate(prevProps: ResultProps) {
    if(this.props.result !== prevProps.result) {
      if(this.state.iframe) {
        this.state.iframe.setHTML(this.props.result)
        setTimeout(() => {
          if(this.state.iframe) {
            if(this.state.showConsole) {
              (this.state.iframe as any).$dom.contentWindow.vConsole.show()
            }
            if(this.state.showMeter) {
              (this.state.iframe as any).$dom.contentWindow._meterShow()
            }
          }
        }, 500)
      }
    }
  }
}

export default connect(mapStateToProps)(Result)
