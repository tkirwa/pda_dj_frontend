import React, { useEffect, useState } from "react";
import { Form, Grid, Header } from "semantic-ui-react";
import axios from "axios";
import { API_BASE_URL } from "./api-data-service";

const apiBaseURL = API_BASE_URL;

const ProfilePage: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);

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
        setUserData(response.data[0]);
      })
      .catch((error) => {
        console.error("Error fetching settings:", error);
      });
  }, []);

  return (
    <div>
      <Header as="h4">Profile</Header>
      <Grid columns={1} stackable>
        <Grid.Row>
          <Grid.Column width={12}>
            <Form>
              {userData && (
                <>
                  <Form.Field>
                    <label>Last Login</label>
                    <input
                      type="text"
                      name="last_login"
                      value={userData.user.last_login}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Username</label>
                    <input
                      type="text"
                      name="username"
                      value={userData.user?.username}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>First Name</label>
                    <input
                      type="text"
                      name="first_name"
                      value={userData.user?.first_name}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="last_name"
                      value={userData.user?.last_name}
                      disabled
                    />
                  </Form.Field>
                  <Form.Field>
                    <label>Email</label>
                    <input
                      type="text"
                      name="email"
                      value={userData.user?.email}
                      disabled
                    />
                  </Form.Field>
                </>
              )}
            </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default ProfilePage;
