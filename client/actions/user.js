export const ADD_USER = 'ADD_USER'

export function addUser (user) {
  console.log('action', user)
  return dispatch => {
    dispatch({
      type: ADD_USER,
      user
    })
  }
}
