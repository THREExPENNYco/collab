/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

function Dashboard (props) {
  console.log(props)
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
      { currUser ? <p className="hero-dashboard">DASHBOARD</p>
        : <Redirect to='/login' />}
    </section>
  )
}

export default Dashboard
