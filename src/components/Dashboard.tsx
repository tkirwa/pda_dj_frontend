// import React, { useEffect } from 'react';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ExpenseList from './ExpenseList';

const API_BASE_URL = 'http://127.0.0.1:8000';


const Dashboard = ({ setIsLoggedIn }: any) => {
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
      console.log(authToken);



      // Include the token in the headers
      const headers = {
        Authorization: `Token ${authToken}`,
      };

      // Make the DELETE request to the logout endpoint with the token in the headers
      const response = await axios.delete(`${API_BASE_URL}/accounts/logout/`, {
        headers,
      });

      console.log(headers);


      // Handle the logout response here, e.g., clearing the token from storage
      if (response.status === 204) {
        // Clear the token from localStorage and/or sessionStorage
        localStorage.removeItem('authToken');
        sessionStorage.removeItem('authToken');
  
        // Update the isLoggedIn state to false
        setIsLoggedIn(false);

        // Handle any other logout logic, e.g., navigating to the login page
        // Redirect to login page
        navigate('/login');
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
      {/* <Menu.Item
        name='aboutUs'
        active={activeItem === 'aboutUs'}
        onClick={this.handleItemClick}
      /> */}
      <Menu.Menu position='right'>
        <Menu.Item>
            <Button onClick={handleLogout}>Logout</Button>
        </Menu.Item>
      </Menu.Menu>
    </Menu>

    <ExpenseList/>
    </>

  );
};

export default Dashboard;
