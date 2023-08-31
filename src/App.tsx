import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { Navigate } from 'react-router-dom';

// import { Routes, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react'
import Navbar from './components/Navbar';

// import Navbar from '../components/Navbar';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Landing';



const App = () => (
    <>
      <Router>
        <Container style={{ marginTop: '3em' }}>
            <Navbar/>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Container>
      </Router>
    </>
)

export default App
