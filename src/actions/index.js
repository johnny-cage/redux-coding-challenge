export const USERS_REQUEST = 'USERS_REQUEST'
export const USERS_SUCCESS = 'USERS_SUCCESS'
export const USERS_FAILURE = 'USERS_FAILURE'

export const SELECT_USERS = 'SELECT_USERS'

const usersError = error => ({
  type: USERS_FAILURE,
  error
})

const setUsers = users => ({
  type: USERS_SUCCESS,
  users
})

export const selectUsers = users => ({
  type: SELECT_USERS,
  users
})

export const loadUsers = () => {
  return dispatch => {
    return fetch('https://immense-bastion-95145.herokuapp.com/api/users')
        .then(response => response.json())
	.then(data => dispatch(setUsers(data.users)))
	.catch(error => dispatch(usersError(error)))
  }
}
