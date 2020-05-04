import React, { useState, useEffect } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function groupDashboard(props) {
  const groupId = props.location.state.groupId;
  const [group, setGroup] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:3030/group_dashboard/${groupId}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });
  return (
    <section className="dashboard">
      <p className="dashboard-hero__top">GROUP</p>
      <p className="dashboard-hero__bottom">DASHBOARD</p>
      <section className="dashboard-group__members"></section>
    </section>
  );
}

export default groupDashboard;
