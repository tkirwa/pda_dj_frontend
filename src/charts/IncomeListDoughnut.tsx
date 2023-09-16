import React, { useEffect, useState } from "react";
import axios from "axios";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { API_BASE_URL } from "../helpers/api-data-service";
import { Header } from "semantic-ui-react";

interface Income {
  id: number;
  name: string;
  category: string | null;
  amount: string; // Use string type for amount based on the API response
}

ChartJS.register(ArcElement, Tooltip, Legend);
const apiBaseURL = API_BASE_URL;

const IncomeListDoughnut: React.FC = () => {
  const [incomeData, setIncomeData] = useState<Income[]>([]);
  const [totalIncomeAmount, setTotalIncomeAmount] = useState<number>(0); // Initialize as zero

  useEffect(() => {
    const authToken =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

    const fetchIncomeData = async () => {
      try {
        const response = await axios.get<Income[]>(
          `${apiBaseURL}/api/v1/incomes/`,
          {
            headers: {
              Authorization: `Token ${authToken}`,
            },
          }
        );
        setIncomeData(response.data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    };

    fetchIncomeData();
  }, []);

  useEffect(() => {
    // Calculate total incomes when incomeData changes
    const totalAmount = incomeData.reduce((total, income) => {
      const amount = parseFloat(income.amount) || 0;
      return total + amount;
    }, 0);

    setTotalIncomeAmount(totalAmount);
  }, [incomeData]);

  // Calculate total incomes by category
  const categoryIncomes: { [key: string]: number } = {};

  incomeData.forEach((income) => {
    const category = income.category || "Uncategorized";
    const amount = parseFloat(income.amount); // Convert amount to a float

    if (!categoryIncomes[category]) {
      categoryIncomes[category] = 0;
    }
    categoryIncomes[category] += amount;
  });

  // Prepare data for the Doughnut chart
  const data = {
    labels: Object.keys(categoryIncomes),
    datasets: [
      {
        data: Object.values(categoryIncomes),
        backgroundColor: [
          "#9B59B6", // Purple
          "#3498DB", // Blue
          "#27AE60", // Green
          "#F39C12", // Orange
          "#34495E", // Dark Gray
          "#E67E22", // Dark Orange
          "#2980B9", // Dark Blue
          "#2ECC71", // Dark Green
          "#D35400", // Chocolate
          "#8E44AD", // Amethyst
        ],
      },
    ],
  };

  return (
    <div>
      <Header as="h4" textAlign="center">
      <p>Total Expenses: KES {totalIncomeAmount.toFixed(2)}</p>
      </Header>
      <Doughnut data={data} />
    </div>
  );
};

export default IncomeListDoughnut;
