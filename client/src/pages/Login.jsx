import Navbar from '../components/Navbar'
import React, { useState, useEffect } from 'react';
import axios from "axios"
import { useNavigate} from "react-router-dom";
import { useAuthentication } from '../components/AuthenticationContext';


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuthentication();
  const nav = useNavigate();
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
  
      if (response.data.success) {
        setIsAuthenticated(true)
        setUser(response.data.id)
        nav("/home")

      } else {
        nav("/login")
      }
    } catch (error) {
      //console.error('Error during login:', error);
      nav("/login")
    }
    setFormData({ email: '',
    password: ''})

  };
  
  // useEffect(() => {
  //   const checkAuthentication = async () => {
  //     if(isAuthenticated === null) {
  //       return
  //     }
  //     try {
  //       const response = await axios.post('http://localhost:5000/login', formData);
    
  //       if (response.data.success) {
  //         console.log('Login successful');
  //         setIsAuthenticated(true)
  //         nav("/home")
  
  //       } else {
  //         nav("/login")
  //       }
  //     } catch (error) {
  //       //console.error('Error during login:', error);
  //       nav("/login")
  //     }
  //   };
  //   checkAuthentication();
  // }, [isAuthenticated, nav]);

  return (
    <div>
    <Navbar />
      <form>
    <label>
      Email:
      <input type="email" name="email" value={formData.email} onChange={handleInputChange} required/>
    </label>

    <label>
      Password:
      <input type="password" name="password" value={formData.password} onChange={handleInputChange} required/>
    </label>

    <button type="submit" onClick={handleLogIn}>
      Log In
    </button>
  </form></div>
 
  );
};



export default Login
