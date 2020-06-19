import React, { useState, useMemo, useContext } from 'react';
import Home from './components/home.js';
import LoginForm from './components/loginForm.js';
import Dashboard from './components/dashboard.js';
import SignUpForm from './components/signUpForm.js';
import NewGroupForm from './components/newGroupForm.js';
import GroupDashboard from './components/groupDashboard.js';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Styles from './Styles.css';
// Main component for the app
function App() {
	const CurrUserContext = useContext("");
	const [ currUser, setCurrUser ] = useState({});

	const currUserMemo = useMemo(() => {{currUser, setCurrUser}}, [currUser, setCurrUser])

	const handleLogOut = () => {
		e.preventDefault();
		localStorage.removeItem('currUserName');
		localStorage.removeItem('currGrroupId');
		setLoggedIn(true);
	};

	return (
	<CurrUserContext.Provider value={{ currUserMemo }}> 
		<Router>
		{console.log(currUser)}
			<nav className='nav-bar'>
				<ul className='nav-bar__items'>
					<li className='logo'>
						<Link to='/'>PEER PRESSURE</Link>
					</li>
					<div className='login-signup'>
						{loggedIn ? (
							<li className='login' onClick={(e) => handleLogOut(e)}>
								<Link to='/'>LOGOUT</Link>
							</li>
						) : (
							<li className='login'>
								<Link to='/login' onClick={setLoggedIn}>
									LOGIN
								</Link>
							</li>
						)}
						<li className='signup'>
							<Link to='/signup'>SIGN UP</Link>
						</li>
					</div>
				</ul>
			</nav>
			<Route exact path='/' component={Home} />
			<Route path='/login' component={LoginForm} />
			<Route path='/signup' component={SignUpForm} />
			<Route path='/groups/group_id=:group_id/add_user_to_group' component={LoginForm} />
			<Route path='/dashboard/curr_user=:curr_user/get_user_dashboard' component={Dashboard} />
			<Route path='/user_id=:user_id/create_group' component={NewGroupForm} />
			<Route
				path='/group_dashboard/group_id=:group_id/get_group_dashboard'
				component={GroupDashboard}
			/>
		</Router>
	</CurrUserContext.Provider> 
	);
}

export default App;
