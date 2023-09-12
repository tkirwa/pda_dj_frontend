import React, { useState } from "react";
import axios from "axios";
import { Button, Form, Icon, Label } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api-data-service";

const apiBaseURL = API_BASE_URL;

const LoginForm: React.FC = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // State variables to store user input and error messages
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [usernameError, setUsernameError] = useState(""); // Error message for username
  const [passwordError, setPasswordError] = useState(""); // Error message for password

  // Function to toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to handle user login
  const handleLogin = async (e: any) => {
    e.preventDefault();

    // Reset previous error messages
    setUsernameError("");
    setPasswordError("");

    // Clear any pre-existing tokens in localStorage and sessionStorage
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");

    // Validate username and password inputs
    if (!username) {
      setUsernameError("Username is required."); // Set the username error message
    }

    if (!password) {
      setPasswordError("Password is required."); // Set the password error message
    }

    if (!username || !password) {
      console.error("Username and password are required.");
      return;
    }

    try {
      // Send a POST request to the login API endpoint
      const response = await axios.post(`${apiBaseURL}/accounts/login/`, {
        username,
        password,
      });

      if (response.data && response.data.token) {
        // Successful login
        console.log(response.data);
        const token = response.data.token;

        if (rememberMe) {
          // Store the authentication token in localStorage
          localStorage.setItem("authToken", token);
        } else {
          // Store the authentication token in sessionStorage
          sessionStorage.setItem("authToken", token);
        }

        // Navigate to the dashboard page upon successful login
        navigate("/dashboard", { replace: true });
      } else {
        // Login failed
        console.error("Login failed:", response.data.Message);
        setUsernameError("Login failed"); // Display an error message
      }

      navigate("/dashboard", { replace: true });
    } catch (error: any) {
      // Handle login error
      console.error("Login error", error);
      setUsernameError("Login error"); // Display an error message
    }
  };

  return (
    <div>
      <Label>
        <h4>PBA :: Login</h4>
      </Label>
      <Form>
        <Form.Field>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <p style={{ color: "red" }}>{usernameError}</p>
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Icon
            name={showPassword ? "eye slash" : "eye"}
            link
            onClick={togglePasswordVisibility}
            style={{
              position: "absolute",
              top: "50%",
              right: "10px", // Adjust this value to fine-tune the icon's horizontal position
              cursor: "pointer",
            }}
          />
          <label htmlFor="password" style={{ color: "red" }}>
            {passwordError}
          </label>
        </Form.Field>
        <Form.Field>
          <div className="ui checkbox">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={rememberMe}
              onChange={() => setRememberMe(!rememberMe)}
            />
            <label htmlFor="rememberMe">Remember Me</label>
          </div>
        </Form.Field>

        <Button onClick={handleLogin}>Login</Button>
      </Form>
    </div>
  );
};

export default LoginForm;
