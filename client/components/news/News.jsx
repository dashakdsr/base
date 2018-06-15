import React from 'react'
import {getNews} from './../../services/api.js'

class News extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      news: []
    }
  }

  componentWillMount () {
    this.setState({
      news: getNews()
    })
  }

  render () {
    console.log('render')
    return (
      <div class="wrapper-news">
        {this.state.news.map((item) => {
          return <div class="item-new">
          </div>
        })}
      </div>
    )
  }
}

export default News
