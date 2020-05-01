/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function Dashboard(props) {
  const currUser = props.location.state.currUser;
  const [currUserData, setCurrUserData] = useState("");
  const [error, setError] = useState("");
  const [createGroup, setCreateGroup] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:3030/dashboard/${currUser}`, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.status === 200) {
          const userData = res.data;
          setCurrUserData(userData);
        }
      })
      .catch((err) => {
        setError(err);
      });
  }, []);

  function Button(props) {
    return (
      <button className="dashboard-info__section-info__button">
        CREATE GROUP
      </button>
    );
  }

  const handleCreateGroup = () => {
    setCreateGroup(true);
  };

  console.log(currUserData.groups);
  return (
    <section className="dashboard">
      <section className="dashboard-hero">
        <h1>DASHBOARD</h1>
      </section>
      <section className="dashboard-info">
        <section className="dashboard-info__section">
          <h1 className="dashboard-info__section-header">GROUPS</h1>
          <section className="dashboard-info__section-info">
            {currUserData.group === null ? (
              currUserData.groups.map((index, group) => {
                <li
                  key={index}
                  classname="dashboard-info_section-info__content"
                >
                  {group.name}
                </li>;
              })
            ) : (
              <Button onClick={handleCreateGroup} />
            )}
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
                  {goal.name}
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
      {currUser ? null : <Redirect to="/login" />}
    </section>
  );
}

export default Dashboard;
