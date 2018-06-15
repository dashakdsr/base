import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {signIn} from './../../services/api.js'
import {addUser} from './../../actions/user.js'

class Login extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      username: '',
      pass: ''
    }

    this.click = this.click.bind(this)
    this.goToPage = this.goToPage.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps && nextProps.user) {
      nextProps.history.push({
        pathname: '/home'
      })
    }
  }

  click () {
    signIn(this.state).then(result => {
      if (result) {
        this.props.addUser(result)
      }
    })
  }

  goToPage () {
    this.props.history.push({
      pathname: '/registration'
    })
  }

  render () {
    console.log('render')
    return (
      <div>
        <label>
          Username:
        <input type="text" name="name" value={this.state.username} onChange={(event) => {
          console.log('dflkjrdlhg', event.target.value)
          this.setState({
            username: event.target.value
          })
        }}></input>
        </label>
        <label>
          Password:
        <input type="password" name="password" value={this.state.pass} onChange={(event) => {
          console.log('valie', event.target.value)
          this.setState({
            pass: event.target.value
          })
        }}></input>
        </label>
        <button onClick={this.click}>Login</button>
        <button onClick={this.goToPage}>Registration</button>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {user: state.user}
}

function mapDispatchToProps(dispatch) {
  return {
    addUser: (value) => {
      addUser(value)(dispatch)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)
