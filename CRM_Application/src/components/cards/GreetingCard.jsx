import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function GreetingCard({ name = "Employee" }) {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: "#f1f5f9",
        color: "#1e293b",
        fontFamily: "Inter, sans-serif",
        maxWidth: 500,
        
      }}
    >
      <Typography variant="h5" fontWeight={550} gutterBottom>
        👋 Good morning, {name}
      </Typography>
      <Typography variant="body1" sx={{ fontSize: "1rem", color: "#475569" }}>
        Have a productive day. Don’t think. <strong>Just do it!</strong>
      </Typography>
    </Paper>
  );
}

export default GreetingCard;
