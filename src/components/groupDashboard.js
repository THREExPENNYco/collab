import React, { useState, useEffect } from "react";
import axios from "axios";
import input_camera_img from "./componentAssets/input_camera_img.png";
import default_avatar_img from "./componentAssets/default_avatar_image.png";
import S3 from "react-aws-s3";
import { Redirect } from "react-router-dom";

function groupDashboard(props) {
  const passedState = props.location.state === "true";
  passedState
    ? localStorage.setItem("groupId", props.location.state.groupId)
    : null;
  const groupIdLocal = passedState
    ? props.location.state.groupId
    : localStorage.getItem("groupId");
  const [groupPeers, setGroupNames] = useState([]);
  const [groupGoals, setGroupGoals] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [newGoalStep, setGoalStep] = useState("");
  const [newComment, setNewComment] = useState("");
  const [newImage, setNewImage] = useState({
    newImageUploaded: false,
    newImageData: [],
  });
  const [comments, setComments] = useState([]);
  const [createGoalClicked, setCreateGoalClick] = useState(false);
  const [addPeerClicked, setAddPeerClick] = useState(false);
  const [newPeerEmail, setNewPeerEmail] = useState("");
  const [newGoalName, setGoalName] = useState("");
  const [newGoal, setGoal] = useState("");
  const [newGoalDuration, setGoalDuration] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://salty-basin-04868.herokuapp.com/group_dashboard/${groupIdLocal}`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setGroupName(res.data.groupName);
          getPeerMemberNames();
          getPeerGoals();
          getGroupComments();
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  const getPeerGoals = () => {
    axios
      .get(
        `https://salty-basin-04868.herokuapp.com/group_dashboard/${groupIdLocal}/goals`,
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setGroupGoals(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };
  const getPeerMemberNames = () => {
    axios
      .get(
        `https://salty-basin-04868.herokuapp.com/group_dashboard/${groupIdLocal}/members`
      )
      .then((res) => {
        if (res.status === 200) {
          setGroupNames(res.data);
        }
      })
      .catch((err) => {
        setError(err);
      });
  };
  const handleCreateGoalBtn = () => {
    createGoalClicked ? setCreateGoalClick(false) : setCreateGoalClick(true);
  };
  const handleAddPeerBtn = () => {
    addPeerClicked ? setAddPeerClick(false) : setAddPeerClick(true);
  };
  const handleInvitePeerGet = (e) => {
    e.preventDefault();
    axios
      .get(
        `https://salty-basin-04868.herokuapp.com/group_id=${groupIdLocal}/invite_user`,
        {
          newPeerEmail: newPeerEmail,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          handleAddPeerBtn();
        }
      })
      .catch((err) => {
        setError(err);
      });
  };
  const handleCreateGoalPost = (e) => {
    e.preventDefault();
    axios
      .post(
        `https://salty-basin-04868.herokuapp.com/group_id=${groupIdLocal}/create_goal`,
        {
          goalName: newGoalName,
          goal: newGoal,
          goalDuration: newGoalDuration,
        },
        {
          withCredentials: true,
        }
      )
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
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", newImage.newImageData);
    formData.append("text", newComment);
    // newImage.newImageUploaded ? convertHtmlFile(newImage.newImageData) : null;
    axios({
      method: "post",
      url: `/group_dashboard/group_id=${groupIdLocal}/create_comment`,
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setComments(comments.concat(res.data));
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };
  const getGroupComments = () => {
    axios
      .get(
        `https://salty-basin-04868.herokuapp.com/group_dashboard/group_id=${groupIdLocal}/get_comments`
      )
      .then((res) => {
        if (res.status === 200) {
          setComments(comments.concat(res.data));
        }
      })
      .catch((err) => {
        setError(err);
        console.log(err);
      });
  };
  return (
    <section>
      <p className="dashboard-hero__top">{groupName.toUpperCase()}</p>
      <p className="dashboard-hero__bottom">DASHBOARD</p>
      <hr className="dashboard-hero__hr"></hr>
      <section className="dashboard-group">
        <section className="dasboard-group__peers-section">
          <section className="dashboard-group__members">
            <h1 className="dashboard-group__members-header">PEERS</h1>
            <hr className="dashboard-group__members-header__hr"></hr>
            {addPeerClicked ? (
              <form className="dashboard-group__goal-form">
                <input
                  className="dashboard-group__goal-form__input"
                  placeholder="NAME OF PEER?"
                  type="text"
                  onChange={(e) => setNewPeerEmail(e.target.value)}
                />
              </form>
            ) : (
              groupPeers.map((member, index) => (
                <ul key={index}>
                  <li key={index} className="dashboard-group__members-peers">
                    {member.userName.toUpperCase()}
                  </li>
                </ul>
              ))
            )}
            {addPeerClicked ? (
              <section>
                <input
                  className="dashboard-group__goal-submit-button"
                  type="submit"
                  value="CANCEL"
                  onClick={() => handleAddPeerBtn()}
                />
                <input
                  className="dashboard-group__goal-submit-button"
                  type="submit"
                  value="SUBMIT"
                  onClick={(e) => handleInvitePeerGet(e)}
                />
              </section>
            ) : (
              <input
                className="dashboard-group__goal-submit-button"
                type="submit"
                value="ADD PEER"
                onClick={() => handleAddPeerBtn()}
              />
            )}
          </section>
        </section>
        <section className="dasboard-group__goals-section">
          <section className="dashboard-group__goals">
            <h1 className="dashboard-group__goals-header">GOALS</h1>
            <hr className="dashboard-group__goals-header__hr"></hr>
            {createGoalClicked ? (
              <form className="dashboard-group__goal-form">
                <input
                  className="dashboard-group__goal-form__input"
                  placeholder="NAME OF GOAL"
                  type="text"
                  onChange={(e) => setGoalName(e.target.value)}
                />
                <textarea
                  className="dashboard-group__goal-form__input-goal"
                  placeholder="WHAT IS THE GOAL?"
                  onChange={(e) => setGoal(e.target.value)}
                />
                <label className="dashboard-group__goal-form__input">
                  COMPLETION DATE
                </label>
                <input
                  className="dashboard-group__goal-form__input"
                  type="date"
                  onChange={(e) => setGoalDuration(new Date(e.target.value))}
                />
              </form>
            ) : (
              groupGoals.map((goal, index) => (
                <section>
                  <ul key={index}>
                    <li key={index} className="dashboard-group__members-peers">
                      <p className="dashboard-group__goals-goal">
                        {goal.goalName.toUpperCase()}
                      </p>
                      <p className="dashboard-group__goals-username">
                        CREATED BY: {goal.createdBy.userName.toUpperCase()}
                      </p>
                    </li>
                  </ul>
                  <hr className="dashboard-group__goals-header__hr"></hr>
                </section>
              ))
            )}
            {createGoalClicked ? (
              <section>
                <input
                  className="dashboard-group__goal-submit-button"
                  type="submit"
                  value="CANCEL"
                  onClick={() => handleCreateGoalBtn()}
                />
                <input
                  className="dashboard-group__goal-submit-button"
                  type="submit"
                  value="SUBMIT"
                  onClick={(e) => handleCreateGoalPost(e)}
                />
                <p className="dashboard-group__advisory">
                  Only you will see your goal. Everyone else will see the goal
                  name.
                </p>
              </section>
            ) : (
              <input
                className="dashboard-group__goal-submit-button"
                type="submit"
                value="CREATE GOAL"
                onClick={() => handleCreateGoalBtn()}
              />
            )}
          </section>
        </section>
        <section className="dashboard-group__members-feed">
          <h1 className="dashboard-group__members-header">FEED</h1>
          <hr className="dashboard-group__members-header__hr"></hr>
          <section className="dashboard-group__members-feed__input">
            <form
              encType="multipart/form-data"
              onSubmit={(e) => handleCreateComment(e)}
            >
              <section className="dasboard-group__members-feed__input-section">
                <input
                  type="text"
                  className="dashboard-group__form-input"
                  placeholder="You Work On Your Goal Today?"
                  onChange={(e) => setNewComment(e.target.value)}
                />
                <input
                  src={input_camera_img}
                  className="dashboard-group__members__form-input__camera"
                  type="file"
                  onChange={(e) =>
                    setNewImage({
                      newImageData: e.target.files[0],
                      newImageUploaded: true,
                    })
                  }
                />
              </section>
              <input
                className="dashboard-group__form-submit-button"
                type="submit"
                value="POST GOALSTEP"
              />
            </form>
          </section>
          <section className="dashboard-group__members-feed__comments">
            {comments.reverse().map((comment, index) => (
              <section 
                key={index}
                className="dashboard-group__members-feed__comments-container"
              >
              <section 
                key={index}
                className="dashboard-group__members-feed__comments-continer__avatar-container" 
              > 
              <img 
                className="dashboard-group__members-feed__comments-container__avatar"
                key={index} 
                src={default_avatar_img}
              />
               <p
                  key={index}
                  className="dashboard-group__members-feed__comments-container__username"
                >
                  {comment.createdBy.userName}
                </p>
              <p 
                key={index}
                className="dashboard-group__members-feed__comments-container__createdat"
              > 
                {comment.createdAt}
              </p>
              </section>
                <p
                  key={index}
                  className="dashboard-group__members-feed__comments-container__comment"
                >
                  {comment.text}
                </p>
                { comment.image ? 
                <section className="dashboard-group__members-feed__comments-container__comment-pic__container">
                <img  
                  key={index} 
                  src={comment.image.toString()}
                  className="dashboard-group__members-feed__comments-container__comment-pic"
                />
                  </section>
                 : null
                } 
              </section>
            ))}
          </section>
        </section>
        <section className="dashboard-group__check-in">
          <h1 className="dashboard-group__check-in__header">CHECK-IN</h1>
          <hr className="dashboard-group__members-header__hr"></hr>
        </section>
      </section>
      {console.log(newImage)}
    </section>
  );
}

export default groupDashboard;
