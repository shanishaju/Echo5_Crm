import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  CircularProgress,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { GetMyAttandanceApi } from "../services/allapi";
import { keyframes } from "@emotion/react";

function AttendanceSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  //"Coming Soon" mode
  const maintenanceMode = true;

  const fadeIn = keyframes`
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  `;

  //  Skip API fetch if in maintenance mode
  useEffect(() => {
    if (!maintenanceMode) {
      fetchData(selectedDate.format("YYYY-MM-DD"));
    }
  }, [selectedDate]);

  const fetchData = async (dateStr) => {
    try {
      setLoading(true);
      const res = await GetMyAttandanceApi(dateStr);
      setSummary(res?.data || null);
    } catch (error) {
      console.error("Error fetching attendance summary:", error);
      setSummary(null);
    } finally {
      setLoading(false);
    }
  };

  //  Coming Soon Message
  if (maintenanceMode) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          background: "linear-gradient(to bottom right, #d0f0fd, #e0f7fa)",
          px: 2,
        }}
      >
        <Paper
          elevation={6}
          sx={{
            p: 5,
            borderRadius: 4,
            maxWidth: 500,
            animation: `${fadeIn} 1.2s ease-in-out`,
            backgroundColor: "#ffffffcc",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            gutterBottom
            sx={{ color: "#005f73" }}
          >
            🚧 Feature Coming Soon
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ mt: 2, fontSize: "1rem" }}
          >
            The <strong>Attendance Summary</strong> module is currently in
            development.
            <br />
            We are working diligently to bring this feature to your dashboard
            shortly.
            <br />
          </Typography>

          <Typography
            variant="body2"
            sx={{ mt: 3, color: "#0077b6", fontStyle: "italic" }}
          >
            — Admin Team ( back to
            <a href="/dashboard" className="mt-10 text-blue-500">
              {" "}
              dashboard
            </a>{" "}
            )
          </Typography>
        </Paper>
      </Box>
    );
  }

  //  Actual Attendance Summary
  return (
    <Box sx={{ p: { xs: 2, md: 4 }, maxWidth: 600, mx: "auto" }}>
      <Typography variant="h5" fontWeight={600} mb={2} textAlign="center">
        Attendance Summary
      </Typography>

      {/* Date Picker */}
      <DatePicker
        label="Select Date"
        value={selectedDate}
        onChange={(newValue) => setSelectedDate(dayjs(newValue))}
        renderInput={(params) => (
          <TextField fullWidth variant="outlined" sx={{ mb: 3 }} {...params} />
        )}
      />

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : !summary ? (
        <Typography align="center" color="text.secondary">
          No attendance data found for selected date.
        </Typography>
      ) : (
        <Paper
          elevation={3}
          sx={{ borderRadius: 3, p: 2, backgroundColor: "#fafafa" }}
        >
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>🕒 Punch In</TableCell>
                  <TableCell>
                    {summary.punchInTime || "Not punched in"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>🕔 Punch Out</TableCell>
                  <TableCell>
                    {summary.punchOutTime || "Not punched out"}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>⏱️ Total Time</TableCell>
                  <TableCell>{summary.totalDuration || "N/A"}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      )}
    </Box>
  );
}

export default AttendanceSummary;
