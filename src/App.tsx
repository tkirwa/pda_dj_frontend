import React from 'react';
// import logo from './logo.svg';
import './App.css';
import SignupForm from './components/Signup';
import { Container } from 'semantic-ui-react'
import Navbar from './components/Navbar';


function App() {
  return (
    <>
      <Container style={{ marginTop: '3em' }}>
        <Navbar></Navbar>
        <SignupForm></SignupForm>
      </Container>
    </>
  );
}

export default App;
