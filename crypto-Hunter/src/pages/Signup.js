import React, { useState } from 'react';
import './Login.css';
import { makeuser } from '../Serverapi/api';
import { useNavigate } from 'react-router-dom';

const form = {
  name: '',
  email: '',
  password: ''
};

export default function Signup() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState(form);
  const [done, setdone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

  async function handle(e) {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when the form is submitted

    try {
      const response = await makeuser(formdata);
      console.log(response);

      if (response.data.status === 200) {
        setdone('Successfully signed up, please login');
      } else if (response.data.status === 409) {
        alert("Email already registered")
        console.log('User already exists');
        navigate('/login');
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false after form submission
    }
  }

  return (
    <div className="login-container">
      <h1 className="login-heading">Sign-up</h1>
      <span style={{ color: 'green' }}>{done}</span>
      <form onSubmit={handle}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            className="form-control"
            onChange={(e) => {
              setformdata({ ...formdata, name: e.target.value });
            }}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            className="form-control"
            onChange={(e) => {
              setformdata({ ...formdata, email: e.target.value });
            }}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            className="form-control"
            onChange={(e) => {
              setformdata({ ...formdata, password: e.target.value });
            }}
            required
          />
        </div>
        <button type="submit" className="login-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.5 : 1 }}>
          Sign-up
        </button>
      </form>
    </div>
  );
}
