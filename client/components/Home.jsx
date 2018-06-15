import React from 'react'
import { Link, Route } from 'react-router-dom'
import {dropdownMenu} from '../constants/index.js'

import News from './news/News.jsx'
import Championships from './championships/Championships.jsx'
import Games from './games/Games.jsx'

class Home extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      openMenu: false
    }

    this.openMenu = this.openMenu.bind(this)
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
          {dropdownMenu.map((item, index) => {
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
      </div>
    )
  }
}

export default Home
