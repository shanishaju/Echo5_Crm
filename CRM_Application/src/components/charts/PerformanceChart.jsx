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

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend
);

const data = {
  labels: ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Performance",
      data: [50, 40, 300, 250, 500, 300, 400, 250, 500],
      borderColor: "#ffffff",
      backgroundColor: "rgba(255,255,255,0.2)",
      pointBackgroundColor: "#ffffff",
      pointBorderColor: "#ffffff",
      tension: 0.4,
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
  },
  scales: {
    x: {
      ticks: { color: "#ffffff", font: { size: 10 } },
      grid: { color: "rgba(255,255,255,0.1)" },
    },
    y: {
      beginAtZero: true,
      ticks: { color: "#ffffff", font: { size: 10 } },
      grid: { color: "rgba(255,255,255,0.1)" },
    },
  },
};

function PerformanceChart() {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 2,
        width: 450,
        display: "flex",
        flexDirection: "column",
        position: "relative",

        background: "linear-gradient(to bottom, #2c2c2c, #1e1e1e)",
        color: "#fff",
        height: 420, //  Control height
        justifyContent: "center",
      }}
    >

      <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
        Monthly Performance Overview
      </Typography>
      <Typography variant="body2" sx={{ color: "#d1d5db", mb: 2 }}>
        <span style={{ color: "#22c55e", fontWeight: 600 }}>▲ 4%</span>{" "}
        improvement over the past 6 months
      </Typography>
      <Box sx={{ height: 300 }}>
        <Line data={data} options={options} />
      </Box>
    </Paper>
  );
}

export default PerformanceChart;
