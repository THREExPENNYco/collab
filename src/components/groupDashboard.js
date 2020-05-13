import React, { useState, useEffect } from "react";
import axios from "axios";
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
  const [groupName, setGroupName] = useState("");
  const [goalStep, setGoalStep] = useState("");
  const [createGoalClicked, setCreateGoalClick] = useState(false);
  const [addPeerClicked, setAddPeerClick] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goal, setGoal] = useState("");
  const [goalDuration, setGoalDuration] = useState("");
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
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
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
  const convertDate = () => { 
    
  }
  const handleCreateGoalPost = (e) => {
    e.preventDefault();
    axios
      .post(
        `/group_id=${groupId}/create_goal`,
        {
          withCredentials: true,
        },
        {
          goalName: goalName,
          goal: goal,
          goalDuration: goalDuration,
        }
      )
      .then((res) => {
        if (res.status === 200) {
          handleCreateGoalBtn()
        }
      })
      .catch((err) => { 
        setError(err)
      });
  };
  // const createGoal = () => {
  //   axios
  //     .post(`/group_id=${groupIdLocal}/create_goal`)
  //     .then((res) => {

  //     })
  // }
  // const addGoalStep = () => {
  //   axios
  //     .post(``)
  // }
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
                  onChange={(e) => setPeerName(e.target.value)}
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
              groupPeers.map((member, index) => (
                <ul key={index}>
                  <li key={index} className="dashboard-group__members-peers">
                    {member.userName.toUpperCase()}
                  </li>
                </ul>
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
                  onSubmit={(e) => handleCreateGoalPost(e)}
                />
                <p className="dashboard-group__advisory">
                Only you will see your goal. Everyone else will see the goal name. 
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
          <input
            type="text"
            className="dashboard-group__form-input"
            placeholder="You Work On Your Goal Today?"
            onChange={(e) => setGoalStep(e.target.value)}
          />
          <input
            className="dashboard-group__form-submit-button"
            type="submit"
            value="POST GOALSTEP"
          />
        </section>
        <section className="dashboard-group__check-in">
          <h1 className="dashboard-group__check-in__header">CHECK-IN</h1>
          <hr className="dashboard-group__members-header__hr"></hr>
        </section>
      </section>
    </section>
  );
}

export default groupDashboard;
