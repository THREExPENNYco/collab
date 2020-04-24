import React from 'react'
import Form from './form.js'
import Home from './home.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

function NavBar() {

  return (
    <Router>
      <div className="nav-bar">
        <p className="logo"><Link to='/'>PEER PRESSURE</Link></p>
        <p className="login"><Link to='/login'>LOGIN</Link></p>
      </div>
      <Route path='/' component={Home} />
      <Route path='/login' component={Form} /> 
    </Router>
  )
}

export default NavBar
