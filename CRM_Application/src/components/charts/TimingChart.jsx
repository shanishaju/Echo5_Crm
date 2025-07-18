import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Check-in Hour",
      data: [8, 1, 2, 2, 8, 1, 5],
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: 6,
      barThickness: 25,
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
      grid: { display: false },
      ticks: {
        color: "#ffffff",
        font: { size: 14 },
      },
    },
    y: {
      min: 0,
      max: 10,
      ticks: {
        stepSize: 1,
        callback: function (value) {
          if (value === 8) return "8 AM";
          if (value === 1) return "1 PM";
          if (value === 2) return "2 PM";
          if (value === 5) return "5 PM";
          return "";
        },
        color: "#ffffff",
        font: { size: 12 },
      },
      grid: {
        color: "rgba(255,255,255,0.1)",
      },
    },
  },
};

function TimingChart() {
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
        background: "linear-gradient(to bottom, #3b82f6, #60a5fa)",
        color: "#fff",
        height: 420, // Same height
        justifyContent: "center",
      }}
    >
      <Typography variant="body1" fontWeight={600} sx={{ mb: 1 }}>
        Total Time Worked
      </Typography>
      <Typography variant="body2" sx={{ color: "#e0e0e0", mb: 2 }}>
        <span style={{ color: "#22c55e", fontWeight: 600 }}>▲ Log times</span>{" "}
        over the week
      </Typography>
      <Box sx={{ height: 300}}>
        <Bar data={data} options={options} />
      </Box>
    </Paper>
  );
}

export default TimingChart;
