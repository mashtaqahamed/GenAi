import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Chatroom from './pages/Chatroom';
import DarkModeToggle from './pages/DarkModeToggle';
import './App.css';

function App() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
   <Router>
  <Routes>
    <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
    <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
    <Route path="/chat/:id" element={isAuthenticated ? <Chatroom /> : <Navigate to="/" />} />
  </Routes>
</Router>

  );
}

export default App;
