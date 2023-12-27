// Import necessary dependencies
import React, { useState } from 'react';
import '../css/auth.css'; 
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API calling
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container">
      <div className="card pt-5">
        <h2 className="">Login to your Account</h2>
        <form className="mt-3" onSubmit={handleSubmit}>
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

          <button type="submit" className=" mt-3 btn btn-primary">
            Login
          </button>
          <div className="mt-2 d-flex justify-content-end">
            <span>
              Don't have an account? <Link to="/signup">SignUp</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
