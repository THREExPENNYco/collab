import React from "react";
import Hero from "./hero.js";
import Info from "./info.js";
import { Redirect } from "react-router-dom";

function Home() {
  { 
    const currUser = "";
    localStorage.getItem("currUser") ? (
      currUser = localStorage.getItem("currUser"),
      <Redirect
        to={{
          pathname: `/dashboard/${curruser}`,
        }}
      />
    ) : null;
  }
  return (
    <section className="main">
      <Hero />
      <Info />
    </section>
  );
}

export default Home;
