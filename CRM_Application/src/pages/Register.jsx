import React from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  MenuItem,
  Paper,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { registerApi } from "../services/allapi";
import { toast } from "sonner"; // or use react-toastify
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  //   const password = watch('password');

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
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" align="center" gutterBottom>
          Employee Registration
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Name"
                variant="outlined"
                {...register("fullName", { required: "Full Name is required" })}
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                variant="outlined"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Enter a valid email",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                variant="outlined"
                {...register("phone", {
                  required: "Phone number is required",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Enter a valid 10-digit number",
                  },
                })}
                error={!!errors.phone}
                helperText={errors.phone?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Employee ID"
                variant="outlined"
                {...register("employeeId", {
                  required: "Employee ID is required",
                })}
                error={!!errors.employeeId}
                helperText={errors.employeeId?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Department"
                variant="outlined"
                {...register("department", {
                  required: "Department is required",
                })}
                error={!!errors.department}
                helperText={errors.department?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Designation"
                variant="outlined"
                {...register("designation", {
                  required: "Designation is required",
                })}
                error={!!errors.designation}
                helperText={errors.designation?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Date of Joining"
                type="date"
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                {...register("doj", {
                  required: "Date of joining is required",
                })}
                error={!!errors.doj}
                helperText={errors.doj?.message}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Role"
                select
                variant="outlined"
                defaultValue=""
                {...register('role', { required: 'Role is required' })}
                error={!!errors.role}
                helperText={errors.role?.message}
              >
                <MenuItem value="Employee">Employee</MenuItem>
                <MenuItem value="Admin">Admin</MenuItem>
              </TextField>
            </Grid> */}

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                variant="outlined"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            {/* <Grid item xs={12}>
              <TextField
                fullWidth
                label="Confirm Password"
                type="password"
                variant="outlined"
                {...register('confirmPassword', {
                  required: 'Confirm Password is required',
                  validate: (value) =>
                    value === password || 'Passwords do not match',
                })}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
              />
            </Grid> */}

            <Grid item xs={6}>
              <Button
                variant="outlined"
                color="secondary"
                fullWidth
                onClick={() => reset()}
              >
                Clear
              </Button>
            </Grid>

            <Grid item xs={6}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}

export default Register;
