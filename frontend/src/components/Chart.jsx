import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const LeadChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVERURI}/api/chart-data`
      );

      const data = response.data;

      setChartData({
        labels: data.map((item) => item.channelPartnerCode),
        datasets: [
          {
            label: "Number of Channel Partners",
            data: data.map((item) => item.count),
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Channel Partner Code Distribution",
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Count",
            },
          },
          x: {
            title: {
              display: true,
              text: "Channel Partner Code",
            },
          },
        },
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  return (
    <div
      className="barchart"
      style={{
        border: "1.5px solid black",
        borderRadius: "1em",
        margin: "5px",
        padding: "3px",
      }}
    >
      <Bar className="chart" options={chartOptions} data={chartData} />
    </div>
  );
};

export default LeadChart;
