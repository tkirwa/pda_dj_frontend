import React from "react";
import { Grid, Button, Container } from "semantic-ui-react";

const ManagePane: React.FC = () => {
  return (
    <>
      <Container>
        <Grid columns={2} stackable>
          <Grid.Row style={{ backgroundColor: "#ccc" }}>
            <Grid.Column tablet={8} computer={8} textAlign="center">
              <Button
                style={{
                  backgroundColor: "#1B67AA",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#ffffff",
                }}
              >
                Add Expense
              </Button>
            </Grid.Column>
            <Grid.Column tablet={8} computer={8} textAlign="center">
              <Button
                style={{
                  backgroundColor: "#1B67AA",
                  fontWeight: "bold",
                  cursor: "pointer",
                  color: "#ffffff",
                }}
              >
                Add Income
              </Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Container>
    </>
  );
};

export default ManagePane;
