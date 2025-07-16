import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import image from  '../assets/Echo404.gif'

const Unauthorized = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    if (counter === 0) {
      navigate("/login");
    }

    return () => clearInterval(timer);
  }, [counter, navigate]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#0f0f0f",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        textAlign: "center",
        fontFamily: "'Press Start 2P', sans-serif",
      }}
    >
      {/* 403 GIF */}
      <Box
        component="img"
        src={image}
        alt="403 Forbidden Eye"
        sx={{
          width: { xs: "220px", sm: "300px" },
          mb: 3,
          transition: "transform 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.1) rotate(5deg)",
          },
        }}
      />

      {/* Message */}
      <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
        YOU ARE NOT ALLOWED TO ENTER HERE
      </Typography>

      {/* Countdown Message */}
      <Typography variant="body2" sx={{ mb: 2 }}>
        Redirecting to login in {counter} second{counter !== 1 && "s"}...
      </Typography>

      {/* Optional Button */}
      <Button
        variant="text"
        onClick={() => navigate("/login")}
        sx={{
          color: "#00bfff",
          fontWeight: "bold",
          textTransform: "uppercase",
          fontSize: "1rem",
          "&:hover": {
            textDecoration: "underline",
          },
        }}
      >
        GO HOME!
      </Button>
    </Box>
  );
};

export default Unauthorized;
