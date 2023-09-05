import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import { Container } from 'semantic-ui-react';

import Navbar from './components/Navbar';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';
import Dashboard from './components/Dashboard';
import LandingPage from './components/Landing';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      <Router>
        <Container style={{ marginTop: '3em' }}>
        {!isLoggedIn && <Navbar />} {/* Conditionally render Navbar */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignupForm />} />
            <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />

            <Route path="/login" element={isLoggedIn ? <Navigate to="/dashboard" /> : <LoginForm setIsLoggedIn={setIsLoggedIn}/>}
            />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard setIsLoggedIn={setIsLoggedIn}/> : <Navigate to="/login" />}
            />
          </Routes>
        </Container>
      </Router>
    </>
  );
};

export default App;
