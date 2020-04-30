/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Dashboard (props) {
  const currUser = props.location.state.currUser
  const [currUserData, setCurrUserData] = useState('')
  const [error, setError] = useState('')
  useEffect(() => {
    axios
      .get(`http://localhost:3030/dashboard/${currUser}`, { withCredentials: true })
      .then((res) => {
        if (res.status === 200) {
          const userData = res.data
          setCurrUserData(userData)
        }
      })
      .catch((err) => {
        setError(err)
      })
  }, [])
  return (
    <section className="dashboard">
	<section className="dashboard-hero"> 
		<h1>DASHBOARD</h1>
	</section>
	  <section className="dashboard-info"> 
	  	<section className="dashboard-info__section">
			<h1 className="dashboard-info__section-header">
				GROUPS
			</h1> 
			<section className="dashboard-info__section-info"> 
				List Of Groups
			</section>
		</section>
		<section className="dashboard-info__section">
			<h1 className="dashboard-info__section-header"> 
				GOALS
			</h1>
			<section className="dashboard-info__section-info"> 
				List Of Goals
			</section>
		</section>
		</section>
      { currUser ?  null : <Redirect to='/login' />  }
    </section>
  )
}

export default Dashboard
