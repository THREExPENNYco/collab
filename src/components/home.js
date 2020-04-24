import React, { Component } from 'react'
import Navbar from './navbar.js'
import Hero from './hero.js'
import Info from './info.js'

function Home() {
    return (
        <section className="main">
            <Navbar />
            <Hero />
            <Info />
        </section>
    )
}

export default Home