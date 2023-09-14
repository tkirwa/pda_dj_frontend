import React, { useEffect, useState } from "react";
import axios from "axios";
// Import Chart and relevant components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { API_BASE_URL } from "../components/api-data-service";
import Loading from "../components/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Expense {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

const ExpenseListDoughnut: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Initialize state for chart data
  const [expenseChartData, setExpenseChartData] = useState<any>({});

  useEffect(() => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    axios
      .get<Expense[]>(`${API_BASE_URL}/api/v1/expenses/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        // Process the data to calculate total expenses by category, or date, etc.
        // For example, you can group expenses by category and sum the amounts.

        const categoryExpenses: { [key: string]: number } = {}; // Create an object to store category-wise expenses

        response.data.forEach((expense) => {
          // Handle null category separately
          const category = expense.category || "Uncategorized"; // Use 'Uncategorized' for null category

          if (!categoryExpenses[category]) {
            categoryExpenses[category] = 0;
          }
          categoryExpenses[category] += expense.amount;
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
        "#FF5733",
        "#C70039",
        "#900C3F",
        "#581845",
        "#2C3E50",
        "#3498DB",
        "#1ABC9C",
        "#F1C40F",
      ],
    },
  ],
};


        setExpenseChartData(data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div>
            {/* Render your Doughnut chart */}
            <Doughnut data={expenseChartData} />
          </div>
        </>
      )}
    </>
  );
};

export default ExpenseListDoughnut;
