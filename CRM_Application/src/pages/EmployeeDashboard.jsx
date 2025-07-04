import React from "react";
import { Box, Grid } from "@mui/material";
import DashBoardSidebar from "../components/Sidebar/DashBoardSidebar";
import EmployeeCard from "../components/cards/EmployeeCard";
import GreetingCard from "../components/cards/GreetingCard";
import LogoutComponent from "../components/loginout/LogoutComponent";
import PerformanceChart from "../components/cards/PerformanceChart";
import ThemeToggleButton from "../components/theme/ThemeToggleButton";
import Calender from "../components/cards/Calender";

function EmployeeDashboard() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.background.default,
        color: (theme) => theme.palette.text.primary,
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          width: { xs: "100%", sm: 240 },
          flexShrink: 0,
        }}
      >
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

        {/* Charts and Calende*/}
        <Grid container spacing={2} mt={1}>
          <Grid item xs={12} md={6}>
            <PerformanceChart />
          </Grid>
          <Grid item xs={12} md={6}>
            <Calender/>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default EmployeeDashboard;
