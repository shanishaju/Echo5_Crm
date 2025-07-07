import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EmployeeListApi } from "../../services/allapi";
import { toast } from "sonner";
import AdminSidebar from "../Sidebar/AdminSidebar"; // Assuming you have this

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch employee data
  const fetchEmployees = async () => {
    try {
      const response = await EmployeeListApi();
      if (response.status === 200) {

        setEmployees(response.data);
        console.log(response)
      } else {
        toast.error("Failed to fetch employees");
      }
    } catch (error) {
      toast.error("Error fetching employee list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleEdit = (id) => {
    console.log("Edit employee with ID:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete employee with ID:", id);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        

        {/*  Welcome/Stats Card */}
        <Paper
          elevation={4}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 2,
            background: "#a855f7",
            color: "#fff",
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Welcome Admin 👋
          </Typography>
          <Typography>Total Employees: {employees.length}</Typography>
        </Paper>

        {/*  Employee Cards */}
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {employees.length > 0 ? (
              employees.map((employee) => (
                <Grid item xs={12} sm={6} md={4} key={employee._id}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: "#fefefe",
                      height: "100%",
                    }}
                  >
                    <Typography variant="h6" fontWeight={600}>
                      {employee.fullName}
                    </Typography>
                    <Typography>Email: {employee.email}</Typography>
                    <Typography>Employee Id: {employee.employeeId}</Typography>
                    <Typography>Department: {employee.department}</Typography>
                    <Typography>Designation: {employee.designation}</Typography>

                    <Box mt={2} display="flex" gap={1}>
                      <Button
                        variant="outlined"
                        size="small"
                        startIcon={<EditIcon />}
                        onClick={() => handleEdit(employee._id)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        color="error"
                        startIcon={<DeleteIcon />}
                        onClick={() => handleDelete(employee._id)}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Paper>
                </Grid>
              ))
            ) : (
              <Typography>No employees found.</Typography>
            )}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default EmployeeList;
