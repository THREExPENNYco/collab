import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const [user, setUserName] = useState("");
  const [userPassWord, setPassWord] = useState("");
  const [loggedIn, setLogin] = useState(false);
  const [currUser, setCurrUser] = useState("");
  const [error, setError] = useState("");
  const login = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3030/login", {
        userName: user,
        passWord: userPassWord,
      })
      .then((res) => {
        if (res.status === 200) {
          setCurrUser(res.data.userName);
          setLogin(true);
        }
      })
      .catch((err) => {
        setError(err);
        setLogin(false);
      });
  };
  return (
    <section className="form-container">
      <p className="hero-signup__top">LOGIN</p>
      {error ? <p className="info-signup-form">{error.message}</p> : null}
      <form className="signup-form" onSubmit={(e) => login(e)}>
        <label className="form-label">USERNAME</label>
        <input
          className="form-input"
          type="text"
          name="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label className="form-label">PASSWORD</label>
        <input
          className="form-input"
          type="password"
          name="password"
          onChange={(e) => setPassWord(e.target.value)}
        />
        <input className="form-submit-button" type="submit" value="SUBMIT" />
      </form>
      {loggedIn === true ? (
        <Redirect
          to={{
            pathname: `/dashboard/${currUser}`,
            state: { currUser: currUser },
          }}
        />
      ) : (
        <Redirect to="/login" />
      )}
    </section>
  );
}
export default LoginForm;
