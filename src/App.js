import React, { useState, Component, useEffect } from 'react';
import Home from './components/home.js';
import LoginForm from './components/loginForm.js';
import Dashboard from './components/dashboard.js';
import SignUpForm from './components/signUpForm.js';
import NewGroupForm from './components/newGroupForm.js';
import GroupDashboard from './components/groupDashboard.js';
import { HashRouter as Router, Route, Link, useHistory } from 'react-router-dom';
import Styles from './Styles.css';
// Main component for the app
function App() {
	const [logBool, setLogBool] = useState(false);
	const handleLogOut = () => {
		localStorage.removeItem('currUser');
		localStorage.removeItem('groupId');
		setLogBool(true);
	};
	return (
		<Router>
			<div className='nav-bar'>
				<p className='logo'>
					<Link to='/'>PEER PRESSURE</Link>
				</p>
				<div className='login-signup'>
					{logBool ? (
						<p className='login' onClick={handleLogOut()}>
							<Link to='/'>LOGOUT</Link>
						</p>
					) : (
						<p className='login'>
							<Link to='/login' onClick={setLogBool}>
								LOGIN
							</Link>
						</p>
					)}
					<p className='signup'>
						<Link to='/signup'>SIGN UP</Link>
					</p>
				</div>
			</div>
			<Route exact path='/' component={Home} />
			<Route path='/login' component={LoginForm} />
			<Route path='/signup' component={SignUpForm} />
			<Route path='/group_id=:group_id/add_user_to_group' component={LoginForm} />
			<Route path='/dashboard/curr_user=:curr_user' component={Dashboard} />
			<Route path='/user_id=:user_id/create_group' component={NewGroupForm} />
			<Route path='/group_dashboard/group_id=:group_id' component={GroupDashboard} />
		</Router>
	);
}

export default App;
