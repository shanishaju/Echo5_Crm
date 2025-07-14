import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { GetMyAttandanceApi } from '../services/allapi';

function AttendanceSummary() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(dayjs());

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

  useEffect(() => {
    fetchData(selectedDate.format('YYYY-MM-DD'));
  }, [selectedDate]);

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
        <Paper elevation={3} sx={{ borderRadius: 3, p: 2, backgroundColor: "#fafafa" }}>
          <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>🕒 Punch In</TableCell>
                  <TableCell>{summary.punchInTime || 'Not punched in'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>🕔 Punch Out</TableCell>
                  <TableCell>{summary.punchOutTime || 'Not punched out'}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>⏱️ Total Time</TableCell>
                  <TableCell>{summary.totalDuration || 'N/A'}</TableCell>
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
