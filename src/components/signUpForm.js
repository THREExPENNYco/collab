import React from 'react'
import axios from 'axios'

function Form () {
  return (
    <form className="form">
      <label>First Name</label>
      <input type="text" name="first-name" /> 
      <label>Last Name</label> 
    </form>
  )
}

export default Form
