import React, { Component }  from 'react'
import Navbar from './components/navbar.js'
import Main from './components/main.js'
import Styles from './Styles.css'
// Main component for the app
class App extends Component {
  render () {
    return (
      <section className="main">
        <Main />
        <Navbar />  
      </section> 
    )
  }
}
 
export default App