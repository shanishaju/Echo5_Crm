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
  <Card sx={{ height: "100%", boxShadow: 3, borderRadius: 2, width: "100% " }}>
    <CardContent>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Box>
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
  return (
    <Box sx={{ flexGrow: 1 }} className=" p-2">
      <Grid container spacing={17}>
        <Grid container size={{ xs: 12, md: 2 }} >
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
              <LogoutComponent />
            </Grid>
          </Grid>
          <Grid container size={{ md: 12 }} className=" ">
            <Grid container size={{ sm: 12, md: 4 }} className="h-70 w-100 ">
              <EmployeeCard
                title="Test Employee"
                value="Platform Engineer"
                percentage="+3%"
                subtitle="since last week"
                icon="👥"
                iconColor="purple"
              />
            </Grid>
            <Grid container size={{ sm: 12, md: 4 }} className=" h-70 w-100 ">
              <EmployeeCard
                title="Work Progress"
                value="+3,462"
                percentage="+50%"
                subtitle="since last quarter"
                icon="🧑‍💼"
                iconColor="green"
              />
            </Grid>
            <Grid container size={{ sm: 12, md: 4 }} className=" h-70 w-100 ">
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
          <Grid container size={{ md: 12 }}>
            <Grid container size={{ md: 4, sm: 12 }}>
              <Calender />
            </Grid>

            <Grid
              size={{ md: 4, sm: 12 }}
              display="flex"
              justifyContent="center"
            >
              <PerformanceChart />
            </Grid>
            <Grid
              container
              size={{ md: 4, sm: 12 }}
              display="flex"
              justifyContent="center"
            >
              <TimingChart />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
