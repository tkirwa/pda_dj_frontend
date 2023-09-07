import React from 'react';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ExpenseList from './ExpenseList';

const API_BASE_URL = 'http://127.0.0.1:8000';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      // Get the authentication token from localStorage or sessionStorage
      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

      if (!authToken) {
        console.error('Authentication token not found.');
        // Handle the case where the token is not available
        // navigate('/login');
        return;
      }

      // Include the token in the headers
      const headers = {
        Authorization: `Token ${authToken}`,
      };

      // Make the DELETE request to the logout endpoint with the token in the headers
      const response = await axios.delete(`${API_BASE_URL}/accounts/logout/`, {
        headers,
      });

      // Handle the logout response here, e.g., clearing the token from storage
      if (response.status === 204) {
        // Clear the token from localStorage and/or sessionStorage
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');

        // Redirect to the landing page (homepage)
        navigate('/');

        // Handle any other logout logic here
      }
    } catch (error) {
      console.error('Logout error:', error);
      // Handle the logout error, if needed
    }
  };

  return (
    <>
      <Menu>
        <Menu.Item header>PBA: Dashboard</Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button onClick={handleLogout}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      <ExpenseList />
    </>
  );
};

export default Dashboard;
