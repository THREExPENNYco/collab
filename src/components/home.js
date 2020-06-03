import React from "react";
import Hero from "./hero.js";
import Info from "./info.js";
import { Redirect } from "react-router-dom";

function Home() {
  {
    const currUser = localStorage.getItem("currUser");
    currUser ? (
      <Redirect
        to={{
          pathname: `/dashboard/${currUser}`,
        }}
      />
    ) : null;
  }
  console.log(localStorage.getItem("currUser"))
  return (
    <section className="main">
      <Hero />
      <Info />
    </section>
  );
}

export default Home;
