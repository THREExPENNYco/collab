import React from 'react'
import axios from 'axios'

function Form() {
  return (
      <section className="form-container">
         <p className="hero-signup__sign">LOGIN</p> 
          <form className="signup-form">
              <label className="form-label">USERNAME</label>
              <input className="form-input" type='text' name="username" />
              <label className="form-label">PASSWORD</label>
              <input className="form-input" type="text" name="password" />
              <input className="form-submit-button" type="submit" value="SUBMIT" />
          </form>
      </section>
  )
}
export default Form
