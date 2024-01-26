import Navbar from '../components/Navbar'
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { useAuthentication } from '../components/AuthenticationContext';


const Signup = () => {
  const nav = useNavigate()
  const { isAuthenticated, setIsAuthenticated, user, setUser } = useAuthentication();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
    const response = await axios.post('http://localhost:5000/signup', formData)
    if (response.data.success) {
      console.log('Signup successful');
      setIsAuthenticated(true)
      setUser(response.data.user)
      nav("/home")

    } else {
      nav("/login")
    }
  } catch (error) {
    //console.error('Error during login:', error);
    nav("/signup")
  }
  setFormData({ email: '',
  password: ''})
  };

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

    <button type="submit" onClick={handleSignUp}>
      Sign Up
    </button>
  </form></div>
  );
};


export default Signup