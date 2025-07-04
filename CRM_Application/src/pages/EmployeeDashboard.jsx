import React, { useEffect, useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import DashBoardSidebar from "../components/Sidebar/DashBoardSidebar";
import EmployeeCard from "../components/cards/EmployeeCard";
import GreetingCard from "../components/cards/GreetingCard";
import LogoutComponent from "../components/loginout/LogoutComponent";
import PerformanceChart from "../components/cards/PerformanceChart";
import ThemeToggleButton from "../components/theme/ThemeToggleButton";
import Calender from "../components/cards/Calender";

function EmployeeDashboard() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasShown, setHasShown] = useState(false); // To prevent re-showing

  const handleHover = () => {
    if (!hasShown) {
      setShowOverlay(true);
      setHasShown(true); // So it won't trigger again

      setTimeout(() => {
        setShowOverlay(false);
      }, 3000); // Hide after 3 seconds
    }
  };

  return (
    <Box
      onMouseEnter={handleHover}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        overflow: "hidden",
      }}
    >
      {/* Overlay */}
      {showOverlay && (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            width: "100%",
            height: "100%",
            bgcolor: "rgba(0, 0, 0, 0.7)",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            fontSize: "22px",
            fontWeight: "bold",
            transition: "opacity 0.3s ease",
            textAlign: "center",
          }}
        >
          ⚠️ This page is under construction...
          <Typography variant="body2" mt={1}>
            Closing in 3 seconds...
          </Typography>
        </Box>
      )}

      {/* Sidebar */}
      <Box sx={{ width: { xs: "100%", sm: 240 }, flexShrink: 0 }}>
        <DashBoardSidebar />
      </Box>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 2 }}>
        <Grid container alignItems="center" justifyContent="space-between" spacing={2}>
          <Grid item xs={12} sm={9}>
            <GreetingCard name="Test Employee" />
          </Grid>
          <Grid item xs={12} sm={3} display="flex" justifyContent="flex-end">
            <LogoutComponent />
            <ThemeToggleButton />
          </Grid>
        </Grid>

        {/* Summary Cards */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} sm={4}>
            <EmployeeCard title="Test Employee" value="Platform Engineer" percentage="+3%" subtitle="since last week" icon="👥" iconColor="purple" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EmployeeCard title="Work Progress" value="+3,462" percentage="+50%" subtitle="since last quarter" icon="🧑‍💼" iconColor="red" />
          </Grid>
          <Grid item xs={12} sm={4}>
            <EmployeeCard title="Balance Leaves" value="1/25" percentage="90%" subtitle="left" icon="🛒" iconColor="gray" />
          </Grid>
        </Grid>

        {/* Charts and Calendar */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <PerformanceChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <Calender />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default EmployeeDashboard;
