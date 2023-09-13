import React from "react";
import {
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import LandingPage from "./components/Landing";
import SignupForm from "./components/Signup";
import LoginForm from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./components/Dashboard";

interface AppContentProps {
  isAuthenticated: boolean;
}

// Create a separate component for the content that uses useLocation
const AppContent: React.FC<AppContentProps> = ({ isAuthenticated }) => {
  const location = useLocation(); // Get the current route location

  const isDashboardRoute = location.pathname === "/dashboard";

  // Redirect to /dashboard if isAuthenticated is true and user visits / or /login
  if (isAuthenticated && (location.pathname === "/" || location.pathname === "/login")) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div>
      {!isDashboardRoute && <Navbar />} {/* Render Navbar based on route */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
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