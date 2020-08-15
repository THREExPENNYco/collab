import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import { CurrUserContext } from './CurrUserContext.js';
import inputCameraImg from './componentAssets/input_camera_img.png';
import defaultAvatarImg from './componentAssets/default_avatar_image.png';

function Dashboard() {
	let currUser = JSON.parse(localStorage.getItem('currUser'));
	const [error, setError] = useState('');
	const [newImage, setNewImage] = useState({
		newImageData: '',
		newImageUploadedBool: false,
	});
	const [createGroupClicked, setCreateGroupClick] = useState(false);
	useEffect(() => {
		axios
			.get(`https://salty-basin-04868.herokuapp.com/users/curr_user=${currUser.userName}/get_user`)
			.catch((err) => {
				setError(err);
			});
	}, []);
	const handleCreateGroup = () => {
		setCreateGroupClick(true);
	};
	const uploadUserImage = (e) => {
		e.preventDefault();
		const formData = new FormData();
		S;
		formData.append('image', newImage.newImageData);
		axios({
			method: 'post',
			url: `/dashboard/upload_image/${currUser._id}`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		}).catch((err) => {
			setError(err);
		});
	};
	return (
		<section className='dashboard'>
			<p className='dashboard-hero__top'>{currUser.userName.toUpperCase()}</p>
			<p className='dashboard-hero__bottom'>DASHBOARD</p>
			<section className='dashboard-bio__image-container'>
				{currUser.image ? (
					<img className='dashboard-bio__image' src={currUser.image.toString()}></img>
				) : (
					<img className='dashboard-bio__image' src={defaultAvatarImg}></img>
				)}
			</section>
			<form encType='multipart/form-data' onSubmit={(e) => uploadUserImage(e)}>
				<section className='dashboard__members-feed__input__buttons'>
					<section className='dashboard__members-feed__input__button-container'>
						<img src={inputCameraImg} className='dashboard__members__form-input__camera' />
						<input
							src={inputCameraImg}
							className='dashboard__members__form-input__choose-file'
							type='file'
							onChange={(e) =>
								setNewImage({
									newImageData: e.target.files[0],
									newImageUploadedBool: true,
								})
							}
						/>
					</section>
				</section>
				{newImage.newImageUploadedBool ? (
					<input
						className='dashboard__members__form-input__avatar-form__button'
						type='submit'
						value='POST'
					/>
				) : null}
			</form>
			<section className='dashboard-info'>
				<section className='dashboard-info__section'>
					<h1 className='dashboard-info__section-header'>GROUPS</h1>
					<section className='dashboard-info__section-info'>
						{currUser
							? currUser.groups.map((group, index) => (
									<section className='dashboard-info__section_info__content-groups'>
										<li key={index} className='dashboard-info__section-info__content-groups__item'>
											<Link
												to={{
													pathname: `/group_dashboard/group_id=${group._id}/get_group_dashboard`,
													state: { currGroupId: group._id, currUserName: currUser.userName },
												}}
												className='dashboard-info__section-info__content-groups__item__link'>
												{group.groupName}
											</Link>
										</li>
										<hr className='dashboard-info__section-info__content-group__item__hr'></hr>
									</section>
							  ))
							: null}
						<button className='dashboard-info__section-info__button' onClick={handleCreateGroup}>
							CREATE GROUP
						</button>
					</section>
				</section>
				<section className='dashboard-info__section'>
					<h1 className='dashboard-info__section-header'>GOALS</h1>
					<section className='dashboard-info__section-info'>
						{currUser.goals ? (
							currUser.goals.map((goal, index) => (
								<section className='dashboard-info__section_info__content-groups'>
									<li key={index} className='dashboard-info__section-info__content-groups__item'>
										<Link
											to={{
												pathname: `/group_dashboard/group_id=${goal.groupId}/get_group_dashboard`,
												state: { currGroupId: goal.groupId, currUserName: currUser.userName },
											}}
											className='dashboard-info__section-info__content-groups__item__link'>
											{goal.goalName}
										</Link>
									</li>
									<hr className='dashboard-info__section-info__content-group__item__hr'></hr>
								</section>
							))
						) : (
							<p className='dashboard-info__section-info__content'>
								Peer Pressure is meant to be enjoyed with peers. Create a group to create a goal.
							</p>
						)}
					</section>
				</section>
			</section>
			{currUser ? null : <Redirect to='/login' />}
			{createGroupClicked ? (
				<Redirect
					to={{
						pathname: `/groups/user_id=${currUserData._id}/create_group`,
						state: { currUserData: currUserData },
					}}
				/>
			) : null}
		</section>
	);
}

export default Dashboard;
