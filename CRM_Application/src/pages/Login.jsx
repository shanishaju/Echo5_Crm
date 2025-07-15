import React from "react";
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
} from "@mui/material";
import RocketIcon from "@mui/icons-material/Rocket";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/allapi";
import { toast } from "sonner";
import logoImage from '../assets/D4.jpg'

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });

  const onSubmit = async (data) => {
    try {
      const response = await loginApi(data);
      if (response?.status === 200 && response.data.token) {
        const { token, employee } = response.data;

        sessionStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(employee));
        localStorage.setItem("username", JSON.stringify(employee.fullName));
        localStorage.setItem("Id", employee.id);

        toast.success("Login successful!");

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
            <Typography
              variant="h6"
              sx={{ color: "#fff", fontWeight: "bold", mt: 1 }}
            >
              
            </Typography>
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

              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label={
                  <Typography variant="body2" color="text.secondary">
                    Remember me & accept{" "}
                    <a href="#" style={{ color: "#1e90ff" }}>
                      Terms
                    </a>
                  </Typography>
                }
                sx={{ mb: 3, display: "block" }}
              />
              
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
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

                <Button
                  variant="outlined"
                  fullWidth
                  onClick={() => navigate("/register")}
                  sx={{
                    textTransform: "none",
                    fontWeight: "bold",
                    borderColor: "#1e90ff",
                    color: "#1e90ff",
                    "&:hover": {
                      borderColor: "#177ad6",
                      color: "#177ad6",
                    },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
