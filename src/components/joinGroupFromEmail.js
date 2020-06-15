import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function joinGroupFromEmail(props) {
	useEffect(() => { 
        axios
            .get(`https://www.salty-basin-04868.herokuapp.com/`)
    }, [])
	return (
		<section className='form-container'>
			<p className='hero-signup__top'>CREATE</p>
			<p className='hero-signup__bottom'>GROUP</p>
			<form className='signup-form' onSubmit={(e) => handleCreateGroup(e)}>
				<label className='form-label'>GROUP NAME</label>
				<input
					className='form-input'
					type='text'
					name='username'
					onChange={(e) => setGroupName(e.target.value)}
				/>
				<input className='form-submit-button' type='submit' value='SUBMIT' />
			</form>
			{createGroup ? (
				<Redirect
					to={{
						pathname: `/dashboard/curr_user=${userName}`,
						state: { currUser: userName },
					}}
				/>
			) : null}
		</section>
	);
}

export default NewGroupForm;