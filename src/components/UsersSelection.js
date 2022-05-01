import React from 'react'
import PropTypes from 'prop-types'

const UsersSelection = (props) => {
  const { users, onChange } = props

  if (!users.length) {
    return <div>No users were found...</div>
  }

  const handleChange = e => {
    const { selectedOptions } = e.target
    const selectedOptionsToArray = Array.from(selectedOptions)

    const userIds = selectedOptionsToArray.map(({ value }) => parseInt(value, 10))
    
    onChange(userIds)
  }

  return (
    <div className="select">
      <select onChange={handleChange} multiple>
        {users.map(({ id, name, company }) => <option key={id} value={id}>{name} - {company}</option>)}
      </select>
    </div>
  )
}

UsersSelection.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
}

export default UsersSelection
