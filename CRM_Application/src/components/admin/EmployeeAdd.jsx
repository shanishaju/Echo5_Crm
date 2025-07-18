import React from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Avatar,
  Paper,
  MenuItem,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import { registerApi } from "../../services/allapi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function EmployeeAdd() {
  const navigate = useNavigate();

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
        toast.success(result.data.message || "Employee added successfully!");
        reset();
        navigate("/employees");
      } else {
        toast.error(result?.response?.data?.message || "Employee addition failed!");
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong!");
    }
  };

  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      rules: { required: "Full Name is required" },
    },
    {
      label: "Email",
      name: "email",
      type: "text",
      rules: {
        required: "Email is required",
        pattern: {
          value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
          message: "Invalid email format",
        },
      },
    },
    {
      label: "Phone",
      name: "phone",
      type: "text",
      rules: {
        required: "Phone is required",
        pattern: {
          value: /^\d{10}$/,
          message: "Enter a valid 10-digit number",
        },
      },
    },
    {
      label: "Employee ID",
      name: "employeeId",
      type: "text",
      rules: { required: "Employee ID is required" },
    },
    {
      label: "Department",
      name: "department",
      type: "text",
      rules: { required: "Department is required" },
    },
    {
      label: "Designation",
      name: "designation",
      type: "text",
      rules: { required: "Designation is required" },
    },
    {
      label: "Date of Joining",
      name: "doj",
      type: "date",
      rules: { required: "Date of joining is required" },
      shrink: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      rules: {
        required: "Password is required",
        minLength: {
          value: 6,
          message: "Minimum 6 characters",
        },
      },
    },
  ];

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#dfe4ea",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "#ffffff",
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
                margin: "0 auto ",
              }}
            >
              <PersonIcon sx={{ fontSize: 60, color: "#cfcfcf" }} />
            </Avatar>
            <Typography variant="h5" fontWeight={600}>
              Add New Employee
            </Typography>
          </Box>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              {fields.map((field, index) => (
                <Grid size={4} key={index}>
                  <TextField
                    
                    type={field.type}
                    label={field.label}
                    variant="standard"
                    {...register(field.name, field.rules)}
                    error={!!errors[field.name]}
                    helperText={errors[field.name]?.message}
                    InputProps={{ style: { color: "#fff" } }}
                    InputLabelProps={{
                      style: { color: "#ccc" },
                      ...(field.shrink ? { shrink: true } : {}),
                    }}
                  />
                </Grid>
              ))}

              {/* Role Dropdown */}
              <Grid size={4}>
                <TextField
                  select
                  label="Role"
                  variant="standard"
                  defaultValue="employee"
                  {...register("role", { required: "Role is required" })}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                  InputProps={{ style: { color: "#fff" } }}
                  InputLabelProps={{ style: { color: "#ccc" } }}
                >
                  <MenuItem value="employee">Employee</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="hr">HR</MenuItem>
                </TextField>
              </Grid>

              {/* Buttons */}
              <Grid size={6}>
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  gap={4}
                  flexWrap="wrap"
                >  

             
                  <Button
                    type="submit"
                    variant="contained"
                    disabled={isSubmitting}
                    sx={{
                      backgroundColor: "#a249f9",
                      color: "#fff",
                      px: 4,
                      py: 1.5,
                      borderRadius: "25px",
                      fontWeight: "bold",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "#731bd4",
                      },
                    }}
                  >
                    {isSubmitting ? "Submitting..." : "Add Employee"}
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => reset()}
                    sx={{
                      color: "#fff",
                      borderColor: "#ccc",
                      px: 4,
                      py: 1.5,
                      borderRadius: "25px",
                      fontWeight: "bold",
                      fontSize: "16px",
                    }}
                  >
                    Clear
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}

export default EmployeeAdd;
