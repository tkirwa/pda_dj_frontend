import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/Landing';
import SignupForm from './components/Signup';
import LoginForm from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Dashboard from './components/Dashboard';


// Create a separate component for the content that uses useLocation
const AppContent: React.FC<{ isAuthenticated: boolean }> = ({ isAuthenticated }) => {
    const location = useLocation(); // Get the current route location
    const isDashboardRoute = location.pathname === '/dashboard';
  
    return (
      <div>
        {!isDashboardRoute && <Navbar/>} {/* Render Navbar based on route */}
        <Routes>
          <Route path="/" element={<LandingPage/>} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <Dashboard />
                </PrivateRoute>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          {/* Redirect to login for any unknown route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    );
  };


 export default AppContent;
