import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Income {
  id: number;
  description: string;
  amount: number;
  // Add more fields as needed based on your API response
}

const IncomeList: React.FC = () => {
  const [incomes, setIncomes] = useState<Income[]>([]);

  useEffect(() => {
    // Make an API request to fetch incomes
    const authToken = localStorage.getItem('authToken') || sessionStorage.getItem('authToken');

    axios
      .get<Income[]>('http://127.0.0.1:8000/api/v1/incomes/', {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        setIncomes(response.data);
      })
      .catch((error) => {
        console.error('Error fetching incomes:', error);
      });
  }, []);

  return (
    <div>
      <h2>Income List</h2>
      <ul>
        {incomes.map((income) => (
          <li key={income.id}>
            {income.description}: ${income.amount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IncomeList;
