import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import DashBoardSidebar from "./Sidebar/DashBoardSidebar";
import GreetingCard from "./cards/GreetingCard";
import LogoutComponent from "./loginout/LogoutComponent";
import ThemeToggleButton from "./theme/ThemeToggleButton";
import { Card, CardContent, Typography } from "@mui/material";
import Calender from "./cards/Calender";
import PerformanceChart from "./charts/PerformanceChart";
import TimingChart from "./charts/TimingChart";
import PunchClock from "../components/punchin/PunchClock";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: (theme.vars ?? theme).palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const EmployeeCard = ({
  title,
  value,
  percentage,
  subtitle,
  icon,
  iconColor,
}) => (
  <Card sx={{
    height: "100%",
    width: "100%",
    boxShadow: 3,
    borderRadius: 2,
    display: "flex",
    flexDirection: "column"
  }}>
    <CardContent sx={{
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography variant="subtitle2" color="text.secondary">
            {title}
          </Typography>
          <Typography variant="h6" fontWeight="bold">
            {value}
          </Typography>
          <Typography variant="caption" color="success.main">
            {percentage} {subtitle}
          </Typography>
        </Box>
        <Box fontSize="2rem" color={iconColor}>
          {icon}
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default function FullWidthGrid() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    localStorage.clear();
    toast.success("Logged out successfully!");
    navigate("/"); // redirect to login page
  };
  return (
    <Box sx={{ flexGrow: 1 }} className=" p-2">
      <Grid container spacing={17}>
        <Grid container size={{ xs: 12, md: 2 }}>
          <DashBoardSidebar />
        </Grid>
        <Grid container spacing={2} size={{ xs: 12, md: 10 }}>
          <Grid container size={{ md: 12 }}>
            <Grid container size={{ md: 10, sm: 4 }} mt={2}>
              <GreetingCard />
            </Grid>
            <Grid container size={{ md: 1, sm: 4 }}>
              <ThemeToggleButton />
            </Grid>
            <Grid container size={{ md: 1, sm: 4 }}>
              <LogoutComponent onLogout={handleLogout} />
            </Grid>
          </Grid>
          <Grid container size={{ md: 12 }} spacing={3}>
            <Grid size={{ sm: 12, md: 4 }}>
              <Box sx={{ width: "100%", height: "420px" }}>
                <PunchClock />
              </Box>
            </Grid>
            <Grid size={{ sm: 12, md: 4 }}>
              <Box sx={{ width: "100%", height: "420px" }}>
                <EmployeeCard
                  title="Work Progress"
                  value="+3,462"
                  percentage="+50%"
                  subtitle="since last quarter"
                  icon="🧑‍💼"
                  iconColor="green"
                />
              </Box>
            </Grid>
            <Grid size={{ sm: 12, md: 4 }}>
              <Box sx={{ width: "100%", height: "420px" }}>
                <EmployeeCard
                  title="Tasks Completed"
                  value="127"
                  percentage="+25%"
                  subtitle="since last month"
                  icon="✅"
                  iconColor="blue"
                />
              </Box>
            </Grid>
            <Grid size={{ sm: 12, md: 4 }}>
              <Box sx={{ width: "100%", height: "420px" }}>
                <Calender />
              </Box>
            </Grid>
            <Grid size={{ sm: 12, md: 4 }}>
              <Box sx={{ width: "100%", height: "420px" }}>
                <TimingChart />
              </Box>
            </Grid>
            <Grid size={{ sm: 12, md: 4 }}>
              <Box sx={{ width: "100%", height: "420px" }}>
              <PerformanceChart />
              </Box>
            </Grid>





          </Grid>

        </Grid>
      </Grid>
    </Box>
  );
}
