import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

function Dashboard (props) {
  console.log(props)
  
  const status = props.location.state.currUser

  const [currUser] = useState(status)

  return (
    <section className="dashboard">
      { currUser ? <p className="hero-dashboard">DASHBOARD</p>
        : <Redirect to='/login' />}
    </section>
  )
}

export default Dashboard
