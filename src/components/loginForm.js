import React, { useState } from 'react'
import { Redirect } from 'react-router-dom';
import axios from 'axios'

function LoginForm() {

	const [currUser, setUserName] = useState('')
	const [userPassWord, setPassWord] = useState('')
	const [loggedIn, setLogin] = useState(false)
	const [error, setError] = useState('')
	
	function login(e) {
		e.preventDefault()
		axios
			.post('http://localhost:3030/login', {
				userName: currUser,
				passWord: userPassWord,
			})
			.then((res) => {
				if (res.status == 200)
				setLogin(true)
			})
			.catch((err) => {
				setError(err)
				setLogin(false)
			}
			)
	}
	return (
		<section className="form-container">
			<p className="hero-signup__sign">LOGIN</p>
			{ error ? <p className="info-signup-form">{ error.message }</p> : null }
			<form className="signup-form" onSubmit={login}>
				<label className="form-label">USERNAME</label>
				<input className="form-input" type='text' name="username" onChange={(e) => setUserName(e.target.value)} />
				<label className="form-label">PASSWORD</label>
				<input className="form-input" type="text" name="password" onChange={(e) => setPassWord(e.target.value)} />
				<input className="form-submit-button" type="submit" value="SUBMIT" />
			</form>
			{ loggedIn ? <Redirect to={{pathname: "/dashboard", state: { loggedIn: loggedIn } }} /> : <Redirect to='/login' /> }
		</section>
	)
}
export default LoginForm
