import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { API_BASE_URL } from "../components/api-data-service";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  id: number;
  name: string;
  category: string | null;
  amount: string; // Use string type for amount based on the API response
}


const apiBaseURL = API_BASE_URL;

const ExpenseListDoughnut: React.FC = () => {
  const [expenseData, setExpenseData] = useState<Expense[]>([]);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    const fetchExpenseData = async () => {
      try {
        const response = await axios.get<Expense[]>(

          `${apiBaseURL}/api/v1/expenses/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,            },
          }
        );
        setExpenseData(response.data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchExpenseData();
  }, []);

  // Calculate total incomes by category
  const categoryExpenses: { [key: string]: number } = {};

  expenseData.forEach((expense) => {
    const category = expense.category || "Uncategorized";
    const amount = parseFloat(expense.amount); // Convert amount to a float

    if (!categoryExpenses[category]) {
      categoryExpenses[category] = 0;
    }
    categoryExpenses[category] += amount;
  });

  // Prepare data for the Doughnut chart
  const data = {
    labels: Object.keys(categoryExpenses),
    datasets: [
      {
        data: Object.values(categoryExpenses),
        backgroundColor: [
          "#FF5733",
          "#FFC300",
          "#C70039",
          "#900C3F",
          "#581845",
          "#2C3E50",
          "#3498DB",
          "#1ABC9C",
          "#F1C40F",
          "#E74C3C", // Red
        ],
      },
    ],
  };

  return (
    <div>
      <Doughnut data={data} />
    </div>
  );
};

export default ExpenseListDoughnut;
