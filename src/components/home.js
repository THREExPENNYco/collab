import React, { useState } from 'react';
import Hero from './hero.js';
import Info from './info.js';
import { Redirect } from 'react-router-dom';

function Home() {
	return (
		<section className='main'>
			<Hero />
			<Info />
			{localStorage.getItem('currUser') ? (
				<Redirect to={{ pathname: `/dashboard/${localStorage.getItem('currUser')}` }} />
			) : null}
		</section>
	);
}

export default Home;
