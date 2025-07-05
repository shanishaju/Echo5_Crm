import React, { useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import Tooltip from "@mui/material/Tooltip";
import { ColorModeContext } from "../theme/ThemeContextProvider";

const ThemeToggleButton = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext); // <-- Enable real toggling

  const handleClick = () => {
    colorMode.toggleColorMode(); // Activate the toggle
  };

  return (
    <Tooltip title="Toggle Theme" arrow>
      <IconButton
        onClick={handleClick}
        sx={{
          marginTop:"16px",
          width: "36px",
          height: "36px",
          backgroundColor: theme.palette.background.paper,
          boxShadow: 1,
          "&:hover": {
            backgroundColor: theme.palette.action.hover,
          },
        }}
      >
        {theme.palette.mode === "dark" ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
};

export default ThemeToggleButton;
