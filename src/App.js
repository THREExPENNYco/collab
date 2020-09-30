import React, { useState, useMemo, createContext } from 'react';
import Home from './components/home.js';
import LoginForm from './components/loginForm.js';
import Dashboard from './components/dashboard.js';
import SignUpForm from './components/signUpForm.js';
import NewGroupForm from './components/newGroupForm.js';
import GroupDashboard from './components/groupDashboard.js';
import { CurrUserContext } from './components/currUserContext.js';
import { HashRouter as Router, Route, Link } from 'react-router-dom';
import Styles from './Styles.css';
// Main component for the app
function App() {
	const [currUser, setCurrUserContext] = useState('context');
	const localUser = JSON.parse(localStorage.getItem('currUser'));
	const currUserMemo = useMemo(() => ({ currUser, setCurrUserContext }), [
		currUser,
		setCurrUserContext,
	]);
	const handleLocalStorage = () => { 
		localStorage.removeItem('currUser');
		localStorage.removeItem('loggedIn?');
		localStorage.removeItem('currGroup'); 
		localStorage.removeItem('currGroupId');
	}
	console.log(localUser)
	return (
		<CurrUserContext.Provider value={currUserMemo}>
			<Router>
				<nav className='nav-bar'>
					<ul className='nav-bar__items'>
						<li className='logo'>
							<Link
								to={localUser ? `/dashboard/curr_user=${localUser?._id}/get_user_dashboard` : '/'}>
								PEER PRESSURE
							</Link>
						</li>
						<div className='login-signup'>
							{localUser ? null : (
								<li className='login'>
									<Link to='/login'>LOGIN</Link>
								</li>
							)}
							{localUser ? (
								<li className='signup' onClick={handleLocalStorage}>
									<Link to='/'>SIGN OUT</Link>
								</li>
							) : (
								<li className='signup'>
									<Link to='/signup'>SIGN UP</Link>
								</li>
							)}
							{console.log(localUser)}
						</div>
					</ul>
				</nav>
				<Route exact path='/' component={Home} />
				<Route path='/login' component={LoginForm} />
				<Route path='/signup' component={SignUpForm} />
				<Route path='/groups/group_id=:group_id/add_user_to_group' component={LoginForm} />
				<Route path='/dashboard/curr_user=:curr_user/get_user_dashboard' component={Dashboard} />
				<Route path='/groups/user_id=:user_id/create_group' component={NewGroupForm} />
				<Route
					path='/group_dashboard/group_id=:group_id/get_group_dashboard'
					component={GroupDashboard}
				/>
			</Router>
		</CurrUserContext.Provider>
	);
}

export default App;
