import React, { useEffect, useState } from "react";
import axios from "axios";
import { Progress, Header, List } from "semantic-ui-react";
import { API_BASE_URL } from "./api-data-service";

const apiBaseURL = API_BASE_URL;

const SettingsComponent: React.FC = () => {
  const [settings, setSettings] = useState<any>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Replace 'YOUR_AUTH_TOKEN' with the actual authentication token
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    // Define the headers with the authentication token
    const headers = {
      Authorization: `Token ${authToken}`,
    };

    // Make an API request to fetch user settings with the token header
    axios
      .get(apiBaseURL + "/api/v1/settings/", { headers })
      .then((response) => {
        // Assuming the API response is an array of settings, and you have only one settings object
        setSettings(response.data[0]);
        setProgress(100);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  return (
    <div>
      <Header as="h4">Preferred Settings</Header>
      {settings ? (
        <div>
          <p>Currency Preference {settings.currency_preference}</p>
          <p>Timezone {settings.timezone}</p>
          <p>User:</p>
          <List>
            <List.Item>
              <List.Content>
                <List.Header>Username: {settings.user.username}</List.Header>
                <List.Description>
                  Email: {settings.user.email}
                </List.Description>
                {/* Add more user properties as needed */}
              </List.Content>
            </List.Item>
          </List>
        </div>
      ) : (
        <></>
      )}
      {progress < 100 && (
          <Progress value={progress} className="top attached progress"/>
      )}
    </div>
  );
};

export default SettingsComponent;