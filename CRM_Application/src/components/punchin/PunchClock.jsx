import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Paper,
  Typography,
  Divider,
  useTheme,
} from "@mui/material";
import RoomIcon from "@mui/icons-material/Room";
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
  const [location, setLocation] = useState(null);
  const [workingTime, setWorkingTime] = useState("");

  // Get work location from session storage
  const workLocation = sessionStorage.getItem("workLocation");
  const loginIP = sessionStorage.getItem("loginIP");

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
      setTime(
        new Date().toLocaleTimeString("en-IN", { timeZone: "Asia/Kolkata" })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    axios
      .get("https://api.ipify.org?format=json")
      .then((res) => setIpAddress(res.data.ip))
      .catch(() => setIpAddress("Unavailable"));
  }, []);
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

const handleBreakTime = () => {
  toast.info("Break time feature coming soon!");
};

  const handleCheckLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
        toast.success("Location fetched!");
      },
      (err) => {
        switch (err.code) {
          case 1:
            toast.error("Permission denied.");
            break;
          case 2:
            toast.error("Location unavailable.");
            break;
          case 3:
            toast.error("Request timed out.");
            break;
          default:
            toast.error("Geolocation error.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: 2,
        p: 2,
        width: 450,
        minHeight: 350,
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
      <Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleBreakTime}
          sx={{ borderRadius: 25, ml: 4 }}
        >
          Break Time
        </Button>
      </Box>

      {/* Location Button */}
      <Button
        onClick={handleCheckLocation}
        variant="outlined"
        fullWidth
        sx={{
          borderRadius: 25,
          textTransform: "none",
        }}
      >
        📍 Check My Current Location
      </Button>

      {/* Location display */}
      {location && (
        <Typography
          mt={2}
          fontSize="0.85rem"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? "#64748b" : "#e3f2fd",
            p: 1,
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: 500,
          }}
        >
          <RoomIcon fontSize="small" color="primary" />
          Lat: {location.latitude.toFixed(4)}, Lon:{" "}
          {location.longitude.toFixed(4)}
        </Typography>
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
