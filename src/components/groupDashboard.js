import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { Redirect } from "react-router-dom"; 

function groupDashboard(props) { 
    return(
    <section className="dashboard">
      <p className="dashboard-hero__top">GROUP</p>
      <p className="dashboard-hero__bottom">DASHBOARD</p>
    </section>
    )
}

export default groupDashboard;