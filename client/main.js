import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Switch, Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import Home from './components/Home.jsx'
import { store, history } from './services/store.js'

ReactDOM.render((
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path='/' component={Home} />
      </Switch>
    </ConnectedRouter>
  </Provider>),
  document.getElementById('mount-point')
)
