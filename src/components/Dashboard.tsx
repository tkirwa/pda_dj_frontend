import React, {useState} from 'react';
import axios from 'axios';
import { Menu } from 'semantic-ui-react';
import { Button, Label } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import ExpenseList from './ExpenseList';
import IncomeList from './IncomeList';
import Overview from './Overview';
import { API_BASE_URL } from './api-data-service';
// import { EXPENSES } from './api-data-service';
// import { INCOMES } from './api-data-service';

const apiBaseURL = API_BASE_URL;

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [showOverview, setShowOverview] = useState(false); // State variable to toggle Overview visibility


  const handleToggleOverview = () => {
    setShowOverview(!showOverview);
  };

  const handleLogout = async (e: any) => {
    e.preventDefault();
    try {
      // Get the authentication token from localStorage or sessionStorage
      const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

      if (!authToken) {
        console.error('Authentication token not found.');
        // Handle the case where the token is not available
        navigate('/login');
        return;
      }

      // Include the token in the headers
      const headers = {
        Authorization: `Token ${authToken}`,
      };

      // Make the DELETE request to the logout endpoint with the token in the headers
      const response = await axios.delete(`${apiBaseURL}/accounts/logout/`, {
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
        <Menu.Menu>
          <Menu.Item>
            <Label
                style={{ backgroundColor: '#1B67AA', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={handleToggleOverview} // Call the handleToggleOverview function
              >
                {showOverview ? 'Overview' : 'Show Overview'} {/* Toggle label text */}
            </Label>
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Button onClick={handleLogout}>Logout</Button>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
      {!showOverview && <Overview/>}
      <ExpenseList />
      <IncomeList/>
    </>
  );
};

export default Dashboard;
