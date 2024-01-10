// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import '../css/style.css';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

// Create SignUp component
const SignUp = () => {
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
      const { data } = await axios.post("http://localhost:8000/register/", {
        username,
        email,
        password,
      });
      console.log(data)
      navigate("/login");
      console.log('SignUp Successful');
  };

  return (
    <div className="container">
      <div className="card pt-5">
        <h2 className="">Create a new Account</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
          <div className="">
            <label htmlFor="username" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter full name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="">
            <label htmlFor="username" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter full name"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className=" mt-3 btn btn-primary">
            Sign Up
          </button>
          <div className="mt-2 d-flex justify-content-end">
            <span>
              Already have an account ? <Link to="/login">Login</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
