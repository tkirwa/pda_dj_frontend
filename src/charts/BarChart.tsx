import React from "react";
// import { Bar } from "react-chartjs-2";

// interface BarChartProps {
//   expenses: any[]; // You can adjust the type as per your data structure
// }

// const BarChart: React.FC<BarChartProps> = ({ expenses }) => {
//   // Extract data from expenses for the chart
//   const data = {
//     labels: expenses.map((expense) => expense.name),
//     datasets: [
//       {
//         label: "Expense Amount",
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//         borderColor: "rgba(75, 192, 192, 1)",
//         borderWidth: 1,
//         hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",
//         hoverBorderColor: "rgba(75, 192, 192, 1)",
//         data: expenses.map((expense) => parseFloat(expense.amount)),
//       },
//     ],
//   };

//   const options = {
//     scales: {
//       y: {
//         beginAtZero: true,
//       },
//     },
//   };

//   return (
//     <div className="chart-container">
//       <h2 style={{ textAlign: "center" }}>Expense Bar Chart</h2>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BarChart;
