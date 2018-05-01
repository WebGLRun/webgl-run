import * as React from 'react'
import {connect, Dispatch} from 'react-redux'
import './Nav.scss'

interface NavProps {
  title: string
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

  render() {
    return (
      <div className="nav-container">
        <p className="nav-brand">WebGL Playground</p>
        <p className="title">{this.props.title}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps)(Nav)
