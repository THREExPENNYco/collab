import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function NewGroupForm(props) {
	const passedCurrUserId = props.location.state.currUserData._id;
	const passedCurrUserName = props.location.state.currUserData.userName;
	const [newGroupName, setNewGroupName] = useState('');
	const [error, setError] = useState(null);
	const [createdGroup, setCreateGroupSuccess] = useState(false);

	const handleCreateGroup = (e) => {
		e.preventDefault();
		axios
			.post(`https://salty-basin-04868.herokuapp.com/user_id?=${passedCurrUserId}/create_group`, {
				createdBy: passedCurrUserName,
				groupName: newGroupName,
			})
			.then((res) => {
				if (res.status === 200) {
					setCreateGroupSuccess(true);
					addGroupToUser(res.data);
					addUserToGroup(res.data);
				}
			})
			.catch((err) => {
				setError(err);
			});
	};

	const addUserToGroup = (data) => {
		axios
			.post(
				`https://salty-basin-04868.herokuapp.com/user_id?=${passedCurrUserId}/group_id?=${data}/add_user_to_group`
			)
			.then(() => {})
			.catch((err) => {
				setError(err);
			});
	};

	const addGroupToUser = (data) => {
		axios
			.post(
				`https://salty-basin-04868.herokuapp.com/user_id?=${passedCurrUserId}/group_id?=${data}/group_to_user`
			)
			.then(() => {})
			.catch((err) => {
				setError(err);
			});
	};
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
					onChange={(e) => setNewGroupName(e.target.value)}
				/>
				<input className='form-submit-button' type='submit' value='SUBMIT' />
			</form>
			{createdGroup ? (
				<Redirect
					to={{
						pathname: `/dashboard/curr_user=${passedCurrUserName}`,
						state: { currUser: passedCurrUserName },
					}}
				/>
			) : null}
		</section>
	);
}

export default NewGroupForm;
