import React from 'react'
import PropTypes from 'prop-types'

const Users = (props) => {
  const { selectedUsers } = props

  return (
    <>
    <h2 className="ui icon header center aligned">
      <i className="circular users icon"></i>
      Selected Users	
    </h2>
    <div className="ui grid">
      <div className="row">
        <div className="column">
        {selectedUsers.map(({ id, position, company, profile, name }) => (
          <div key={id}>
	    <div className="ui horizontal divider">
	      {company}
            </div>
	    <div className="ui column grid">
	      <div className="two wide column">
                <i className="user circle outline icon"></i>
                {name}
	      </div>
	      <div className="two wide column">
		<span>{`ID #${id}`}</span>
                {profile.gender === 'M' ? <i className="male icon"></i> : <i className="female icon"></i>}
	      </div>
	      <div className="two wide column">Age: {profile.age}</div>
	      <div className="two wide column">
		<i className="globe icon"></i>
	        {profile.planet}
	      </div>
	      <div className="four wide column">
		<i className="gavel icon"></i>
	        {position}	
	      </div>
	      <div className="two wide column">
		<i className="heartbeat icon"></i>
		{profile.status}
	      </div>
	    </div>
        </div>
      ))}
      </div>
      </div>
    </div>
    </>
  )
}

Users.propTypes = {
  selectedUsers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      company: PropTypes.string.isRequired,
      position: PropTypes.string.isRequired,
      profile: PropTypes.shape({
        age: PropTypes.number.isRequired,
	gender: PropTypes.string.isRequired,
	planet: PropTypes.string.isRequired,
	species: PropTypes.string.isRequired,
	status: PropTypes.string.isRequired
      })
    })
  ).isRequired
}

export default Users
