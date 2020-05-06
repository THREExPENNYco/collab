import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function groupDashboard(props) {
  const groupId = props.location.state.groupId;
  const [group, setGroup] = useState("");
  const [groupPeers, setGroupNames] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3030/group_dashboard/${groupId}`)
      .then((res) => {
        if (res.status === 200) {
          setGroup(res.data);
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
      .get(`http://localhost:3030/group_dashboard/${groupId}/members`)
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
              <p key={index} className="dashbaord-group__members-peers">
                {member.userName}
              </p>
            ))}
          </section>
        </section>
        <section className="dashboard-group__members-goalsteps">
          <h1 className="dashbaord-hero_top">FEED</h1>
        </section>
      </section>
    </section>
  );
}

export default groupDashboard;
