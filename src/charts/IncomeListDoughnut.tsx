import React, { useEffect, useState } from "react";
import axios from "axios";
// Import Chart and relevant components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { API_BASE_URL } from "../components/api-data-service";
import Loading from "../components/Loading";

ChartJS.register(ArcElement, Tooltip, Legend);

interface Income {
  id: number;
  name: string;
  category: string | null;
  amount: number;
  date: string;
}

const IncomeListDoughnut: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  // Initialize state for chart data
  const [incomeChartData, setIncomeChartData] = useState<any>({});

  useEffect(() => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    axios
      .get<Income[]>(`${API_BASE_URL}/api/v1/incomes/`, {
        headers: {
          Authorization: `Token ${authToken}`,
        },
      })
      .then((response) => {
        // Process the data to calculate total expenses by category, or date, etc.
        // For example, you can group expenses by category and sum the amounts.

        const categoryIncomes: { [key: string]: number } = {}; // Create an object to store category-wise expenses

        response.data.forEach((income) => {
          // Handle null category separately
          const category = income.category || "Uncategorized"; // Use 'Uncategorized' for null category

          if (!categoryIncomes[category]) {
            categoryIncomes[category] = 0;
          }
          categoryIncomes[category] += income.amount;
        });

        // Prepare data for the Doughnut chart
const data = {
  labels: Object.keys(categoryIncomes),
  datasets: [
    {
      data: Object.values(categoryIncomes),
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


setIncomeChartData(data);

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
            <Doughnut data={incomeChartData} />
          </div>
        </>
      )}
    </>
  );
};

export default IncomeListDoughnut;
