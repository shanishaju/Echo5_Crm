import React from "react";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useTheme } from "@mui/material/styles";
import { toast } from "sonner";

const ThemeToggleButton = () => {
  const theme = useTheme();

  const handleClick = () => {
    toast.info("⚙️ Theme toggle is under construction!");
    // Temporarily disabled:
    // colorMode.toggleColorMode();
  };

  return (
    <IconButton onClick={handleClick} color="inherit">
      {theme.palette.mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
};

export default ThemeToggleButton;
