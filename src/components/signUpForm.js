import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function signUpForm() {
	const [newUserName, setNewUserName] = useState('');
	const [newEmail, setNewEmail] = useState('');
	const [newPassWord, setNewPassWord] = useState('');
	const [signUpSuccess, setSignUpSuccess] = useState(false);
	const [error, setError] = useState('');
	const signup = (e) => {
		e.preventDefault();
		axios
			.post('https://salty-basin-04868.herokuapp.com/new_user', {
				userName: newUserName,
				passWord: newPassWord,
				email: newEmail,
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
					onChange={(e) => setNewUserName(e.target.value)}
				/>
				<label className='form-label'>EMAIL</label>
				<input
					className='form-input'
					type='text'
					name='email'
					onChange={(e) => setNewEmail(e.target.value)}
				/>
				<label className='form-label'>PASSWORD</label>
				<input
					className='form-input'
					type='password'
					name='password'
					onChange={(e) => setNewPassWord(e.target.value)}
				/>
				<input className='form-submit-button' type='submit' value='SUBMIT' />
			</form>
			<p className='info-signup-form'>I only use your email for the purposes of PEER PRESSURE</p>
			{signUpSuccess === true ? <Redirect to='/login' /> : null}
		</section>
	);
}

export default signUpForm;
