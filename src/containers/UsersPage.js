import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { selectUsers, loadUsers } from '../actions'
import UsersSelection from '../components/UsersSelection'
import UsersList from '../components/Users'
import { connect } from 'react-redux'

class UsersPage extends Component {
  static propTypes = {
    users: PropTypes.array,
    error: PropTypes.string,
    selection: PropTypes.arrayOf(PropTypes.number),
    selectedUsers: PropTypes.array,
    selectUsers: PropTypes.func.isRequired,
    loadUsers: PropTypes.func.isRequired
  }

  componentDidMount() {
    this.props.loadUsers()
  }

  render() {
    const {
      users,
      error,
      selectUsers,
      selectedUsers
    } = this.props

    if (error) {
      return <div>An error occurred {error}</div>
    }

    if (!users) {
      return <>Loading...&nbsp;<div className="ui active inline loader"></div></>
    }

    return (
      <>
        <UsersSelection users={users} onChange={selectUsers} /> 
        {selectedUsers.length > 0 && <UsersList selectedUsers={selectedUsers} />}
      </>
    )
  }
}

const mapStateToProps = state => ({
  users: state.users,
  error: state.error,
  selection: state.selection,
  selectedUsers: state.users && state.users.filter(({ id }) => state.selection.includes(id))
})

export default connect(mapStateToProps, {
  selectUsers,
  loadUsers
})(UsersPage)
