import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Paper,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/allapi";
import { toast } from "sonner";
import logoImage from "../assets/D4.jpg";
import axios from "axios";
import { OFFICE_IPS, WORK_LOCATIONS, isOfficeIP } from "../config/officeConfig";

const Login = () => {
  const navigate = useNavigate();
  const [openTerms, setOpenTerms] = useState(false);
  const [ipAddress, setIpAddress] = useState("");

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ 
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
      workLocation: "",
      terms: false
    }
  });

  const workLocation = watch("workLocation");

  // Get user's IP address on component mount
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await axios.get("https://api.ipify.org?format=json");
        setIpAddress(response.data.ip);
      } catch (error) {
        console.error("Failed to fetch IP:", error);
        setIpAddress("Unavailable");
      }
    };
    fetchIP();
  }, []);

  const onSubmit = async (data) => {
    try {
      // Check if user selected "Office" work location
      if (data.workLocation === WORK_LOCATIONS.OFFICE) {
        // Validate if current IP is in the office IP list
        if (!isOfficeIP(ipAddress)) {
          toast.error("Office work location is only allowed from office network. Please select 'Hybrid' or connect from office network.");
          return;
        }
      }

      // Include work location and IP in the login request
      const loginData = {
        ...data,
        workLocation: data.workLocation,
        ipAddress: ipAddress
      };

      const response = await loginApi(loginData);
      if (response?.status === 200 && response.data.token) {
        const { token, employee } = response.data;

        sessionStorage.setItem("token", token);
        sessionStorage.setItem("workLocation", data.workLocation);
        sessionStorage.setItem("loginIP", ipAddress);
        localStorage.setItem("user", JSON.stringify(employee));
        localStorage.setItem("username", JSON.stringify(employee.fullName));
        localStorage.setItem("Id", employee.id);

        toast.success(`Login successful! Work location: ${data.workLocation}`);

        if (employee.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } else {
        toast.error(response?.response?.data?.message || "Login failed!");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#dfe4ea",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            textAlign: "center",
          }}
        >
          {/* Top blue section */}
          <Box
            sx={{
              backgroundColor: "#1e90ff",
              padding: 4,
              borderBottomLeftRadius: "50% 20%",
              borderBottomRightRadius: "50% 20%",
            }}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                margin: "0 auto",
                backgroundColor: "#fff",
              }}
            >
              <img src={logoImage} alt="" />
            </Avatar>
          </Box>

          {/* Form Section */}
          <Box sx={{ px: 4, py: 5, backgroundColor: "#fff" }}>
            <Typography
              variant="h6"
              sx={{ mb: 3, color: "#333", fontWeight: 600 }}
            >
              Login to your account
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)} noValidate>
              <TextField
                fullWidth
                label="E-mail Address"
                variant="standard"
                {...register("email", { required: "Email is required" })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                sx={{ mb: 3 }}
              />

              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="standard"
                {...register("password", { required: "Password is required" })}
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                sx={{ mb: 3 }}
              />

              {/* Work Location Dropdown */}
              <FormControl fullWidth variant="standard" sx={{ mb: 3 }}>
                <InputLabel>Work Location *</InputLabel>
                <Controller
                  name="workLocation"
                  control={control}
                  rules={{ required: "Work location is required" }}
                  render={({ field }) => (
                    <Select
                      {...field}
                      error={Boolean(errors.workLocation)}
                    >
                      <MenuItem value={WORK_LOCATIONS.OFFICE}>Office</MenuItem>
                      <MenuItem value={WORK_LOCATIONS.HYBRID}>Hybrid</MenuItem>
                    </Select>
                  )}
                />
                {errors.workLocation && (
                  <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                    {errors.workLocation.message}
                  </Typography>
                )}
              </FormControl>

              {/* IP Address Display */}
              {workLocation === WORK_LOCATIONS.OFFICE && (
                <Box 
                  sx={{ 
                    mb: 2, 
                    p: 1, 
                    backgroundColor: "#f5f5f5", 
                    borderRadius: 1,
                    border: isOfficeIP(ipAddress) ? "1px solid #4caf50" : "1px solid #f44336"
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    Current IP: {ipAddress}
                  </Typography>
                  <br />
                  <Typography 
                    variant="caption" 
                    color={isOfficeIP(ipAddress) ? "success.main" : "error.main"}
                  >
                    {isOfficeIP(ipAddress) 
                      ? "✓ Office network detected" 
                      : "⚠ Not connected to office network"}
                  </Typography>
                </Box>
              )}

              {/* Terms & Conditions checkbox */}
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("terms", {
                      required: "You must accept the Terms and Conditions",
                    })}
                  />
                }
                label={
                  <Typography variant="body2" color="text.secondary">
                    I accept the{" "}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTerms(true);
                      }}
                      style={{ color: "#1e90ff", cursor: "pointer" }}
                    >
                      Terms and Conditions
                    </a>
                  </Typography>
                }
                sx={{ mb: 1, display: "block" }}
              />
              {errors.terms && (
                <Typography variant="caption" color="error">
                  {errors.terms.message}
                </Typography>
              )}

              <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#1e90ff",
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "#177ad6",
                    },
                  }}
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>

      {/* Terms & Conditions Dialog */}
      <Dialog
        open={openTerms}
        onClose={() => setOpenTerms(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle
          sx={{
            m: 0,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          <Typography variant="h4" sx={{ alignItems: "center" }}>
            Terms & Conditions
          </Typography>
          <IconButton
            aria-label="close"
            onClick={() => setOpenTerms(false)}
            sx={{ color: (theme) => theme.palette.grey[600] }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers sx={{ px: 3, py: 2 }}>
          <Typography variant="body1" gutterBottom>
            Welcome to our application! By logging in, you agree to our terms
            and conditions.
            <br />
            <br />
            • You are responsible for maintaining the confidentiality of your
            account.
            <br />
            • Unauthorized access is prohibited.
            <br />
            • We do not share your data without consent.
            <br />
            • The app reserves the right to suspend access in case of misuse.
            <br />
            <br />
            Thank you for using our platform responsibly.
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Login;
