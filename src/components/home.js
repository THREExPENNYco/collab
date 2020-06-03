import React from "react";
import Hero from "./hero.js";
import Info from "./info.js";
import { Redirect } from "react-router-dom";

function Home() {
  const currUser = null;
  localStorage.getItem("currUser") ? currUser = localStorage.getItem("currUser") : currUser = false;
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
