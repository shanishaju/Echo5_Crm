import React from "react";
import { Box, Grid, Paper, Typography, Divider } from "@mui/material";

const dataCards = [
  { title: "Total Users", value: 120 },
  { title: "Active Leads", value: 35 },
  { title: "Closed Deals", value: 28 },
  { title: "Pending Tasks", value: 12 },
];

const AdminDashboard = () => {
  return (
    <>
      <Box sx={{ p: 3, backgroundColor: "#f8f9fb", minHeight: "100vh" }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Admin Dashboard
        </Typography>

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dataCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Paper elevation={3} sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="h6" color="primary">
                  {card.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {card.value}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Recent Leads/Activity */}
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            Recent Leads
          </Typography>
          <Divider sx={{ mb: 2 }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Typography>
                <strong>Name:</strong> John Doe
              </Typography>
              <Typography>
                <strong>Status:</strong> Contacted
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>
                <strong>Name:</strong> Alice Smith
              </Typography>
              <Typography>
                <strong>Status:</strong> Interested
              </Typography>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography>
                <strong>Name:</strong> Mark Johnson
              </Typography>
              <Typography>
                <strong>Status:</strong> Not Responding
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default AdminDashboard;
