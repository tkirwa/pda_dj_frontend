// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

// Define the interface for props
interface LoginFormProps {
  setIsLoggedIn: (isLoggedIn: boolean) => void;
}

const API_BASE_URL = 'http://127.0.0.1:8000';

const LoginForm: React.FC<LoginFormProps> = ({ setIsLoggedIn }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);


  // useEffect(() => {
  //   const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');
    
  //   if (authToken) {
  //     navigate('/dashboard');
  //   }
  // }, [navigate]); // Ensure this effect runs only when navigate changes
  

  const handleLogin = async (e: any) => {
    e.preventDefault();

    if (!username || !password) {
      console.error('Username and password are required.');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/accounts/login/`, {
        username,
        password,
      });

      if (response.data && response.data.token) {
        console.log('Login successful:', response.data);
        const token = response.data.token;

        if (rememberMe) {
          // Store token in localStorage if "Remember Me" is checked
          localStorage.setItem('authToken', token);
        } else {
          // Otherwise, store it in sessionStorage
          sessionStorage.setItem('authToken', token);
        }

        setLoginMessage('Login successful');
        setLoginSuccess(true);
        setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
        // Redirect to dashboard or another page upon successful login
        navigate('/dashboard'); // Redirect to the login page using useNavigate
      } else {
        console.error('Login failed:', response.data.Message);
        setLoginMessage('Login failed');
        setLoginSuccess(false);
      }
    } catch (error: any) {
      console.error('Login error', error);
      setLoginMessage('Login error');
      setLoginSuccess(false);
    }
  };

  return (
    <div>
      <Label><h4>PBA :: Login</h4></Label>
      {loginSuccess ? (
        <p style={{ color: 'green' }}>{loginMessage}</p>
      ) : (
        <p style={{ color: 'red' }}>{loginMessage}</p>
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
        <Form.Field>
          <input
            type='checkbox'
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          /><label>Remember Me</label>
        </Form.Field>
        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
