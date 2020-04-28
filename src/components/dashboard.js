import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';

function Dashboard(props) {
	const status = props.location.state || false 

	const [currUser] = useState(status)
	console.log(currUser)

	return (
		<section className="dashboard">
			{currUser ? <p className="hero-dashboard">DASHBOARD</p>
				: <Redirect to='/login' />}
		</section>
	)
}

export default Dashboard