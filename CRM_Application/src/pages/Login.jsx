import React from "react";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { useForm } from "react-hook-form";
import { loginApi } from "../services/allapi";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

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
        // console.log(response)

        //  Use sessionStorage for token (same as commonapi)
        sessionStorage.setItem("token", token);

        //  Save full user object to localStorage
        localStorage.setItem("user", JSON.stringify(employee));
        localStorage.setItem("username", JSON.stringify(employee.fullName))
        localStorage.setItem("Id",employee.id)

        toast.success("Login successful!");

        // Redirect based on role
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
        backgroundColor: "#f4f4f4",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Container
        maxWidth="xs"
        sx={{ mt: 10, display: "flex", justifyContent: "center" }}
      >
        <Paper
          elevation={6}
          sx={{
            backgroundColor: "#8525e7",
            padding: 5,
            py: 8,
            color: "#fff",
            borderRadius: 1,
            textAlign: "center",
            width: "100%",
            maxWidth: 380,
          }}
        >
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
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 4 }}>
            Login Here
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              placeholder="Enter Email Address"
              variant="standard"
              {...register("email", { required: "Email is required" })}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              sx={{ mb: 4 }}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />

            <TextField
              fullWidth
              type="password"
              placeholder="Enter Password"
              variant="standard"
              {...register("password", { required: "Password is required" })}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              sx={{ mb: 5 }}
              InputProps={{ style: { color: "#fff" } }}
              InputLabelProps={{ style: { color: "#aaa" } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={isSubmitting}
              sx={{
                backgroundColor: "#a249f9",
                color: "#fff",
                padding: "12px 0",
                borderRadius: "25px",
                fontWeight: "bold",
                fontSize: "16px",
                "&:hover": { backgroundColor: "#731bd4" },
              }}
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
