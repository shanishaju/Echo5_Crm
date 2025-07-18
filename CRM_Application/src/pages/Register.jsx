import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import { registerApi } from "../services/allapi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [checkingRole, setCheckingRole] = useState(true);

  //  Role-based route protection
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user || user.role !== "admin") {
      navigate("/unauthorized");
    } else {
      setCheckingRole(false);
    }
  }, [navigate]);

  //  Don't render anything while checking role
  if (checkingRole) return null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const result = await registerApi(data);
      if (result.status === 200) {
        toast.success(result.data.message || "Registration Successful!");
        reset();
        navigate("/login");
      } else {
        toast.error(result?.response?.data?.message || "Registration failed!");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f4f4f4",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "#8525e7",
            color: "#fff",
            borderRadius: 2,
            padding: 5,
          }}
        >
          <Box textAlign="center" mb={4}>
            <Avatar
              sx={{
                backgroundColor: "transparent",
                width: 80,
                height: 80,
                margin: "0 auto 24px",
              }}
            >
              <PersonIcon sx={{ fontSize: 60, color: "#cfcfcf" }} />
            </Avatar>
            <Typography variant="h5" fontWeight={600}>
              Register Employee
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={4}>
              {/* Full Name + Email */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Full Name"
                  variant="standard"
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  error={!!errors.fullName}
                  helperText={errors.fullName?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Email"
                  variant="standard"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                      message: "Invalid email format",
                    },
                  })}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
              </Grid>

              {/* Phone + Employee ID */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  variant="standard"
                  {...register("phone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^\d{10}$/,
                      message: "Enter a valid 10-digit number",
                    },
                  })}
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Employee ID"
                  variant="standard"
                  {...register("employeeId", {
                    required: "Employee ID is required",
                  })}
                  error={!!errors.employeeId}
                  helperText={errors.employeeId?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
              </Grid>

              {/* Department + Designation */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Department"
                  variant="standard"
                  {...register("department", {
                    required: "Department is required",
                  })}
                  error={!!errors.department}
                  helperText={errors.department?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Designation"
                  variant="standard"
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  error={!!errors.designation}
                  helperText={errors.designation?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
              </Grid>

              {/* DOJ + Password */}
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Date of Joining"
                  variant="standard"
                  InputLabelProps={{ shrink: true, style: { color: "#ccc" } }}
                  {...register("doj", {
                    required: "Date of joining is required",
                  })}
                  error={!!errors.doj}
                  helperText={errors.doj?.message}
                  InputProps={{ style: { color: "#fff" } }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  variant="standard"
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Minimum 6 characters" },
                  })}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                />
              </Grid>

              {/* Buttons */}
              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{
                    backgroundColor: "#a249f9",
                    color: "#fff",
                    padding: "12px 0",
                    borderRadius: "25px",
                    fontWeight: "bold",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#731bd4",
                    },
                  }}
                >
                  {isSubmitting ? "Submitting..." : "Register"}
                </Button>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Button
                  fullWidth
                  variant="outlined"
                  onClick={() => reset()}
                  sx={{
                    color: "#fff",
                    borderColor: "#ccc",
                    padding: "12px 0",
                    borderRadius: "25px",
                    fontWeight: "bold",
                    fontSize: "16px",
                  }}
                >
                  Clear
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>





  );
};

export default Register;
