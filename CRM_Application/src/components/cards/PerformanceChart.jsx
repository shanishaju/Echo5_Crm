import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Monthly Performance",
      data: [150, 200, 170, 250, 210, 300],
      borderColor: "#4ade80",
      backgroundColor: "rgba(74, 222, 128, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
  },
  scales: {
    y: { beginAtZero: true },
  },
};

function PerformanceChart() {
  return (
    <Paper elevation={3} sx={{ borderRadius: 2, p: 3, backgroundColor: "#fff" }}>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
        Monthly Performance Overview
      </Typography>
      <Typography variant="body2" sx={{ color: "gray", mb: 2 }}>
        <span style={{ color: "#10b981", fontWeight: 600 }}>▲ 4%</span> improvement over the past 6 months
      </Typography>
      <Box>
        <Line data={data} options={options} height={300} />
      </Box>
    </Paper>
  );
}

export default PerformanceChart;
