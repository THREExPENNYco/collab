import React, { Component } from 'react'
import Home from './components/home.js'
import LoginForm from './components/loginForm.js'
import SignUpForm from './components/signUpForm.js'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Styles from './Styles.css'

// Main component for the app
class App extends Component {
  render () {
    return (
      <Router>
        <div className="nav-bar">
          <p className="logo"><Link to='/'>PEER PRESSURE</Link></p>
          <div className="login-signup">
            <p className="login"><Link to='/login'>LOGIN</Link></p>
            <p className="signup"><Link to='/signup'>SIGN UP</Link></p>
          </div>
        </div>
        <Route exact path='/' component={Home} />
        <Route path='/login' component={LoginForm} />
        <Route path='/signup' component={SignUpForm} />
      </Router>
    )
  }
}

export default App
