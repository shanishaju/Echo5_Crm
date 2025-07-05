import React from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";

function GreetingCard({ name = "Employee" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: isDark ? "#1f2937" : "#f1f5f9",
        color: isDark ? "#f8fafc" : "#1e293b",
        fontFamily: "Inter, sans-serif",
        width: { xs: "100%", sm: "90%" },
      }}
    >
      <Typography variant="h5" fontWeight={550} gutterBottom>
        👋 Good morning, {name}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: "1rem",
          color: isDark ? "#cbd5e1" : "#475569",
        }}
      >
        Have a productive day. Don’t think. <strong>Just do it!</strong>
      </Typography>
    </Paper>
  );
}

export default GreetingCard;
