import { USERS_SUCCESS } from '../actions'

const reducer = (state = null, action) => {
  switch(action.type) {
    case USERS_SUCCESS:
      return action.users
    default:
      return state
  }
}

export default reducer
