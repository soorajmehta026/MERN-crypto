import './Login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import uploadData from '../Serverapi/api';
import { CryptoState } from '../CryptoContext';

const form = {
  email: '',
  password: ''
};

export default function Login() {
  const navigate = useNavigate();
  const [formdata, setformdata] = useState(form);
  const { setusername, useremail, setuseremail, setlogged } = CryptoState();
  const [isSubmitting, setIsSubmitting] = useState(false); // New state variable

  function handlechange(firstName) {
    console.log("here")
    setusername(firstName);
    setuseremail(formdata.email);
    setlogged(1);
    localStorage.setItem('loggedIn', 'true');
    localStorage.setItem('userFirstName', firstName);
    localStorage.setItem('email', formdata.email);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true); // Set isSubmitting to true when the form is submitted

    const data = {
      email: formdata.email,
      password: formdata.password,
    };

    try {
      const response = await uploadData(data);

      if (response.status === 401) {
        alert('Password incorrect');
      } else if (response.status === 200) {
        const firstName = response.data.name.split(' ')[0];
        handlechange(firstName);
        navigate('/crypto-hunter');
      } else {
        alert('Email incorrect');
      }
    } catch (err) {
      setlogged('Unregistered user, try signing up');
      console.log(err);
    } finally {
      setIsSubmitting(false); // Set isSubmitting back to false after form submission
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="login-container">
          <h1 className="login-heading">Login</h1>
          {console.log("sbgdfb" + useremail)}

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" id="email" className="form-control" onChange={(e) => {
              setformdata({ ...formdata, email: e.target.value })
            }} required />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" className="form-control" onChange={(e) => {
              setformdata({ ...formdata, password: e.target.value })
            }} required />
          </div>
          <button type='submit' className="login-btn" disabled={isSubmitting} style={{ opacity: isSubmitting ? 0.5 : 1 }}>Login</button>
          <button className="login-btn" style={{ backgroundColor: 'green' }} onClick={() => navigate('/signup')}>Sign-up</button>
        </div>
      </form>
    </>
  );
}
