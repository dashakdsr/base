import React from 'react'
import Dropdown, {DropdownTrigger, DropdownContent} from 'react-simple-dropdown'

import {dropdownMenu} from '../constants/index.js'

class Home extends React.Component {
  render () {
    console.log('render')
    return (
      <div className='shopping-list'>
        <div className='dropdown-wrapper'>
          {dropdownMenu.map((item, index) => {
            return <Dropdown key={index + '' + item.title}>
              <DropdownTrigger>{item.title}</DropdownTrigger>
              <div className='wrapper-list-dropdown'>
                { item.subtitles
              ? item.subtitles.map((subItem, index) => {
                return <DropdownContent key={index + '' + subItem.title}>
                  <a>{subItem.title}</a></DropdownContent>
              })
              : <DropdownContent className='empty' /> }
              </div> </Dropdown>
          })}
        </div>
      </div>
    )
  }
}

export default Home
