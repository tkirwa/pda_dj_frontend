import React from "react";
// import React, {useState} from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Container } from "semantic-ui-react";

import AppContent from "./AppContent";

const App: React.FC = () => {
  // Check if the authentication token exists in localStorage
  const authTokenLocalStorage = localStorage.getItem("authToken");

  // Check if the authentication token exists in sessionStorage
  const authTokenSessionStorage = sessionStorage.getItem("authToken");

  // Use one of the tokens (localStorage takes precedence) if it exists
  const isAuthenticated = !!authTokenLocalStorage || !!authTokenSessionStorage;
  return (
    <Router>
      <Container style={{ marginTop: "3em" }}>
        <AppContent isAuthenticated={isAuthenticated} />{" "}
        {/* Render the content of the app */}
      </Container>
    </Router>
  );
};

export default App;
