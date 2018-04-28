import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import Iframe from '../../utils/iframe'
import {createElement} from '../../utils/createElement'
import {} from '../../store/actions'

interface ResultProps {
  result: string
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

  state = {
    iframe: null
  }

  render() {
    return (
      <div className="result-container editor-item">
        <header>Result</header>
        <div className="result-content">
          <p>{this.props.result}</p>
          <div id="result-hook" ref="resultHook"></div>
        </div>
      </div>
    )
  }

  componentDidMount() {
    let iframe = new Iframe(this.refs.resultHook as HTMLElement)
    this.setState({
      iframe: iframe
    })
    iframe.setHTML(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Webgl-playground Result</title>
      </head>
      <body>
        <div class="test">test</div>
      </body>
    </html>
    `)
  }

}

export default connect(mapStateToProps)(Result)
