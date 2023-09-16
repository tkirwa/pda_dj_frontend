import React from 'react';
import { Header } from 'semantic-ui-react';
import StatsDashboard from '../charts/StatsDashboard';
// import IncomeListDoughnut from '../charts/IncomeListDoughnut';

const Overview: React.FC = () => {
  return (
    <div>
      <Header as="h3" textAlign="center">Overview :: Expenses, Incomes Stats & Analytics</Header>
      <StatsDashboard/>
    </div>
  );
};

export default Overview;
