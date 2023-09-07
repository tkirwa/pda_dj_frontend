import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Icon, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:8000';

const LoginForm: React.FC = () => {

  const navigate = useNavigate(); // Initialize useNavigate

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginMessage, setLoginMessage] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);

  const [usernameError, setUsernameError] = useState(''); // Error message for username
  const [passwordError, setPasswordError] = useState(''); // Error message for password

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Reset previous error messages
    setUsernameError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required.'); // Set the username error message
    }

    if (!password) {
      setPasswordError('Password is required.'); // Set the password error message
    }

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

        // Redirect to /dashboard on successful login
        navigate('/dashboard');
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
          <p style={{ color: 'red' }}>{usernameError}</p>
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Icon
            name={showPassword ? 'eye slash' : 'eye'}
            link
            onClick={togglePasswordVisibility}
            style={{
              position: 'absolute',
              top: '50%',
              right: '10px', // Adjust this value to adjust the icon's position
              transform: 'translateY(-50%)',
              cursor: 'pointer',
            }}
          />
          <label style={{ color: 'red' }}>{passwordError}</label>
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
