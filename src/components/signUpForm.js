import React from 'react'
import axios from 'axios'

function Form() {
    return (
        <section className="form-container">
           <p className="hero-signup__sign">SIGN</p> 
           <p className="hero-signup__up">UP</p>
            <form className="signup-form">
                <label className="form-label">USERNAME</label>
                <input className="form-input" type='text' name="username" />
                <label className="form-label">EMAIL</label>
                <input className="form-input" type="text" name="email" />
                <label className="form-label">PASSWORD</label>
                <input className="form-input" type="text" name="password" />
                <input className="form-submit-button" type="submit" value="SUBMIT" />
            </form>
            <p className="info-signup-form">I only use your email for the purposes of PEER PRESSURE
            </p>
        </section>
    )
}

export default Form
