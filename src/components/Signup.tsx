import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate instead
import { API_BASE_URL } from '../helpers/api-data-service';

const apiBaseURL = API_BASE_URL;


const SignupForm = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    
    if (!username || !password) {
      console.error('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post(`${apiBaseURL}/accounts/register/`, {
        username,
        password,
      });

      if (response.data && response.data.Message === 'Registration successful') {
        console.log('Signup successful:', response.data);
        setRegistrationMessage('Registration successful');
        setRegistrationSuccess(true);
        navigate('/login'); // Redirect to the login page using useNavigate
      } else if (response.status === 400 && response.data.username) {
        setRegistrationMessage(response.data.username[0]);
        setRegistrationSuccess(false);
        console.log('Username already exists');
      } else {
        console.error('Signup failed:', response.data.Message);
        // Handle other error scenarios
      } 

    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.username) {
        console.log(error.response.data.username[0]);
        setRegistrationMessage('Username already exists');
        setRegistrationSuccess(false);
      }
      // Handle other error scenarios
    }
  };

  return (
    <div>
      <Label><h4>PBA :: Sign Up</h4></Label>
      {registrationSuccess ? (
        <p style={{ color: 'green' }}>{registrationMessage}</p>
      ) : (
        <p style={{ color: 'red' }}>{registrationMessage}</p>
      )}
      <Form>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Field>
        <Button onClick={handleSignup}>Sign Up</Button>
      </Form>
    </div>
  );
};

export default SignupForm;
