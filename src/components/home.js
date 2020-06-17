import React from 'react';
import Hero from './hero.js';
import Info from './info.js';
import { Redirect } from 'react-router-dom';

function Home() {
	return (
		<section className='main'>
			<Hero />
			<Info />
			{localStorage.getItem('currUserName') ? (
				<Redirect to={{ pathname: `/dashboard/curr_user=${localStorage.getItem('currUserName')}` }} />
			) : null}
		</section>
	);
}

export default Home;
