import React from 'react';
// import logo from './logo.svg';
import './App.css';
// import { Routes, Route } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignupForm from './components/Signup';
import { Container } from 'semantic-ui-react'
import Navbar from './components/Navbar';
import LoginForm from './components/Login';
import Dashboard from './components/Dashboard';


function App() {
  return (
    <>
      <Router>
        <Container style={{ marginTop: '3em' }}>
          <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Container>
      </Router>
    </>
  );
}

export default App;
