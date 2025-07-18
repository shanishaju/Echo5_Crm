import { commonapi } from "./commonapi";
import { serverurl } from "./serverurl";

export const registerApi = async (reqBody) => {
  return await commonapi("POST", `${serverurl}/register`, reqBody, {}); //  force header inclusion
};

export const loginApi = async (reqBody) => {
  return await commonapi("POST", `${serverurl}/login`, reqBody); 
}

export const EmployeeListApi = async () => {
  return await commonapi("GET", `${serverurl}/employeelist`, null);
};

export const AttendanceApi = async (reqBody) => {
  return await commonapi("POST", `${serverurl}/attendance`, reqBody);
};
export const GetAllAttendanceApi = async (dateStr) => {
  return await commonapi("GET", `${serverurl}/all-attendance?date=${dateStr}`, null);
};

export const GetMyAttandanceApi = async (dateStr) => {
  return await commonapi("GET", `${serverurl}/my-attendance?date=${dateStr}`, null);
};

export const DeleteEmployeeApi = async (id) => {
  return await commonapi("DELETE", `${serverurl}/delete-employee/${id}`);
};

export const EditEmployeeApi = async (id) => {
  return await commonapi("GET", `${serverurl}/edit-employee/${id}`);
};

export const UpdateEmployeeApi = async (id, updatedData) => {
  return await commonapi("PUT", `${serverurl}/update-employee/${id}`, updatedData);
};

export const SubmitLeaveApplicationApi = async (data) => {
  return await commonapi("POST", `${serverurl}/leave-applications`, data);
};

export const getAllLeavesApi = async () => {
  return await commonapi("GET", `${serverurl}/admin/leave-requests`);
};

export const updateLeaveStatusApi = async (id, data) => {
  return await commonapi("PATCH", `${serverurl}/admin/leave-requests/${id}`, data);
};

export const getMyLeavesApi = async () => {
  return await commonapi("GET", `${serverurl}/my-leave-requests`, null);
};
