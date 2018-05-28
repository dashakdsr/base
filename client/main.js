import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
// import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Home from './components/Home.jsx'
import { store, history } from './services/store.js'

console.log(Home)
ReactDOM.render((
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={Home} />
    </Router>
    {/* <Home /> */}
  </Provider>),
  document.getElementById('mount-point')
)
