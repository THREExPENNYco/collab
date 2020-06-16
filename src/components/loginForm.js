import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function LoginForm() {
	const [currUserName, setCurrUserName] = useState('');
	const [currUserPassWord, setCurrUserPassWord] = useState('');
	const [loggedInBool, setLoginBool] = useState(false);
	const [error, setError] = useState('');
	const login = (e) => {
		e.preventDefault();
		axios
			.post('https://salty-basin-04868.herokuapp.com/login', {
				userName: currUsernNme,
				passWord: currUserPassWord,
			})
			.then((res) => {
				if (res.status === 200) {
					setCurrUserName(res.data.userName);
					setLoginBool(true);
				}
			})
			.catch((err) => {
				setError(err);
				setLoginBool(false);
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
			{loggedInBool === true ? (
				<Redirect
					to={{
						pathname: `/dashboard/curr_user=${currUseName}`,
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
