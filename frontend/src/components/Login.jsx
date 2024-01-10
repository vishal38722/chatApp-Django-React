// Import necessary dependencies
import React, { useEffect, useState } from 'react';
import '../css/style.css'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';

const Login = () => {
  useEffect(() => {
    console.log("Login Page")
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [])
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try{

      const { data } = await axios.post('http://localhost:8000/login/', {
        email,
        password,
      });
      console.log(data);
      localStorage.setItem('token', data.token);
      console.log('Login Successful');
      toast.success("Login Successful");
      navigate("/");
    }catch(error){
      console.log(error);
      toast.error("Something went wrong!")
    }
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
