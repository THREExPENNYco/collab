/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Dashboard(props) {
  const currUser = props.location.state.currUser;
  const [currUserData, setCurrUserData] = useState("");
  const [groups, setGroups] = useState([]);
  const [userId, setUserId] = useState("");
  const [error, setError] = useState("");
  const [createGroup, setCreateGroup] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/dashboard/${currUser}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrUserData(res.data);
          getGroups(res.data._id);
          setUserId(res.data._id);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);
  const handleCreateGroup = () => {
    setCreateGroup(true);
  };
  const getGroups = (data) => {
    axios
      .get(`http://localhost:3030/user_id=${data}/find_group`)
      .then((res) => {
        setGroups(res.data);
      })
      .catch((err) => {
        setError(err);
      });
  };
  return (
    <section className="dashboard">
      <section className="dashboard-hero">
        <h1>DASHBOARD</h1>
      </section>
      <section className="dashboard-info">
        <section className="dashboard-info__section">
          <h1 className="dashboard-info__section-header">GROUPS</h1>
          <section className="dashboard-info__section-info">
            {groups.length === 0
              ? null
              : groups.map((group, index) => (
                  <section className="dashboard-info__section_info__content-groups">
                    <li
                      key={index}
                      className="dashboard-info__section-info__content-groups__item"
                    >
                      <a>{group.groupName}</a>
                    </li>
					<hr className="dashboard-info__section-info__content-group__item__hr"></hr>
                  </section>
                ))}
            <button
              className="dashboard-info__section-info__button"
              onClick={handleCreateGroup}
            >
              CREATE GROUP
            </button>
          </section>
        </section>
        <section className="dashboard-info__section">
          <h1 className="dashboard-info__section-header">GOALS</h1>
          <section className="dashboard-info__section-info">
            {currUserData.goals === null ? (
              currUserData.goals.map((index, goal) => {
                <li
                  key={index}
                  className="dashboard-info__section-info__content"
                >
                  {goal}
                </li>;
              })
            ) : (
              <p className="dashboard-info__section-info__content">
                Peer Pressure is meant to be enjoyed with peers. Create a group
                to create a goal.
              </p>
            )}
          </section>
        </section>
      </section>
      {console.log(createGroup)}
      {currUser ? null : <Redirect to="/login" />}
      {createGroup ? (
        <Redirect
          to={{
            pathname: `/user_id=${currUserData._id}/create_group`,
            state: { currUser: currUserData },
          }}
        />
      ) : null}
    </section>
  );
}

export default Dashboard;
