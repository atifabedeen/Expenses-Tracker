import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
import App from './App';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Secret from './pages/Secret';
import Logout from './components/Logout';

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthenticationProvider } from './components/AuthenticationContext';
import ProtectedRoute from './components/ProtectedRoute';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <AuthenticationProvider>
  <Router>
  <Routes>
        <Route path="/" exact element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/secret" element = {<ProtectedRoute><Secret /></ProtectedRoute>} />
        <Route path="/home" element = {<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />

    </Routes>
    </Router>
    </AuthenticationProvider>

   
 </React.StrictMode>
);

