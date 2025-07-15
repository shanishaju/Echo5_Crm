// pages/AdminLeaveManagement.jsx

import React, { useEffect, useState } from "react";
import {
  Paper,
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Select,
  MenuItem,
  Button,
  TextField,
  Chip,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import { getAllLeavesApi, updateLeaveStatusApi } from "../../services/allapi";
import AdminSidebar from "../Sidebar/AdminSidebar";

const AdminLeaveManagement = () => {
  const [leaves, setLeaves] = useState([]);
  const [filter, setFilter] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [startDate, setStartDate] = useState(dayjs().startOf("month"));
  const [endDate, setEndDate] = useState(dayjs().endOf("month"));

  useEffect(() => {
    fetchLeaves();
  }, []);

  const fetchLeaves = async () => {
    const res = await getAllLeavesApi();
    setLeaves(res.data);
  };

  const handleStatusChange = async (id, status) => {
    await updateLeaveStatusApi(id, { status });
    fetchLeaves();
  };

  const filtered = leaves.filter((item) => {
    const nameMatch =
      item?.employee?.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) || false;

    const statusMatch = filter ? item.status === filter : true;

    const leaveStart = dayjs(item.startDate);
    const dateMatch =
      leaveStart.isAfter(startDate.subtract(1, "day")) &&
      leaveStart.isBefore(endDate.add(1, "day"));

    return nameMatch && statusMatch && dateMatch;
  });

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />

      <Box sx={{ flexGrow: 1, p: 4 }}>
        <Paper elevation={3} sx={{ borderRadius: 3, p: 3 }}>
          {/* Title and Filters */}
          <Box mb={3}>
            <Typography variant="h5" fontWeight={600} gutterBottom>
              📋 All Leave Requests
            </Typography>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
                <TextField
                  label="Search by Name"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <DatePicker
                  label="Start Date"
                  value={startDate}
                  onChange={(newValue) => setStartDate(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                />
                <DatePicker
                  label="End Date"
                  value={endDate}
                  onChange={(newValue) => setEndDate(newValue)}
                  slotProps={{ textField: { size: "small" } }}
                />
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  size="small"
                  displayEmpty
                  sx={{ minWidth: 150 }}
                >
                  <MenuItem value="">All Status</MenuItem>
                  <MenuItem value="Pending">Pending</MenuItem>
                  <MenuItem value="Approved">Approved</MenuItem>
                  <MenuItem value="Rejected">Rejected</MenuItem>
                </Select>
              </Box>
            </LocalizationProvider>
          </Box>

          {/* Table */}
          <Table>
            <TableHead sx={{ backgroundColor: "#f4f6fc" }}>
              <TableRow>
                <TableCell><strong>Employee</strong></TableCell>
                <TableCell><strong>Leave Type</strong></TableCell>
                <TableCell><strong>From</strong></TableCell>
                <TableCell><strong>To</strong></TableCell>
                <TableCell><strong>Reason</strong></TableCell>
                <TableCell><strong>Status</strong></TableCell>
                <TableCell><strong>Action</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    No records found.
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((leave) => (
                  <TableRow key={leave._id} hover>
                    <TableCell>{leave.employee?.fullName}</TableCell>
                    <TableCell>{leave.leaveType}</TableCell>
                    <TableCell>{leave.startDate?.slice(0, 10)}</TableCell>
                    <TableCell>{leave.endDate?.slice(0, 10)}</TableCell>
                    <TableCell>{leave.reason}</TableCell>
                    <TableCell>
                      <Chip
                        label={leave.status}
                        color={
                          leave.status === "Approved"
                            ? "success"
                            : leave.status === "Rejected"
                            ? "error"
                            : "warning"
                        }
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      {leave.status === "Pending" && (
                        <>
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            onClick={() =>
                              handleStatusChange(leave._id, "Approved")
                            }
                            sx={{ mr: 1 }}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            onClick={() =>
                              handleStatusChange(leave._id, "Rejected")
                            }
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </Box>
  );
};

export default AdminLeaveManagement;
