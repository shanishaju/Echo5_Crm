import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AdminSidebar from "../Sidebar/AdminSidebar";
import {
  EmployeeListApi,
  DeleteEmployeeApi,
  EditEmployeeApi,
  UpdateEmployeeApi,
} from "../../services/allapi";
import { toast } from "sonner";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  const [editOpen, setEditOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch employee data
  const fetchEmployees = async () => {
    try {
      const response = await EmployeeListApi();
      if (response.status === 200) {
        setEmployees(response.data);
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

  // Delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        const response = await DeleteEmployeeApi(id);
        if (response.status === 200) {
          toast.success("Employee deleted successfully");
          fetchEmployees();
        } else {
          toast.error("Failed to delete employee");
        }
      } catch (error) {
        toast.error("Error deleting employee");
      }
    }
  };

  // Edit
  const handleEdit = async (id) => {
    try {
      const response = await EditEmployeeApi(id);
      if (response.status === 200) {
        setSelectedEmployee(response.data);
        setEditOpen(true);
      } else {
        toast.error("Failed to fetch employee data");
      }
    } catch (error) {
      toast.error("Error loading employee details");
    }
  };

  const handleEditSubmit = async () => {
    try {
      const response = await UpdateEmployeeApi(
        selectedEmployee._id,
        selectedEmployee
      );
      if (response.status === 200) {
        toast.success("Employee updated successfully");
        setEditOpen(false);
        fetchEmployees();
      } else {
        toast.error("Failed to update employee");
      }
    } catch (error) {
      toast.error("Error updating employee");
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Welcome Card */}
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

        {/* Employee Cards */}
        {loading ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="200px"
          >
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
                      height: "280px",
                      minHeight: 280,
                      width: "280px",
                      minWidth: 280,
                      p: 3,
                      borderRadius: 1,
                      bgcolor: "#fefefe",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {employee.fullName}
                      </Typography>
                      <Typography>Email: {employee.email}</Typography>
                      <Typography>Employee Id: {employee.employeeId}</Typography>
                      <Typography>Department: {employee.department}</Typography>
                      <Typography>Designation: {employee.designation}</Typography>
                      <Typography>Role: {employee.role}</Typography>
                    </Box>

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

      {/* Edit Employee Dialog */}
      <Dialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Edit Employee</DialogTitle>
        <DialogContent dividers>
          {selectedEmployee && (
            <Box
              component="form"
              sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
            >
              <TextField
                label="Full Name"
                value={selectedEmployee.fullName}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    fullName: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Email"
                value={selectedEmployee.email}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    email: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Department"
                value={selectedEmployee.department}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    department: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Designation"
                value={selectedEmployee.designation}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    designation: e.target.value,
                  })
                }
                fullWidth
              />
              <TextField
                label="Role"
                value={selectedEmployee.role}
                onChange={(e) =>
                  setSelectedEmployee({
                    ...selectedEmployee,
                    role: e.target.value,
                  })
                }
                fullWidth
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button variant="contained" onClick={handleEditSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default EmployeeList;
