import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StopIcon from "@mui/icons-material/Stop";
import { toast } from "sonner";
import axios from "axios";
import { AttendanceApi } from "../../services/allapi";
import { OFFICE_IPS, WORK_LOCATIONS, isOfficeIP } from "../../config/officeConfig";

const PunchClock = () => {
  const theme = useTheme();
  const [time, setTime] = useState("00:00:00");
  const [ipAddress, setIpAddress] = useState("Fetching...");
  const [workingTime, setWorkingTime] = useState("");
  const [nextAutoPunchOut, setNextAutoPunchOut] = useState("");

  // Get work location from session storage
  const workLocation = sessionStorage.getItem("workLocation");
  const loginIP = sessionStorage.getItem("loginIP");

  // Function to calculate next auto punch-out time
  const getNextAutoPunchOutTime = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    
    // If before 1 PM, next is lunch break
    if (currentHour < 13 || (currentHour === 13 && currentMinute === 0)) {
      return "Lunch Break at 1:00 PM";
    }
    // If after 1 PM but before 6 PM, next is end of day
    else if (currentHour < 18 || (currentHour === 18 && currentMinute === 0)) {
      return "End of Day at 6:00 PM";
    }
    // If after 6 PM, next is tomorrow's lunch
    else {
      return "Tomorrow's Lunch at 1:00 PM";
    }
  };

  const formatToIST = (utcTime) => {
    return new Date(utcTime).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const punchedInAt = JSON.parse(localStorage.getItem("punchedInAt"));
  const punchedOutAt = JSON.parse(localStorage.getItem("punchedOutAt"));

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" });
      setTime(newTime);
      
      // Update next auto punch-out time
      if (punchedInAt && !punchedOutAt) {
        setNextAutoPunchOut(getNextAutoPunchOutTime());
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [punchedInAt, punchedOutAt]);

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("Unavailable"));
  }, []);

  // Auto punch-out functionality
  useEffect(() => {
    const checkAutoPunchOut = () => {
      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      
      // Check if user is currently punched in
      if (punchedInAt && !punchedOutAt) {
        // Warning at 12:55 PM (5 minutes before lunch)
        if (currentHour === 12 && currentMinute === 55) {
          toast.warning("⚠️ Auto punch-out for lunch break in 5 minutes (1:00 PM)", {
            duration: 5000,
            style: {
              background: '#ff9800',
              color: 'white',
              fontWeight: 'bold'
            }
          });
        }
        // Warning at 5:55 PM (5 minutes before end of day)
        else if (currentHour === 17 && currentMinute === 55) {
          toast.warning("⚠️ Auto punch-out for end of day in 5 minutes (6:00 PM)", {
            duration: 5000,
            style: {
              background: '#ff9800',
              color: 'white',
              fontWeight: 'bold'
            }
          });
        }
        // Auto punch-out at 1:00 PM (13:00) for lunch break
        else if (currentHour === 13 && currentMinute === 0) {
          handleAutoPunchOut("🍽️ Lunch Break - Auto punch-out at 1:00 PM");
        }
        // Auto punch-out at 6:00 PM (18:00) for end of day
        else if (currentHour === 18 && currentMinute === 0) {
          handleAutoPunchOut("🏠 End of Day - Auto punch-out at 6:00 PM");
        }
      }
    };

    // Check every minute
    const interval = setInterval(checkAutoPunchOut, 60000);
    return () => clearInterval(interval);
  }, [punchedInAt, punchedOutAt]);

  // Function to handle automatic punch-out
  const handleAutoPunchOut = async (message) => {
    try {
      const response = await AttendanceApi({ 
        ipAddress,
        workLocation: workLocation || WORK_LOCATIONS.HYBRID
      });

      if (response?.status === 200) {
        const { punchOut, punchIn, workedTime } = response.data;
        localStorage.setItem("punchedOutAt", JSON.stringify(punchOut || null));
        localStorage.setItem("punchedInAt", JSON.stringify(punchIn || null));
        setWorkingTime(workedTime);
        
        // Show notification with custom message
        toast.info(message, {
          duration: 5000,
          style: {
            background: '#2196f3',
            color: 'white',
            fontWeight: 'bold'
          }
        });
      }
    } catch (error) {
      console.error("Auto punch-out failed:", error);
      toast.error("Auto punch-out failed. Please punch out manually.");
    }
  };
    console.log(ipAddress)
const handlePunchIn = async () => {
  // Check if user selected office work location but is not on office network
  if (workLocation === WORK_LOCATIONS.OFFICE && !isOfficeIP(ipAddress)) {
    toast.error("Office punch-in is only allowed from office network. Please connect to office network or contact admin.");
    return;
  }

  const response = await AttendanceApi({ 
    ipAddress,
    workLocation: workLocation || WORK_LOCATIONS.HYBRID // Default to Hybrid if not set
  });

  if (response?.status === 200) {
    localStorage.setItem("punchedInAt", JSON.stringify(response.data?.punchIn || new Date().toISOString()));
    localStorage.setItem("punchedOutAt", null);
    setWorkingTime("");
    toast.success(`Punched In Successfully! (${workLocation || WORK_LOCATIONS.HYBRID} mode)`);
  } else {
    toast.error(response?.response?.data?.message || "Punch In Failed");
  }
};

