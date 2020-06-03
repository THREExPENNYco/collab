import React, { useState } from "react";
import Hero from "./hero.js";
import Info from "./info.js";
import { Redirect } from "react-router-dom";

function Home() {
  const [currUser, setCurrUser] = useState(null);
  localStorage.getItem("currUser") ? setCurrUser(localStorage.getItem("currUser")) : setCurrUser(false);
  console.log(localStorage.getItem("currUser"));
  return (
    <section className="main">
      <Hero />
      <Info />
      { currUser ? <Redirect to={{ pathname: `/dashboard/${currUser}` }} /> : null }
    </section>
  );
}

export default Home;
