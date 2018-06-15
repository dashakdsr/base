import update from 'immutability-helper'
import {ADD_USER} from '../actions/user'

const defaultState = {}

export default function user (state = defaultState, action) {
  console.log('reducer', state, action)
  switch (action.type) {
    case ADD_USER:
      return update(state, {
        $set: action.user
      })
    default:
    return state
  }
}
