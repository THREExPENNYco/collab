import React, { useState, useEffect } from 'react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import input_camera_img from './componentAssets/input_camera_img.png';
import default_avatar_img from './componentAssets/default_avatar_image.png';

function Dashboard(props) {
	const passedProps = props.location.state ? true : false;
	passedProps ? localStorage.setItem('currUserName', props.location.state.currUserName) : null;
	const passedCurrUserName = passedProps
		? props.location.state.currUserName
		: localStorage.getItem('currUserName');
	const [currUserData, setCurrUserData] = useState([]);
	const [currUserGroups, setCurrUserGroups] = useState([]);
	const [currUserId, setCurrUserId] = useState('');
	const [error, setError] = useState('');
	const [newImage, setNewImage] = useState({
		newImageData: '',
		newImageUploadedBool: false,
	});
	const [createGroupClicked, setCreateGroupClick] = useState(false);
	const [currUserGoals, setCurrUserGoals] = useState([]);
	useEffect(() => {
		axios
			.get(`https://salty-basin-04868.herokuapp.com/dashboard/curr_user=${passedCurrUserName}`)
			.then((res) => {
				if (res.status === 200) {
					setCurrUserData(res.data);
					getGroups(res.data._id);
					setCurrUserId(res.data._id);
					getCurrUserGoals();
				}
			})
			.catch((err) => {
				setError(err);
			});
	}, []);
	const handleCreateGroup = () => {
		setCreateGroupClick(true);
	};
	const getGroups = (groupId) => {
		axios
			.get(`https://salty-basin-04868.herokuapp.com/user_id=${groupId}/find_group`)
			.then((res) => {
				setCurrUserGroups(res.data);
			})
			.catch((err) => {
				setError(err);
			});
	};
	const uploadUserImage = (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', newImage.newImageData);
		axios({
			method: 'post',
			url: `/dashboard/upload_image/${currUserId}`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
			.then()
			.catch((err) => {
				setError(err);
			});
	};
	const getCurrUserGoals = () => {
		axios
			.get(`https://salty-basin-04868.herokuapp.com/goals/curr_user=${passsedCurrUserName}`)
			.then((res) => {
				if (res.status === 200) {
					setCurrUserGoals(res.data);
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	return (
		<section className='dashboard'>
			<p className='dashboard-hero__top'>{passedCurrUserName.toUpperCase()}</p>
			<p className='dashboard-hero__bottom'>DASHBOARD</p>
			<section className='dashboard-bio__image-container'>
				{currUserData.image ? (
					<img className='dashboard-bio__image' src={currUserData.image.toString()}></img>
				) : (
					<img className='dashboard-bio__image' src={default_avatar_img}></img>
				)}
			</section>
			<form encType='multipart/form-data' onSubmit={(e) => uploadUserImage(e)}>
				<section className='dashboard__members-feed__input__buttons'>
					<section className='dashboard__members-feed__input__button-container'>
						<img src={input_camera_img} className='dashboard__members__form-input__camera' />
						<input
							src={input_camera_img}
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
						{currUserGroups
							? currUserGroups.map((group, index) => (
									<section className='dashboard-info__section_info__content-groups'>
										<li key={index} className='dashboard-info__section-info__content-groups__item'>
											<Link
												to={{
													pathname: `/group_dashboard/group_id=${group._id}`,
													state: { groupId: group._id, currUserData: currUserData },
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
						{currUserGoals ? (
							currUserGoals.map((goal, index) => (
								<section className='dashboard-info__section_info__content-groups'>
									<li key={index} className='dashboard-info__section-info__content-groups__item'>
										<Link
											to={{
												pathname: `/group_dashboard/group_id=${goal.groupId}`,
												state: { groupId: goal.groupId, currUserData: currUserData },
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
			{passedCurrUserName ? null : <Redirect to='/login' />}
			{createGroupClicked ? (
				<Redirect
					to={{
						pathname: `/user_id=${currUserData._id}/create_group`,
						state: { currUserData: currUserData },
					}}
				/>
			) : null}
		</section>
	);
}

export default Dashboard;
