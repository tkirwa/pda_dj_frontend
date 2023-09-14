import React from "react";
import { Header, Grid } from "semantic-ui-react";
import ExpenseListDoughnut from "../charts/ExpenseListDoughnut";
import IncomeListDoughnut from '../charts/IncomeListDoughnut';

const StatsDashboard: React.FC = () => {
  return (
    <div>
      <Grid columns={2} stackable>
        <Grid.Row>
          <Grid.Column tablet={8} computer={8}>
            {/* ExpenseListDoughnut component */}
            <ExpenseListDoughnut />
            <Header as="h4" textAlign="center">
              Expenses based on Categories
            </Header>
          </Grid.Column>
          <Grid.Column tablet={8} computer={8}>
            {/* IncomeListDoughnut component */}
            <IncomeListDoughnut />
            <Header as="h4" textAlign="center">
              Incomes based on Categories
            </Header>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
};

export default StatsDashboard;
