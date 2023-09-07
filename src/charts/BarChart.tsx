import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

interface BarChartProps {
  data: any; // Use a more general type for data
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const ctx = chartRef.current?.getContext('2d');
    if (ctx) {
      const chartInstance = new Chart(ctx, {
        type: 'bar',
        data: data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
        },
      });

      return () => {
        // Ensure the chart is destroyed when the component unmounts
        chartInstance.destroy();
      };
    }
  }, [data]);

  return (
    <div>
      <h2>Expenses by Category (Bar Chart)</h2>
      <canvas ref={chartRef} />
    </div>
  );
};

export default BarChart;
