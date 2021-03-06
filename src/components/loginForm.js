import React, { useState, useContext } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { CurrUserContext } from './currUserContext.js';

function LoginForm() {
	const { currUser, setCurrUserContext } = useContext(CurrUserContext);
	const [currUserName, setCurrUserName] = useState('');
	const [currUserPassWord, setCurrUserPassWord] = useState('');
	const [loggedIn, setLoggedIn] = useState(false);
	const [error, setError] = useState('');
	localStorage.setItem("currUser", JSON.stringify(currUser))
	const login = (e) => {
		e.preventDefault();
		axios
			.post('https://salty-basin-04868.herokuapp.com/login', {
				userName: currUserName,
				passWord: currUserPassWord,
			})
			.then((res) => {
				if (res.status === 201) {
					setCurrUserContext(res.data);
					setLoggedIn(true);
					localStorage.setItem('loggedIn?', 'true');
				}
			})
			.catch((err) => {
				setError(err);
				setLoggedIn(false);
			});
	};
	return (
		<section className='form-container'>
			<p className='hero-signup__top'>LOGIN</p>
			{error ? <p className='info-signup-form'>{error.message}</p> : null}
			<form className='signup-form' onSubmit={(e) => login(e)}>
				<label className='form-label'>USERNAME</label>
				<input
					className='form-input'
					type='text'
					name='username'
					onChange={(e) => setCurrUserName(e.target.value)}
				/>
				<label className='form-label'>PASSWORD</label>
				<input
					className='form-input'
					type='password'
					name='password'
					onChange={(e) => setCurrUserPassWord(e.target.value)}
				/>
				<input className='form-submit-button' type='submit' value='SUBMIT' />
			</form>
			{loggedIn ? (
				<Redirect
					to={{
						pathname: `/dashboard/curr_user=${currUserName}/get_user_dashboard`,
						state: { currUserName: currUserName },
					}}
				/>
			) : (
				<Redirect to='/login' />
			)}
		</section>
	);
}
export default LoginForm;
