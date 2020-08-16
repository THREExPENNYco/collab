import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function NewGroupForm() {
	const currUser = JSON.parse(localStorage.getItem('currUser'));
	const [newGroupName, setNewGroupName] = useState('');
	const [error, setError] = useState(null);
	const [createdGroup, setCreateGroupSuccess] = useState(false);

	const handleCreateGroup = (e) => {
		e.preventDefault();
		axios
			.post(`https://salty-basin-04868.herokuapp.com/groups/user_id=${currUser._id}/create_group`, {
				createdBy: currUser._id,
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
				`https://salty-basin-04868.herokuapp.com/groups/group_id=${data}/add_user_to_group`, 
				{
					peerId: currUser._id,
					peerName: currUser.userName
				}
			)
			.catch((err) => {
				setError(err);
			});
	};

	const addGroupToUser = (data) => {
		axios
			.post(
				`https://salty-basin-04868.herokuapp.com/groups/user_id=${currUser._id}/group_to_user`, { 
					groupName: newGroupName,
					groupId: data
				}
			)
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
						pathname: `/dashboard/curr_user=${currUser._id}`,
					}}
				/>
			) : null}
		</section>
	);
}

export default NewGroupForm;
