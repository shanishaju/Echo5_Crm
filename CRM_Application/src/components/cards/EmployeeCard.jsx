import React from "react";
import { Box, Typography, Paper } from "@mui/material";

function EmployeeCard({ title, value, percentage, subtitle, icon, iconColor }) {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 2,
        width: 450, 
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#fff",
      }}
    >
      {/* Icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          fontSize: 32,
          color: iconColor || "gray",
        }}
      >
        {icon}
      </Box>

      {/* Title */}
      <Typography variant="subtitle2" color="text.secondary">
        {title}
      </Typography>

      {/* Value */}
      <Typography variant="h6">{value}</Typography>

      {/* Percentage and Subtitle */}
      <Typography
        variant="body2"
        sx={{ color: percentage?.startsWith("-") ? "red" : "green" }}
      >
        {percentage}{" "}
        <span style={{ color: "#6b7280" }}>{subtitle}</span>
      </Typography>
    </Paper>
  );
}

export default EmployeeCard;
