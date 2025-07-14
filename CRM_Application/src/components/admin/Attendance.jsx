import React, { useState, useEffect } from "react";
import {
  Card, Typography, Box, Table, TableBody, TableCell,
  TableContainer, TableHead, TableRow, Avatar, Paper,
  Button, TextField, InputAdornment, Chip, Dialog,
  DialogTitle, DialogContent, IconButton
} from "@mui/material";
import {
  Search, FilterList, Download, Summarize, Close
} from "@mui/icons-material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import dayjs from "dayjs";
import { EmployeeListApi, GetAllAttendanceApi } from "../../services/allapi";
import AdminSidebar from '../Sidebar/AdminSidebar';

function formatTime(date) {
  return new Date(date).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function Attendance() {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [attendanceList, setAttendanceList] = useState([]);
  const [employeeList, setEmployeeList] = useState([]);
  const [search, setSearch] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedSessions, setSelectedSessions] = useState([]);

  useEffect(() => {
    fetchAllData();
  }, [selectedDate]);

  const fetchAllData = async () => {
    try {
      const [attendanceRes, employeeRes] = await Promise.all([
        GetAllAttendanceApi(selectedDate.format("YYYY-MM-DD")),
        EmployeeListApi(),
      ]);

      const attendance = Array.isArray(attendanceRes.data) ? attendanceRes.data : [];
      const employees = Array.isArray(employeeRes.data) ? employeeRes.data : [];

      setEmployeeList(employees);

      const merged = employees.map((emp) => {
        const record = attendance.find((a) => a.employeeName === emp.fullName);
        if (record) {
          return {
            ...record,
            status: "Present",
            employeeName: emp.fullName,
          };
        } else {
          return {
            employeeName: emp.fullName,
            status: "Leave",
            totalWorkedTime: "-",
            sessions: [],
          };
        }
      });

      setAttendanceList(merged);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  const filteredList = attendanceList.filter((item) =>
    item.employeeName?.toLowerCase().includes(search.toLowerCase())
  );

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Attendance Summary", 14, 15);

    const tableData = filteredList.map((item) => [
      item.employeeName,
      selectedDate.format("YYYY-MM-DD"),
      item.status,
      item.totalWorkedTime,
      item.sessions
        ?.map((s) => `${formatTime(s.punchIn)} - ${formatTime(s.punchOut || "")}`)
        .join("\n") || "-",
    ]);

    autoTable(doc, {
      head: [["Name", "Date", "Status", "Total Time", "Sessions"]],
      body: tableData,
      startY: 25,
    });

    doc.save("Attendance_Summary.pdf");
  };

  const viewPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Employee Attendance Summary", 14, 15);

    const tableData = filteredList.map((item) => [
      item.employeeName,
      selectedDate.format("YYYY-MM-DD"),
      item.status,
      item.totalWorkedTime,
      item.sessions
        ?.map((s) => `${formatTime(s.punchIn)} - ${formatTime(s.punchOut || "")}`)
        .join("\n") || "-",
    ]);

    autoTable(doc, {
      head: [["Name", "Date", "Status", "Total Time", "Sessions"]],
      body: tableData,
      startY: 25,
    });

    window.open(doc.output("bloburl"));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        {/* Sidebar */}
        <Box
          sx={{
            width: "240px",
            flexShrink: 0,
            borderRight: "1px solid #e0e0e0",
            backgroundColor: "#fff"
          }}
        >
          <AdminSidebar />
        </Box>

        {/* Main Content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            px: 4,
            py: 4,
            backgroundColor: "#f9fafc",
          }}
        >
          <Card
            sx={{
              p: 4,
              borderRadius: 4,
              boxShadow: 6,
              background: "linear-gradient(to right, #f9fafc, #f0f4ff)",
            }}
          >
            {/* Header */}
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              mb={4}
              gap={2}
            >
              <Typography variant="h5" fontWeight={700} color="primary.dark">
                📝 Attendance Overview
              </Typography>

              <Box display="flex" gap={1.5} flexWrap="wrap">
                <TextField
                  variant="outlined"
                  size="small"
                  placeholder="Search employee..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <DatePicker
                  value={selectedDate}
                  onChange={(newValue) => setSelectedDate(newValue)}
                  slotProps={{ textField: { size: "small", variant: "outlined" } }}
                />
                <Button variant="outlined" startIcon={<FilterList />} color="primary">
                  Filters
                </Button>
                <Button variant="outlined" startIcon={<Download />} onClick={exportToPDF}>
                  Export
                </Button>
                <Button
                  variant="contained"
                  startIcon={<Summarize />}
                  onClick={viewPDF}
                  sx={{ backgroundColor: "#1976d2", color: "white" }}
                >
                  View Report
                </Button>
              </Box>
            </Box>

            {/* Table */}
            <TableContainer component={Paper} sx={{ borderRadius: 3 }}>
              <Table>
                <TableHead sx={{ backgroundColor: "#e3eafc" }}>
                  <TableRow>
                    <TableCell><strong>Name</strong></TableCell>
                    <TableCell><strong>Status</strong></TableCell>
                    <TableCell><strong>Date</strong></TableCell>
                    <TableCell><strong>Total Time</strong></TableCell>
                    <TableCell colSpan={4}><strong>Sessions</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredList.map((row, index) => (
                    <TableRow key={index} hover>
                      <TableCell>
                        <Box display="flex" alignItems="center" gap={1}>
                          <Avatar sx={{ bgcolor: "#1976d2", color: "white", fontSize: 14 }}>
                            {row.employeeName[0]}
                          </Avatar>
                          <Box>
                            <Typography fontWeight={600}>{row.employeeName}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              Employee
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={row.status}
                          color={row.status === "Present" ? "success" : "error"}
                          size="small"
                          variant="filled"
                        />
                      </TableCell>
                      <TableCell>{selectedDate.format("YYYY-MM-DD")}</TableCell>
                      <TableCell>{row.totalWorkedTime || "-"}</TableCell>
                      <TableCell colSpan={4}>
                        {row.sessions?.length > 0 ? (
                          <Box
                            display="flex"
                            alignItems="center"
                            gap={2}
                            sx={{
                              fontSize: "0.85rem",
                              color: "#444",
                              backgroundColor: "#f2f7ff",
                              borderRadius: 2,
                              p: 1,
                              cursor: "pointer",
                              "&:hover": { backgroundColor: "#e1efff" },
                            }}
                            onClick={() => {
                              setSelectedSessions(row.sessions);
                              setOpenDialog(true);
                            }}
                          >
                            <span>🕒 In: {formatTime(row.sessions[0].punchIn)}</span>
                            <span>⏱ Out: {formatTime(row.sessions[0].punchOut || "N/A")}</span>
                            <Typography variant="caption" color="primary" ml={2}>
                              View all
                            </Typography>
                          </Box>
                        ) : (
                          <Typography variant="body2" color="text.secondary">
                            No punches
                          </Typography>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        </Box>
      </Box>

      {/* Dialog for viewing all punch sessions */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="sm">
        <DialogTitle>
          All Punch Sessions
          <IconButton
            aria-label="close"
            onClick={() => setOpenDialog(false)}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {selectedSessions.length > 0 ? (
            selectedSessions.map((s, idx) => (
              <Box
                key={idx}
                display="flex"
                justifyContent="space-between"
                sx={{
                  backgroundColor: "#f6f8fc",
                  p: 1,
                  mb: 1,
                  borderRadius: 1,
                }}
              >
                <span>🕒 In: {formatTime(s.punchIn)}</span>
                <span>⏱ Out: {s.punchOut ? formatTime(s.punchOut) : "N/A"}</span>
              </Box>
            ))
          ) : (
            <Typography>No punch data</Typography>
          )}
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
}

export default Attendance;
