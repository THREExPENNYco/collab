import React, { Component }  from 'react'
import Navbar from './components/navbar.js'
import Styles from './Styles.css'
import Hero from './components/hero.js'
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