import React from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
  Chip,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import DashBoardSidebar from "../components/Sidebar/DashBoardSidebar";
import { useTheme } from "@mui/material/styles";
import ThemeToggleButton from "../components/theme/ThemeToggleButton";
import { useForm, Controller } from "react-hook-form";
import { SubmitLeaveApplicationApi } from "../services/allapi";
import { toast } from "sonner"; //      added

const LeaveApplication = () => {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      manager: "",
      leaveType: "",
      reason: "",
    },
  });

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload;
    } catch (err) {
      console.error("Token decoding failed:", err);
      return null;
    }
  };

  const token = sessionStorage.getItem("token");
  const userInfo = decodeToken(token);
  const employeeId = userInfo?.employeeId;

  const rawName = localStorage.getItem("username");
  const employeeName = rawName ? JSON.parse(rawName) : "Employee";

  const startDate = watch("startDate");
  const endDate = watch("endDate");

  const getDaysDiff = () => {
    if (startDate && endDate) {
      const diff = dayjs(endDate).diff(dayjs(startDate), "day");
      return diff >= 0 ? diff + 1 : 0;
    }
    return "";
  };

  const onSubmit = async (data) => {
    try {
      if (!employeeId) {
        console.error("Employee ID not found in token.");
        toast.error("Employee ID not found. Please login again.");
        return;
      }

      const payload = {
        ...data,
        startDate: data.startDate ? data.startDate.toISOString() : null,
        endDate: data.endDate ? data.endDate.toISOString() : null,
      };

      const response = await SubmitLeaveApplicationApi(payload);
      console.log("Leave Submitted:", response.data);
      toast.success("Leave request submitted successfully!"); //      success toast
      reset();
    } catch (error) {
      console.error("Leave submission failed:", error);
      toast.error("Failed to submit leave request."); //      error toast
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Sidebar */}
      <Box
        sx={{
          width: "250px",
          flexShrink: 0,
          bgcolor: theme.palette.background.paper,
          height: "100vh",
          position: "fixed",
          zIndex: 1000,
        }}
      >
        <DashBoardSidebar />
      </Box>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          p: 3,
          ml: { xs: 0, md: "250px" },
        }}
      >
        {/* Header */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
          flexWrap="wrap"
        >
          <Typography variant="h6" fontWeight={600}>
            Hello {employeeName}
          </Typography>
          <ThemeToggleButton />
        </Box>

        {/* Summary Box */}
        <Box
          sx={{
            backgroundColor: "#1c1f2b",
            borderRadius: 2,
            p: 3,
            mb: 4,
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 2,
          }}
        >
          {[
            { label: "Available leaves this year", value: 26 },
            { label: "Leaves used this year", value: 0 },
            { label: "Overdue to use by year-end", value: 2 },
          ].map((item, idx) => (
            <Box key={idx} sx={{ flex: "1 1 200px", textAlign: "center" }}>
              <Typography variant="h4" color="#00bcd4">
                {item.value}
              </Typography>
              <Typography variant="body2" color="#cfd8dc">
                {item.label}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Leave Request Section */}
        <Box display="flex" gap={2} flexWrap="wrap">
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 2, maxWidth: "800px" }}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3}>
                <Grid size={12}>
                  <Typography variant="h6" fontWeight={600} gutterBottom>
                    📌 Leave Request
                  </Typography>
                </Grid>

                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <Grid size={4}>
                    <Controller
                      name="startDate"
                      control={control}
                      rules={{ 
                        required: "Start date is required",
                        validate: (value) => {
                          if (value && dayjs(value).isBefore(dayjs(), 'day')) {
                            return "Start date cannot be in the past";
                          }
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <DatePicker
                          label="Start Date"
                          {...field}
                          format="DD-MM-YYYY"
                          minDate={dayjs()}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.startDate,
                              helperText: errors.startDate?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>

                  <Grid size={4}>
                    <Controller
                      name="endDate"
                      control={control}
                      rules={{ 
                        required: "End date is required",
                        validate: (value) => {
                          if (value && dayjs(value).isBefore(dayjs(), 'day')) {
                            return "End date cannot be in the past";
                          }
                          if (value && startDate && dayjs(value).isBefore(dayjs(startDate), 'day')) {
                            return "End date cannot be before start date";
                          }
                          return true;
                        }
                      }}
                      render={({ field }) => (
                        <DatePicker
                          label="End Date"
                          {...field}
                          format="DD-MM-YYYY"
                          minDate={startDate ? dayjs(startDate) : dayjs()}
                          slotProps={{
                            textField: {
                              fullWidth: true,
                              error: !!errors.endDate,
                              helperText: errors.endDate?.message,
                            },
                          }}
                        />
                      )}
                    />
                  </Grid>
                </LocalizationProvider>

                <Grid size={4}>
                  <TextField
                    label="Total Days"
                    value={getDaysDiff()}
                    fullWidth
                    disabled
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="leaveType"
                    control={control}
                    rules={{ required: "Please select a leave type" }}
                    render={({ field }) => (
                      <FormControl fullWidth error={!!errors.leaveType}>
                        <InputLabel>Leave Type</InputLabel>
                        <Select {...field} label="Leave Type">
                          <MenuItem value="PTO">Paid Time Off (PTO)</MenuItem>
                          <MenuItem value="Sick">Sick Leave</MenuItem>
                          <MenuItem value="Other">Other</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                  />
                </Grid>

                <Grid size={12}>
                  <Controller
                    name="reason"
                    control={control}
                    rules={{ required: "Reason is required" }}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Comment (Reason)"
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Type reason of leave"
                        error={!!errors.reason}
                        helperText={errors.reason?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid size={6}>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    flexWrap="wrap"
                  >
                    <Button
                      type="button"
                      variant="text"
                      onClick={() => reset()}
                      sx={{
                        backgroundColor: "#5567ff",
                        color: "#fff",
                        textTransform: "none",
                        px: 4,
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        backgroundColor: "#5567ff",
                        color: "#fff",
                        textTransform: "none",
                        px: 4,
                      }}
                    >
                      Send request
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Paper>
          {/* my all status  need here code*/}
          <Paper
            elevation={3}
            sx={{ p: 4, borderRadius: 2, width: "400px", minWidth: "250px" }}
          >
            <Typography variant="h6" fontWeight={600} gutterBottom>
              📊 Leave Summary
            </Typography>

            {/* You can add charts, stats, or anything here */}
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default LeaveApplication;
