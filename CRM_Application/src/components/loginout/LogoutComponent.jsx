import React from "react";
import { Button, Box, useTheme } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

function LogoutComponent({ onLogout }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        variant="contained"
        startIcon={<LogoutIcon />}
        onClick={onLogout}
        sx={{
          backgroundColor: isDark ? "#1f2937" : "#ffffff",
          color: isDark ? "#f8fafc" : "#1e293b",
          fontFamily: "Inter, sans-serif",
          borderRadius: 10,
          px: 2,
          py: 1,
          boxShadow: 1,
          "&:hover": {
            backgroundColor: isDark ? "#374151" : "#e2e8f0",
          },
        }}
      >
      </Button>
    </Box>
  );
}

export default LogoutComponent;
