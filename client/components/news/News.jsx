import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {format} from 'date-fns'

import {getNews} from './../../services/api.js'

class News extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      news: []
    }
  }

  componentWillMount () {
    console.log('this.props', this.props.news)
    getNews().then(result => {
      console.log('reultrl;trkjlkght', result)
      this.setState({
        news: result
      })
    })
    // this.props.news().then(result => {
    //   console.log('qwerty',result )
    //   this.setState({
    //     news: result
    //   })
    // })
  }

  render () {
    console.log('render', this.state.news)
    return (
      <div className="wrapper-news">
        {this.state.news.map((item) => {
          return <div className="item-new" key={item.newId}>
            <img src={item.newImage} alt={item.newName}/>
            <div className="info-new-wrapper">
              <p className="title">{item.newName}</p>
              <p className="desc">{item.newDesc.substring(0, 250) + '...'}</p>
              <p className="date">{format(item.newDate, 'DD.MM.YYYY HH:mm')}</p>
            </div>
            </div>
        })}
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {news: getNews()}
}

function mapDispatchToProps(dispatch) {
  return {actions: bindActionCreators(dispatch)
}}

export default connect(mapStateToProps, mapDispatchToProps)(News)
