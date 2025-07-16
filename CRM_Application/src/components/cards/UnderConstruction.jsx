import React from "react";
import { Box, Paper, Typography } from "@mui/material";
import { keyframes } from "@emotion/react";

// Animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

function UnderConstruction() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(to bottom right, #d0f0fd, #e0f7fa)",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          maxWidth: 500,
          animation: `${fadeIn} 1.2s ease-in-out`,
          backgroundColor: "#ffffffcc",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          gutterBottom
          sx={{ color: "#0077b6" }}
        >
          🚧 Projects Page
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
          We are working diligently to bring this feature to your dashboard
          shortly. <br />
        </Typography>
        <Typography
          variant="body2"
          sx={{ mt: 3, color: "#0077b6", fontStyle: "italic" }}
        >
          — Admin Team ( back to
          <a href="/dashboard" className="mt-10 text-blue-500">
            {" "}
            dashboard
          </a>{" "}
          )
        </Typography>
      </Paper>
    </Box>
  );
}

export default UnderConstruction;
