import React, { useEffect, useState } from "react";
import { Dropdown, Icon } from "semantic-ui-react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "./api-data-service";
import axios from "axios";

const apiBaseURL = API_BASE_URL;

const authTokenLocalStorage = localStorage.getItem("authToken");
const authTokenSessionStorage = sessionStorage.getItem("authToken");

const isAuthenticatedInitially =
  !!authTokenLocalStorage || !!authTokenSessionStorage;

const DropdownTriggerMenu: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(
    isAuthenticatedInitially
  );
  // const [username, setUsername] = useState("");

  const trigger = (
    <span>
      <Icon name="user" />
      {/* Retrieve user name here - example Hello, Bob */}
    </span>
  );

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      // Check if the authentication token exists in localStorage
      const authTokenLocalStorage = localStorage.getItem("authToken");

      // Check if the authentication token exists in sessionStorage
      const authTokenSessionStorage = sessionStorage.getItem("authToken");

      // Use one of the tokens (localStorage takes precedence) if it exists
      const authToken = authTokenLocalStorage || authTokenSessionStorage;

      // Include the token in the headers
      const headers = {
        Authorization: `Token ${authToken}`,
      };

      // Make the DELETE request to the logout endpoint with the token in the headers
      const response = await axios.delete(`${apiBaseURL}/accounts/logout/`, {
        headers,
      });

      // Handle the logout response here, e.g., clearing the token from storage
      if (response.status === 204 || !authToken) {
        console.log("Server logout sucdessful");
      }

      // Clear the token from localStorage and/or sessionStorage
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
      setIsAuthenticated(false); // Set isAuthenticated to false

      // Redirect to the login page after successful logout
      navigate("/login", { replace: true });

      // Handle the logout response here, e.g., clearing the token from storage
      // if (response.status === 204 || !authToken) {
      //   // Clear the token from localStorage and/or sessionStorage
      //   localStorage.removeItem("authToken");
      //   sessionStorage.removeItem("authToken");
      //   setIsAuthenticated(false);

      //   // Redirect to the login page after successful logout
      //   if (isAuthenticated) {
      //     navigate("/dashboard", { replace: true });
      //   } else {
      //     navigate("/login", { replace: true });
      //   }
      // }
    } catch (error) {
      console.error("Logout error:", error);
      // Handle the logout error, if needed
    }
  };

  // Use useEffect to listen for changes in isAuthenticated and redirect
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const options = [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>Bob Smith</strong>
        </span>
      ),
      disabled: true,
    },
    { key: "profile", text: "Profile" },
    { key: "settings", text: "Settings" },
    { key: "sign-out", text: "Sign Out", onClick: handleLogout },
  ];

  return <Dropdown trigger={trigger} options={options} />;
};

export default DropdownTriggerMenu;
