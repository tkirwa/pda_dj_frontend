import React, { useEffect, useState } from "react";
import axios from "axios";
import { Progress, Header } from "semantic-ui-react";
import { API_BASE_URL } from "../helpers/api-data-service";
import ProfilePage from "./ProfilePage";

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
          <hr/>
          <ProfilePage/>
        </div>
      ) : (
        <></>
      )}
      {progress < 100 && (
        <Progress value={progress} className="top attached progress" />
      )}
    </div>
  );
};

export default SettingsComponent;
