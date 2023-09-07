import React from 'react';
// import React, {useState} from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import AppContent from './AppContent';


const App: React.FC = () => {
  // Initialize state for authentication status
  const isAuthenticated = !!localStorage.getItem('authToken') || !!sessionStorage.getItem('authToken');

  return (
    <Router>
      <Container style={{ marginTop: '3em' }}>
        <AppContent isAuthenticated={isAuthenticated} /> {/* Render the content of the app */}
      </Container>
    </Router>
  );
};

export default App;
