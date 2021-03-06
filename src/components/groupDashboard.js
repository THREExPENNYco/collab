import React, { useState, useEffect } from 'react';
import axios from 'axios';
import input_camera_img from './componentAssets/input_camera_img.png';
import default_avatar_img from './componentAssets/default_avatar_image.png';

function groupDashboard() {
	const currGroup = JSON.parse(localStorage.getItem('currGroup'));
	const currUser = JSON.parse(localStorage.getItem('currUser'));
	const currGroupId = JSON.parse(localStorage.getItem('currGroupId'));
	console.log("This is the new group ID: ", currGroupId);
	const [currGroupPeers, setCurrGroupPeers] = useState([]);
	const [currGroupComments, setCurrGroupComments] = useState([]);
	const [currGroupGoals, setCurrGroupGoals] = useState([]);
	const [newGoalStep, setNewGoalStep] = useState('');
	const [newComment, setNewComment] = useState('');
	const [newImage, setNewImage] = useState({
		newImageUploaded: false,
		newImageData: [],
	});
	const [createGoalClicked, setCreateGoalClick] = useState(false);
	const [addPeerClicked, setAddPeerClick] = useState(false);
	const [newPeerEmail, setNewPeerEmail] = useState('');
	const [newGoalName, setGoalName] = useState('');
	const [newGoal, setNewGoal] = useState('');
	const [newGoalDuration, setNewGoalDuration] = useState('');
	const [error, setError] = useState('');
	useEffect(() => {
		axios
			.get(
				`https://salty-basin-04868.herokuapp.com/group_dashboard/group_id=${currGroupId}/get_group_dashboard`
			)
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem('currGroup', JSON.stringify(res.data));
					getGroupComments();
					getPeerGoals();
					getGroupMembers();
				}
			})
			.catch((err) => {
				setError(err);
			});
	}, []);
	const handleCreateGoalBtn = () => {
		createGoalClicked ? setCreateGoalClick(false) : setCreateGoalClick(true);
	};
	const handleAddPeerBtn = () => {
		addPeerClicked ? setAddPeerClick(false) : setAddPeerClick(true);
	};
	const handleInvitePeerGet = (e) => {
		e.preventDefault();
		axios
			.post(`https://salty-basin-04868.herokuapp.com/groups/group_id=${currGroupId}/invite_user`, {
				email: newPeerEmail,
			})
			.then((res) => {
				if (res.status === 200) {
					handleAddPeerBtn();
					getGroupComments();
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	const handleCreateGoalPost = (e) => {
		axios
			.post(`https://salty-basin-04868.herokuapp.com/goals/group_id=${currGroupId}/create_goal`, {
				goalName: newGoalName,
				goal: newGoal,
				goalDuration: newGoalDuration,
				createdBy: {
					userName: currUser.userName,
					userId: currUser._id
				}
			})
			.then((res) => {
				if (res.status === 200) {
					handleCreateGoalBtn();
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	const handleCreateComment = (e) => {
		const formData = new FormData();
		formData.append('image', newImage.newImageData);
		formData.append('text', newComment);
		axios({
			method: 'post',
			url: `/group_dashboard/group_id=${currGroupId}/user_name=${currUser.userName}/user_id=${currUser._id}/create_comment`,
			data: formData,
			headers: {
				'Content-Type': 'multipart/form-data',
			},
		})
			.then((res) => {
				if (res.status === 200) {
					let updatedGroup = currGroup.comments.concat(res.data);
					localStorage.setItem('currGroup', JSON.stringify(updatedGroup));
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	const getGroupComments = () => {
		axios
			.get(
				`https://salty-basin-04868.herokuapp.com/group_dashboard/group_id=${currGroupId}/get_comments`
			)
			.then((res) => {
				if (res.status === 200) {
					setCurrGroupComments(currGroupComments.concat(res.data));
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	const getPeerGoals = () => {
		axios
			.get(
				`https://salty-basin-04868.herokuapp.com/group_dashboard/group_id=${currGroupId}/get_goals`
			)
			.then((res) => {
				if (res.status === 200) {
					setCurrGroupGoals(res.data);
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	const getGroupMembers = () => {
		axios
			.get(
				`https://salty-basin-04868.herokuapp.com/group_dashboard/group_id=${currGroupId}/get_members`,
			)
			.then((res) => {
				if (res.status === 200) {
					setCurrGroupPeers(res.data);
				}
			})
			.catch((err) => {
				setError(err);
			});
	};
	return (
		<section>
			<p className='dashboard-hero__top'>{currGroup.groupName.toUpperCase()}</p>
			<p className='dashboard-hero__bottom'>DASHBOARD</p>
			<hr className='dashboard-hero__hr'></hr>
			<section className='dashboard-group'>
				<section className='dasboard-group__peers-section'>
					<section className='dashboard-group__members'>
						<h1 className='dashboard-group__members-header'>PEERS</h1>
						<hr className='dashboard-group__members-header__hr'></hr>
						{addPeerClicked ? (
							<form className='dashboard-group__goal-form'>
								<input
									className='dashboard-group__goal-form__input'
									placeholder='NAME OF PEER?'
									type='text'
									onChange={(e) => setNewPeerEmail(e.target.value)}
								/>
							</form>
						) : (
								currGroupPeers.map((peer, index) => (
									<ul key={index}>
										<li key={index} className='dashboard-group__members-peers'>
											{peer.peerName?.toUpperCase()}
										</li>
									</ul>
								))
							)}
						{addPeerClicked ? (
							<section>
								<input
									className='dashboard-group__goal-submit-button'
									type='submit'
									value='CANCEL'
									onClick={() => handleAddPeerBtn()}
								/>
								<input
									className='dashboard-group__goal-submit-button'
									type='submit'
									value='SUBMIT'
									onClick={(e) => handleInvitePeerGet(e)}
								/>
							</section>
						) : (
								<input
									className='dashboard-group__goal-submit-button'
									type='submit'
									value='ADD PEER'
									onClick={() => handleAddPeerBtn()}
								/>
							)}
					</section>
				</section>
				<section className='dasboard-group__goals-section'>
					<section className='dashboard-group__goals'>
						<h1 className='dashboard-group__goals-header'>GOALS</h1>
						<hr className='dashboard-group__goals-header__hr'></hr>
						{createGoalClicked ? (
							<form className='dashboard-group__goal-form'>
								<input
									className='dashboard-group__goal-form__input'
									placeholder='NAME OF GOAL'
									type='text'
									onChange={(e) => setGoalName(e.target.value)}
								/>
								<textarea
									className='dashboard-group__goal-form__input-goal'
									placeholder='WHAT IS THE GOAL?'
									onChange={(e) => setNewGoal(e.target.value)}
								/>
								<label className='dashboard-group__goal-form__input'>COMPLETION DATE</label>
								<input
									className='dashboard-group__goal-form__input'
									type='date'
									onChange={(e) => setNewGoalDuration(new Date(e.target.value))}
								/>
							</form>
						) : (
								currGroupGoals.map((goal, index) => (
									<section>
										<ul key={index}>
											<li key={index} className='dashboard-group__members-peers'>
												<p className='dashboard-group__goals-goal'>{goal.goalName.toUpperCase()}</p>
												<p className='dashboard-group__goals-username'>
													CREATED BY: {goal.createdBy.userName.toUpperCase()}
												</p>
											</li>
										</ul>
										<hr className='dashboard-group__goals-header__hr'></hr>
									</section>
								))
							)}
						{createGoalClicked ? (
							<section>
								<input
									className='dashboard-group__goal-submit-button'
									type='submit'
									value='CANCEL'
									onClick={() => handleCreateGoalBtn()}
								/>
								<input
									className='dashboard-group__goal-submit-button'
									type='submit'
									value='SUBMIT'
									onClick={(e) => handleCreateGoalPost(e)}
								/>
								<p className='dashboard-group__advisory'>
									Only you will see your goal. Everyone else will see the goal name.
								</p>
							</section>
						) : (
								<input
									className='dashboard-group__goal-submit-button'
									type='submit'
									value='CREATE GOAL'
									onClick={() => handleCreateGoalBtn()}
								/>
							)}
					</section>
				</section>
				<section className='dashboard-group__members-feed'>
					<h1 className='dashboard-group__members-header'>FEED</h1>
					<hr className='dashboard-group__members-header__hr'></hr>
					<section className='dashboard-group__members-feed__input'>
						<form encType='multipart/form-data' onSubmit={(e) => handleCreateComment(e)}>
							<section className='dasboard-group__members-feed__input-section'>
								<input
									type='text'
									className='dashboard-group__form-input'
									placeholder='You Work On Your Goal Today?'
									onChange={(e) => setNewComment(e.target.value)}
								/>
								<section className='dashboard-group__members-feed__input__buttons'>
									<img
										src={input_camera_img}
										className='dashboard-group__members__form-input__camera'
									/>
									<input
										src={input_camera_img}
										className='dashboard-group__members__form-input__choose-file'
										type='file'
										onChange={(e) =>
											setNewImage({
												newImageData: e.target.files[0],
												newImageUploaded: true,
											})
										}
									/>
								</section>
							</section>
							<input className='dashboard-group__form-submit-button' type='submit' value='POST' />
						</form>
					</section>
					<section className='dashboard-group__members-feed__comments'>
						{currGroupComments.map((comment, index) => (
							<section key={index} className='dashboard-group__members-feed__comments-container'>
								<section
									key={index}
									className='dashboard-group__members-feed__comments-continer__avatar-container'>
									{currUser ?
										<img
											className='dashboard-group__members-feed__comments-container__avatar'
											key={index}
											src={currUser.image.toString()}
										/>
										:
										<img
											className='dashboard-group__members-feed__comments-container__avatar'
											key={index}
											src={default_avatar_img}
										/>
									}
									<p
										key={index}
										className='dashboard-group__members-feed__comments-container__username'>
										{comment.createdBy.userName}
									</p>
									<p
										key={index}
										className='dashboard-group__members-feed__comments-container__createdat'>
										{new Date(comment.createdAt.toString()).toLocaleDateString()}
									</p>
								</section>
								<p
									key={index}
									className='dashboard-group__members-feed__comments-container__comment'>
									{comment.text}
								</p>
								{comment.image ? (
									<section className='dashboard-group__members-feed__comments-container__comment-pic__container'>
										<img
											key={index}
											src={comment.image.toString()}
											className='dashboard-group__members-feed__comments-container__comment-pic'
										/>
									</section>
								) : null}
							</section>
						))}
					</section>
				</section>
				<section className='dashboard-group__check-in'>
					<h1 className='dashboard-group__check-in__header'>CHECK-IN</h1>
					<hr className='dashboard-group__members-header__hr'></hr>
				</section>
			</section>
			{console.log(currGroupPeers)}
		</section>
	);
}

export default groupDashboard;
