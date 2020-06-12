import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

function NewGroupForm(props) {
	const userId = props.location.state.currUser._id;
	const userName = props.location.state.currUser.userName;
	const [groupName, setGroupName] = useState('');
	const [groupId, setGroupId] = useState('');
	const [error, setError] = useState(null);
	const [createGroup, setGroupSuccess] = useState(false);

	const handleCreateGroup = (e) => {
		e.preventDefault();
		axios
			.post(`https://salty-basin-04868.herokuapp.com/user_id?=${userId}/create_group`, {
				createdBy: userName,
				groupName: groupName,
			})
			.then((res) => {
				if (res.status === 200) {
					setGroupId(res.data);
					setGroupSuccess(true);
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
				`https://salty-basin-04868.herokuapp.com/user_id?=${userId}/group_id?=${data}/add_user_to_group`
			)
			.then(() => {})
			.catch((err) => {
				setError(err);
			});
	};

	const addGroupToUser = (data) => {
		axios
			.post(
				`https://salty-basin-04868.herokuapp.com/user_id?=${userId}/group_id?=${data}/group_to_user`
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
					onChange={(e) => setGroupName(e.target.value)}
				/>
				<input className='form-submit-button' type='submit' value='SUBMIT' />
			</form>
			{createGroup ? (
				<Redirect
					to={{
						pathname: `/dashboard/curr_user?${userName}`,
						state: { currUser: userName },
					}}
				/>
			) : null}
		</section>
	);
}

export default NewGroupForm;
