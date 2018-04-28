import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import Iframe from '../../utils/iframe'
import {createElement} from '../../utils/createElement'
import './Result.scss'

interface ResultProps {
  result: string
}

interface ResultState {
  iframe: null | Iframe
}

const mapStateToProps = (state: RootState) => {
  return {
    result: state.result.content
  }
}

class Result extends React.Component<ResultProps> {

  constructor(props: ResultProps) {
    super(props)
  }

  state: ResultState = {
    iframe: null
  }

  render() {
    return (
      <div className="result-container editor-item">
        <header>Result</header>
        <div className="result-content">
          <div id="result-hook" ref="resultHook"></div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.state.iframe = new Iframe(this.refs.resultHook as HTMLElement)
    this.state.iframe.setHTML(this.props.result)
  }

  componentDidUpdate(prevProps: ResultProps) {
    if(this.props.result !== prevProps.result) {
      if(this.state.iframe) {
        this.state.iframe.setHTML(this.props.result)
      }
    }
  }
}

export default connect(mapStateToProps)(Result)
