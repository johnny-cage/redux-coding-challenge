import { USERS_FAILURE } from '../actions'

const reducer = (state = null, action) => {
  switch(action.type) {
    case USERS_FAILURE:
      return action.error.message || action.error
    default:
      return state
  }
}

export default reducer
