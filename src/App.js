import React, { Component, useEffect } from "react";
import Home from "./components/home.js";
import LoginForm from "./components/loginForm.js";
import Dashboard from "./components/dashboard.js";
import SignUpForm from "./components/signUpForm.js";
import NewGroupForm from "./components/newGroupForm.js";
import GroupDashboard from "./components/groupDashboard.js";
import {
  HashRouter as Router,
  Route,
  Link,
  useHistory,
} from "react-router-dom";
import Styles from "./Styles.css";
// Main component for the app
function App() {
  const { loggedIn } = LoginForm();
  const [ loginSwitch, setLoginSwitch ] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("currUser");
    localStorage.removeItem("groupId");
  };
  const handleLogin = () => { 
    loggedIn ? setLoginSwitch(true) : setLoginSwitch(false);
  }
  return (
    <Router>
      <div className="nav-bar">
        <p className="logo">
          <Link to="/">PEER PRESSURE</Link>
        </p>
        <div className="login-signup">
          { loginSwitch ? (
            <p className="login">
              <Link to="/login" onClick={() => handleLogin()}>LOGIN</Link>
            </p>
          ) : (
            <p className="login" onClick={() => handleLogout()}>
              <Link to="/">LOGOUT</Link>
            </p>
          )}
          <p className="signup">
            <Link to="/signup">SIGN UP</Link>
          </p>
        </div>
      </div>
      <Route exact path="/" component={Home} />
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignUpForm} />
      <Route path="/dashboard/:userName" component={Dashboard} />
      <Route path="/user_id=:user_id/create_group" component={NewGroupForm} />
      <Route path="/group_dashboard/:group_id" component={GroupDashboard} />
    </Router>
  );
}

export default App;
