import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

function Dashboard(props) {
	const status = props.location.state || false 

	const [loginStatus] = useState(status)
	
	return (
		<section className="dashboard">
			{ loginStatus.loggedIn ? <p className="hero-dashboard">DASHBOARD</p>
				: <Redirect to='/login' /> }
		</section>
	)
}

export default Dashboard