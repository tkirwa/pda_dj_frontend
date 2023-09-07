import React from "react";
// import { Pie } from "react-chartjs-2";
// import { Expense } from "../models/models";

// interface PieChartProps {
//   expenses: Expense[]; // You can adjust the type as per your data structure
// }

// const PieChart: React.FC<PieChartProps> = ({ expenses }) => {
//   // Calculate total expense amount
//   const totalExpense = expenses.reduce(
//     (total, expense) => total + parseFloat(expense.amount),
//     0
//   );

//   // Extract categories and calculate their percentages
//   const categories = [...new Set(expenses.map((expense) => expense.category))];
//   const data = categories.map((category) => {
//     const categoryExpenses = expenses.filter(
//       (expense) => expense.category === category
//     );
//     const categoryTotal = categoryExpenses.reduce(
//       (total, expense) => total + parseFloat(expense.amount),
//       0
//     );
//     return {
//       category,
//       percentage: ((categoryTotal / totalExpense) * 100).toFixed(2),
//     };
//   });

//   // Create data for the chart
//   const chartData = {
//     labels: data.map((item) => item.category),
//     datasets: [
//       {
//         data: data.map((item) => item.percentage),
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//         ],
//       },
//     ],
//   };

//   return (
//     <div className="chart-container">
//       <h2 style={{ textAlign: "center" }}>Expense Pie Chart</h2>
//       <Pie data={chartData} />
//     </div>
//   );
// };

// export default PieChart;
