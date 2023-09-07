import React, { useState, useEffect } from 'react';
import { Header } from 'semantic-ui-react';
import BarChart from '../charts/BarChart';
import PieChart from '../charts/PieChart';

import { EXPENSES } from './api-data-service';
import { INCOMES } from './api-data-service';

interface OverviewProps {
  expenses: Expense[];
  incomes: Income[];
}

interface Expense {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
}

interface Income {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
}

const Overview: React.FC<OverviewProps> = () => {
  const [expensesData, setExpensesData] = useState<Expense[]>([]);
  const [incomesData, setIncomesData] = useState<Income[]>([]);

  useEffect(() => {
    // Fetch and prepare your expenses and incomes data here.
    // You can use the provided data or fetch it from an API.
    
    // Convert the EXPENSES and INCOMES data to the correct format.
    const formattedExpenses = EXPENSES.map((expense) => ({
      id: expense.id,
      name: expense.name,
      category: expense.category,
      amount: parseFloat(expense.amount), // Convert amount to number
      date: expense.date,
    }));

    const formattedIncomes = INCOMES.map((income) => ({
      id: income.id,
      name: income.name,
      category: income.category,
      amount: parseFloat(income.amount), // Convert amount to number
      date: income.date,
    }));

    setExpensesData(formattedExpenses);
    setIncomesData(formattedIncomes);
  }, []);

  // Prepare data for the Bar Chart
  const barChartData = {
    labels: expensesData.map((expense) => expense.category),
    datasets: [
      {
        label: 'Expense Amount',
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red color
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(255, 99, 132, 0.8)',
        hoverBorderColor: 'rgba(255, 99, 132, 1)',
        data: expensesData.map((expense) => expense.amount),
      },
    ],
  };

  // Prepare data for the Pie Chart
  const pieChartData = {
    labels: incomesData.map((income) => income.category),
    datasets: [
      {
        data: incomesData.map((income) => income.amount),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)', // Red color
          'rgba(54, 162, 235, 0.6)', // Blue color
          // ... other colors
        ],
      },
    ],
  };

  return (
    <>
      <Header.Subheader>
        Expenses & Incomes Overview & Stats
      </Header.Subheader>

      <h1>Expense and Income Analysis</h1>
      <BarChart data={barChartData} />
      <PieChart data={pieChartData} />
    </>
  );
};

export default Overview;
