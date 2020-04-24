import React, { Component } from 'react'
import Navbar from './components/navbar.js'
import Hero from './components/hero.js'
import Styles from './Styles.css'
// Main component for the app
class App extends Component {
  render () {
    return (
      <section className="main">
        <Navbar />
        <Hero />
      </section>
    )
  }
}

export default App
