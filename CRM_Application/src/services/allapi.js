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
