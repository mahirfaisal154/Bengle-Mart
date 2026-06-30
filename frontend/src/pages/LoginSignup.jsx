import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './CSS/LoginSignup.css'

const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const login = async () => {
    const response = await fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, password: formData.password })
    });
    return response.json();
  };

  const signup = async () => {
    const response = await fetch('http://localhost:4000/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    return response.json();
  };

  const handleSubmit = async () => {
    setError("");

    if (state === "Signup" && !formData.name) {
      setError("Please enter your name");
      return;
    }
    if (!formData.email || !formData.password) {
      setError("Please enter your email and password");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);
    try {
      const data = state === "Login" ? await login() : await signup();
      console.log(`${state} response:`, data);
      if (data.success) {
        document.cookie = `auth-token=${data.token}; path=/; max-age=${7 * 24 * 60 * 60}`;
        window.location.replace('/');
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error(`${state} request failed:`, err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='loginsignup'>
      <div className='loginsignup-container'>
        <h1>{state}</h1>
        <div className="loginsignup-fields">
          {state === "Signup" ? (
            <input type="text" name="name" value={formData.name} onChange={changeHandler} placeholder="Your Name" />
          ) : <></>}
          <input type="email" name="email" value={formData.email} onChange={changeHandler} placeholder="Email" />
          <input type="password" name="password" value={formData.password} onChange={changeHandler} placeholder="Password" />
        </div>
        {error && <p className='loginsignup-error'>{error}</p>}
        <button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Please wait..." : "Continue"}
        </button>
        {state === "Login" ? (
          <p className='loginsignup-login'>
            Create an account? <span onClick={() => setState("Signup")}>Signup Here</span>
          </p>
        ) : (
          <p className='loginsignup-login'>
            Already have an account? <span onClick={() => setState("Login")}>Login Here</span>
          </p>
        )}
        <div className="loginsignup-agree">
          <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} id='agree-checkbox' />
          <label htmlFor='agree-checkbox'>I agree to the terms and conditions</label>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
