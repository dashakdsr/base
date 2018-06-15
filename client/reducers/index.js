import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import user from './user.js'

export default combineReducers({
  router: routerReducer,
  user: user
})
