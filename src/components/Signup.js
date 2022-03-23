import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  })
  const handleCredentials = (e) => {
    setCredentials({...credentials, [e.target.name]: e.target.value})
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    if(credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }
    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success) {
      //* Redirect
      props.showAlert("Sign-up Successful", "success");
      localStorage.setItem("token", json.authToken);
      navigate("/login");

    }
    else {
      props.showAlert(json.errors, "danger");
    }
  }
  return (
    <div className='container'>
      <h2 className='mb-4'>Sign Up to use iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={handleCredentials} value={credentials.name} aria-describedby="nameHelp" minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={handleCredentials} value={credentials.email} aria-describedby="emailHelp" minLength={5} required />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" name="password" className="form-control" id="password" onChange={handleCredentials} value={credentials.password} minLength={8} required />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" name="cpassword" className="form-control" id="cpassword" onChange={handleCredentials} value={credentials.cpassword} minLength={8} required />
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
      </form>
    </div>
  )
}

export default Signup