import React from 'react'
import './CSS/LoginSignup.css'
const LoginSignup = () => {
  return (
    <div className='loginsignup'>
    <div className='loginsignup-container'>
     <h1>Sign Up</h1>
       <div className="loginsignup-fields">
     <input type="text" placeholder="Name" />
     <input type="email" placeholder="Email" />
     <input type="password" placeholder="Password" />
      </div>
      <button>Continue</button>
      <p className='loginsignup-login'>
        Already have an account? <span>Login Here</span>
      </p>
      <div className="loginsignup-agree">
        <input type="checkbox" name=' ' id='' />
        <label>I agree to the terms and conditions</label>
      </div>
    </div>
    </div>
  )
}

export default LoginSignup
