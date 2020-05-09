import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function groupDashboard(props) {
  const groupIdFromProps = props.location.state.groupId;
  localStorage.setItem("groupId", groupIdFromProps); 
  const groupId = localStorage.getItem("groupId");
  console.log(groupId);
  const [groupPeers, setGroupNames] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(`https://salty-basin-04868.herokuapp.com/group_dashboard/${groupId || groupIdFromProps}`, { 
        withCredentials: true,
      })
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
      .get(`https://salty-basin-04868.herokuapp.com/group_dashboard/${groupId}/members`)
      .then((res) => {
        if (res.status === 200) {
          setGroupNames(res.data);
        }
      })
      .catch((err) => {
        setError(err);
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
            {groupPeers.map((member, index) => (
              <ul key={index}>
              <li key={index} className="dashboard-group__members-peers">
                {member.userName.toUpperCase()}
              </li>
              </ul>
            ))}
            <input className="dashboard-group__goal-submit-button" type="submit" value="ADD PEER" />
          </section>
        </section>
          <section className="dasboard-group__goals-section">
          <section className="dashboard-group__goals">
            <h1 className="dashboard-group__goals-header">GOALS</h1>
            <hr className="dashboard-group__goals-header__hr"></hr>
            {groupPeers.map((member, index) => (
              <ul key={index}>
              <li key={index} className="dashboard-group__members-peers">
                {member.userName.toUpperCase()}
              </li>
              </ul>
            ))}
            <input className="dashboard-group__goal-submit-button" type="submit" value="CREATE GOAL" />
          </section>
        </section>
        <section className="dashboard-group__members-feed">
          <h1 className="dashboard-group__members-header">FEED</h1>
          <hr className="dashboard-group__members-header__hr"></hr>
          <input type="text" className="dashboard-group__form-input" placeholder="You Work On Your Goal Today?"/>
          <input className="dashboard-group__form-submit-button" type="submit" value="POST GOALSTEP" />
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
