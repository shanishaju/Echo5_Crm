import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ThemeContextProvider from "./components/theme/ThemeContextProvider.jsx";

import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    </LocalizationProvider>
  </StrictMode>
);
