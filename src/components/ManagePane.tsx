import React, { useState } from "react";
import { Grid, Button, Container, Icon } from "semantic-ui-react";
import AddExpenseForm from "./AddExpenseForm"; // Import the AddExpenseForm component
import AddIncomeForm from "./AddIncomeForm";

const ManagePane: React.FC = () => {
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);
  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);

  const handleToggleAddExpenseForm = () => {
    setShowAddExpenseForm(!showAddExpenseForm);
    setShowAddIncomeForm(false);
  };

  const handleToggleAddIncomeForm = () => {
    setShowAddIncomeForm(!showAddIncomeForm);
    setShowAddExpenseForm(false);
  };

  return (
    <Container
      style={{
        backgroundColor: "#ccc",
        borderRadius: "5px",
        margin: "1.2em 0 1.2em 0",
      }}
    >
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column tablet={8} computer={8} textAlign="center">
            <Button
              style={{
                backgroundColor: "#1B67AA",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#ffffff",
              }}
              onClick={handleToggleAddExpenseForm}
            >
              {showAddExpenseForm ? (
                <>
                  <Icon name="plus" /> Expense
                </>
              ) : (
                <>
                  <Icon name="plus" /> Expense
                </>
              )}
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
              onClick={handleToggleAddIncomeForm}
            >
              {showAddExpenseForm ? (
                <>
                  <Icon name="plus" /> Income
                </>
              ) : (
                <>
                  <Icon name="plus" /> Income
                </>
              )}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {showAddExpenseForm && <AddExpenseForm />}
      {showAddIncomeForm && <AddIncomeForm />}
    </Container>
  );
};

export default ManagePane;
