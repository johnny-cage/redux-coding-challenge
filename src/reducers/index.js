import { combineReducers } from 'redux'
import users from './users'
import error from './error'
import selection from './selection'

const rootReducer = combineReducers({
  users,
  error,
  selection
})

export default rootReducer


