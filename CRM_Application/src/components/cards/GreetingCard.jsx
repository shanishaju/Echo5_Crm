import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, useTheme } from "@mui/material";
import WavingHandIcon from '@mui/icons-material/WavingHand';

function GreetingCard() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [name, setName] = useState("Employee");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const user = JSON.parse(userData);
        if (user.fullName) {
          setName(user.fullName);
        }
      } catch (error) {
        console.error("Failed to parse user data:", error);
      }
    }
  }, []);

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
      <Typography
        variant="h5"
        fontWeight={550}
        gutterBottom
        sx={{
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
        }}
      >
        <WavingHandIcon fontSize="large"/> Good morning, {name}
      </Typography>
      <Typography
        variant="body1"
        sx={{
          fontSize: { xs: "0.85rem", sm: "1rem" },
          color: isDark ? "#cbd5e1" : "#475569",
        }}
      >
        Have a productive day. Don’t think. <strong>Just do it!</strong>
      </Typography>
    </Paper>
  );
}

export default GreetingCard;
