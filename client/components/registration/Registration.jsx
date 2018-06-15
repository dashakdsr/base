import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import {signUp} from './../../services/api.js'
import {addUser} from './../../actions/user.js'

class Registration extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      user: {
        username: '',
        firstName: '',
        lastName: '',
        dateBirth: '',
        pass: ''
      },
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
    signUp(this.state.user).then(result => {
      if (result) {
        this.props.addUser(result)
      }
    })
  }

  goToPage () {
    this.props.history.push({
      pathname: '/login'
    })
  }

  render () {
    console.log('render')
    return (
      <div>
        <label>
          Username:
        <input type="text" name="name" value={this.state.user.username} onChange={(event) => {
          console.log('dflkjrdlhg', event.target.value)
          this.setState({
            user: Object.assign(this.state.user, { username: event.target.value })
          })
        }}></input>
        </label>
        <label>
          Password:
        <input type="password" name="password" value={this.state.user.pass} onChange={(event) => {
          console.log('valie', event.target.value)
          this.setState({
            user: Object.assign(this.state.user, { pass: event.target.value })
          })
        }}></input>
        </label>
        <label>
          First Name:
        <input type="text" name="firstName" value={this.state.user.firstName} onChange={(event) => {
          console.log('valie', event.target.value, this.state.user)
          this.setState({
            user: Object.assign(this.state.user, { firstName: event.target.value })
          })
        }}></input>
        </label>
        <label>
          Last Name:
        <input type="text" name="firstName" value={this.state.user.lastName} onChange={(event) => {
          console.log('valie', event.target.value, this.state.user)
          this.setState({
            user: Object.assign(this.state.user, { lastName: event.target.value })
          })
        }}></input>
        </label>
        <label>
          Date of Birth:
        <input type="date" name="firstName" value={this.state.user.dateBirth} onChange={(event) => {
          console.log('valie', event.target.value, this.state.user)
          this.setState({
            user: Object.assign(this.state.user, { dateBirth: event.target.value })
          })
        }}></input>
        </label>
        <button onClick={this.click}>Registrate</button>
        <button onClick={this.goToPage}>Login</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(Registration)
