import React from 'react'
import { Link, Route, withRouter } from 'react-router-dom'
import {connect} from 'react-redux'
import {dropdownMenu} from '../constants/index.js'

import News from './news/News.jsx'
import Championships from './championships/Championships.jsx'
import Games from './games/Games.jsx'
import Login from './login/Login.jsx'
import Registration from './registration/Registration.jsx'
import AddContent from './addContent/AddContent.jsx'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      openMenu: false,
      user: {},
      menu: dropdownMenu
    }

    this.openMenu = this.openMenu.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    console.log('nextProps in Home', nextProps)
    if (this.props !== nextProps) {
      console.log('ofifififiiff')
      this.setState({
        user: nextProps.user
      }, () => {
        console.log('this state', this.state.user)
        if (this.state.user.userId === 1) {
          console.log('push')
          dropdownMenu.push({
            title: 'addContent'
          })
          this.setState({
            menu: dropdownMenu
          })
        }
      })
    }
  }

  openMenu (key, item) {
    if (item.subtitles) {
      this.setState({
        openMenu: key === this.state.openMenu ? false : key
      })
    } else {

    }
  }

  render () {
    console.log('render')
    return (
      <div className='shopping-list'>
        <div className='dropdown-wrapper'>
          {this.state.menu.map((item, index) => {
            console.log('item', item)
            return <div key={index + '' + item.title} onClick={() => this.openMenu(index + '' + item.title, item)}>
              <Link to={`/${item.title.toLowerCase()}`}>{item.title}</Link>
              <div className='wrapper-list-dropdown'>
                { item.subtitles
              ? item.subtitles.map((subItem, index) => {
                return <div key={index + '' + subItem.title} onClick={() => this.openMenu(index + '' + item.title, item)}>
                  <a>{subItem.title}</a></div>
              })
              : null }
              </div> </div>
          })}
        </div>
        <Route path='/news/' component={News} />
        <Route path='/championships/' component={Championships} />
        <Route path='/games/' component={Games} />
        <Route path='/login/' component={Login} />
        <Route path='/registration/' component={Registration} />
        <Route path='/addcontent/' component={AddContent} />
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)
