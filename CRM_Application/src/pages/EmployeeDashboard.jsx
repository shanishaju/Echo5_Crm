// EmployeeDashboard.jsx
import React, { useState } from "react";
import { Box, Grid, Typography, Card, CardContent } from "@mui/material";
import DashBoardSidebar from "../components/Sidebar/DashBoardSidebar";
import GreetingCard from "../components/cards/GreetingCard";
import LogoutComponent from "../components/loginout/LogoutComponent";
import ThemeToggleButton from "../components/theme/ThemeToggleButton";
import PerformanceChart from "../components/charts/PerformanceChart";
import Calender from "../components/cards/Calender";

const EmployeeCard = ({ title, value, percentage, subtitle, icon, iconColor }) => (
  <Card sx={{ height: "100%", boxShadow: 3, borderRadius: 2 }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
          <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
          <Typography variant="h6" fontWeight="bold">{value}</Typography>
          <Typography variant="caption" color="success.main">{percentage} {subtitle}</Typography>
        </Box>
        <Box fontSize="2rem" color={iconColor}>{icon}</Box>
      </Box>
    </CardContent>
  </Card>
);

function EmployeeDashboard() {
  const [showOverlay, setShowOverlay] = useState(false);
  const [hasShown, setHasShown] = useState(false);

  const handleHover = () => {
    if (!hasShown) {
      setShowOverlay(true);
      setHasShown(true);
      setTimeout(() => setShowOverlay(false), 3000);
    }
  };

  return (
    <Box
      onMouseEnter={handleHover}
      sx={{
        display: "flex",
        bgcolor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
        minHeight: "100vh",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", sm: 240 },
          position: { sm: "fixed" },
          height: "100vh",
          overflowY: "auto",
          zIndex: 1100,
          bgcolor: "background.paper"
        }}
      >
        <DashBoardSidebar />
      </Box>

      {/* Overlay */}
      {showOverlay && (
        <Box
          sx={{
            position: "fixed",
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
            textAlign: "center",
          }}
        >
          ⚠️ This page is under maintenance mode
          <Typography variant="body2" mt={1}>
            Closing in 3 seconds...
          </Typography>
        </Box>
      )}

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 3, ml: { sm: "240px" }, width: "100%" }}>
        {/* Top Row */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={8}>
            <GreetingCard name="Test Employee" />
          </Grid>
          <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end" gap={2}>
            <ThemeToggleButton />
            <LogoutComponent />
          </Grid>
        </Grid>

        {/* Cards Row */}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={4}>
            <EmployeeCard
              title="Test Employee"
              value="Platform Engineer"
              percentage="+3%"
              subtitle="since last week"
              icon="👥"
              iconColor="purple"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EmployeeCard
              title="Work Progress"
              value="+3,462"
              percentage="+50%"
              subtitle="since last quarter"
              icon="🧑‍💼"
              iconColor="green"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <EmployeeCard
              title="Balance Leaves"
              value="1/25"
              percentage="90%"
              subtitle="left"
              icon="🛒"
              iconColor="blue"
            />
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