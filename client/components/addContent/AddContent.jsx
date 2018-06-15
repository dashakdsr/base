import React from 'react'

class AddContent extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showTab: ''
    }

    this.changeTab = this.changeTab.bind(this)
  }

  changeTab (value) {
    this.setState({
      showTab: value
    })
  }

  render () {
    console.log('render')
    return (
      <div>
        <h1>Hello, world AddContent!</h1>
        <button onClick={() => this.changeTab('game')}>Add Game</button>
        <button onClick={() => this.changeTab('new')}>Add New</button>
        <button onClick={() => this.changeTab('championship')}>Add Championship</button>
        <button onClick={() => this.changeTab('file')}>Add File</button>
        <button onClick={() => this.changeTab('video')}>Add Video</button>

        {this.state.showTab === 'game'
        ? <div>Add game</div>
        : this.state.showTab === 'new'
        ? <div>Add New</div>
        : this.state.showTab === 'championship'
        ? <div>Add Championship</div>
        : this.state.showTab === 'file'
        ? <div>Add Fle</div>
        : <div>Add Video</div>}
      </div>
    )
  }
}

export default AddContent