const handlePunchOut = async () => {
  // Check if user selected office work location but is not on office network
  if (workLocation === WORK_LOCATIONS.OFFICE && !isOfficeIP(ipAddress)) {
    toast.error("Office punch-out is only allowed from office network. Please connect to office network or contact admin.");
    return;
  }

  const response = await AttendanceApi({ 
    ipAddress,
    workLocation: workLocation || WORK_LOCATIONS.HYBRID
  });

  if (response?.status === 200) {
    const { punchOut, punchIn, workedTime } = response.data;
    localStorage.setItem("punchedOutAt", JSON.stringify(punchOut || null));
    localStorage.setItem("punchedInAt", JSON.stringify(punchIn || null));
    setWorkingTime(workedTime);
    toast.success(`Punched Out Successfully! (${workLocation || WORK_LOCATIONS.HYBRID} mode)`);
  } else {
    toast.error("Punch Out Failed");
  }
};

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 2,
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        transition: "min-height 0.3s ease-in-out",
      }}
    >
      {/* Time and Button */}
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={3}
        p={2}
        borderRadius={2}
        sx={{
          backgroundColor:
            theme.palette.mode === "dark" ? "#475569" : "#f0f4f8",
        }}
      >
        <Typography variant="h6" fontWeight={600}>
          {time}
        </Typography>

        {punchedInAt && !punchedOutAt ? (
          <Button
            variant="contained"
            color="error"
            startIcon={<StopIcon />}
            onClick={handlePunchOut}
            sx={{ borderRadius: 25, ml: 4 }}
          >
            Punch Out
          </Button>
        ) : (
          <Button
            variant="contained"
            startIcon={<PlayArrowIcon />}
            onClick={handlePunchIn}
            disabled={punchedInAt !== null && punchedOutAt === null}
            sx={{
              borderRadius: 25,
              background: "linear-gradient(to right, #00c853, #64dd17)",
              color: "#fff",
              ml: 4,
            }}
          >
            Punch In
          </Button>
        )}
      </Box>

      {/* Work Location and IP Status */}
      <Box
        sx={{
          mb: 2,
          p: 1.5,
          borderRadius: 2,
          backgroundColor: theme.palette.mode === "dark" ? "#64748b" : "#e3f2fd",
          border: workLocation === WORK_LOCATIONS.OFFICE 
            ? (isOfficeIP(ipAddress) ? "1px solid #4caf50" : "1px solid #f44336")
            : "1px solid #2196f3"
        }}
      >
        <Typography variant="body2" fontWeight={600} gutterBottom>
          Work Mode: {workLocation || "Not Set"}
        </Typography>
        {/* <Typography variant="caption" color="text.secondary">
          IP: {ipAddress}
        </Typography> */}
        {workLocation === WORK_LOCATIONS.OFFICE && (
          <Typography 
            variant="caption" 
            display="block"
            color={isOfficeIP(ipAddress) ? "success.main" : "error.main"}
          >
            {isOfficeIP(ipAddress) 
              ? "✓ Office verified" 
              : "⚠ Office Not verified - Please connect to office network"}
          </Typography>
        )}
      </Box>

      {/* Auto Punch-out Schedule */}
      {punchedInAt && !punchedOutAt && (
        <Box
          sx={{
            mb: 2,
            p: 1.5,
            borderRadius: 2,
            backgroundColor: theme.palette.mode === "dark" ? "#4a5568" : "#fff3e0",
            border: "1px solid #ff9800"
          }}
        >
          <Typography variant="body2" fontWeight={600} gutterBottom color="#ff9800">
            📅 Auto Punch-out Schedule
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            • Lunch Break: 1:00 PM
          </Typography>
          <Typography variant="caption" display="block" color="text.secondary">
            • End of Day: 6:00 PM
          </Typography>
          <Typography variant="caption" display="block" color="primary.main" fontWeight={600}>
            Next: {nextAutoPunchOut}
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      {/* Info */}
      {punchedInAt && (
        <Typography fontSize="0.9rem" gutterBottom>
          🕒 <strong>Punched In:</strong> {formatToIST(punchedInAt)}
        </Typography>
      )}
      {punchedOutAt && (
        <Typography fontSize="0.9rem" gutterBottom>
          🕔 <strong>Punched Out:</strong> {formatToIST(punchedOutAt)}
        </Typography>
      )}
      {workingTime && (
        <Typography
          mt={1}
          fontSize="1rem"
          fontWeight="bold"
          color="success.main"
        >
          ⏱️ Worked: {workingTime}
        </Typography>
      )}
    </Paper>
  );
};

export default PunchClock;
