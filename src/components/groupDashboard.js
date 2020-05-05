import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function groupDashboard(props) {
  const groupId = props.location.state.groupId;
  const [group, setGroup] = useState("");
  const [groupNames, setGroupNames] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3030/group_dashboard/${groupId}`)
      .then((res) => {
        if (res.status === 200) {
          setGroup(res.data);
          getGroupMemberNames();
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  const getGroupMemberNames = () => {
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
      <p className="dashboard-hero__top">{group.groupName}</p>
      <p className="dashboard-hero__bottom">DASHBOARD</p>
    <section className="dashboard-group">
      <section className="dasboard-group__peers-section">
        <section className="dashboard-group__members">
          <h1 className="dashboard-group__members-header">PEERS</h1>
          <hr className="dashboard-group__members-header__hr"></hr>
          {groupNames.map((member, index) => (
            <p key={index} className="dashbaord-group__members-peers">
              {member.userName}
            </p>
          ))}
        </section>
      </section>
    </section>
        </section>
  );
}

export default groupDashboard;
