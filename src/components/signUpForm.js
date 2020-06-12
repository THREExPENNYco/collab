import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function signUpForm() {
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [passWord, setPassWord] = useState('');
	const [success, setSignUpSuccess] = useState(false);
	const [error, setError] = useState('');
	const signup = (e) => {
		e.preventDefault();
		axios
			.post('https://salty-basin-04868.herokuapp.com/new_user', {
				userName: userName,
				passWord: passWord,
				email: email,
			})
			.then((res) => {
				if (res.status === 201) {
					setSignUpSuccess(true);
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	return (
		<section className='form-container'>
			<p className='hero-signup__top'>SIGN</p>
			<p className='hero-signup__bottom'>UP</p>
			<form className='signup-form' onSubmit={(e) => signup(e)}>
				<label className='form-label'>USERNAME</label>
				<input
					className='form-input'
					type='text'
					name='username'
					onChange={(e) => setUserName(e.target.value)}
				/>
				<label className='form-label'>EMAIL</label>
				<input
					className='form-input'
					type='text'
					name='email'
					onChange={(e) => setEmail(e.target.value)}
				/>
				<label className='form-label'>PASSWORD</label>
				<input
					className='form-input'
					type='password'
					name='password'
					onChange={(e) => setPassWord(e.target.value)}
				/>
				<input className='form-submit-button' type='submit' value='SUBMIT' />
			</form>
			<p className='info-signup-form'>I only use your email for the purposes of PEER PRESSURE</p>
			{success === true ? <Redirect to='/login' /> : null}
		</section>
	);
}

export default signUpForm;
