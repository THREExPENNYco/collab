import React from 'react'
import axios from 'axios'

function Form () {
  return (
    <form className="form">
      <label>Username</label>
      <input type="text" name="username" /> 
      <label>email</label>
      <input type="text" name="email" />
      <input type="submit" value="submit" />
    </form>
  )
}

export default Form
