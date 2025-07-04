import React from "react";
import { Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function LogoutComponent({ onLogout }) {
  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={onLogout}
        sx={{
          backgroundColor: "#ffffff",
          color: "#1e293b",
          fontFamily: "Inter, sans-serif",
          borderRadius: 2,
          px: 2,
          py: 1,
          boxShadow: 1,
          "&:hover": {
            backgroundColor: "#8c86b2"
          },
        }}
      >
      </Button>
    </Box>
  );
}

export default LogoutComponent;
