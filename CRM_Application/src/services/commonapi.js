import axios from "axios";

export const commonapi = async (httpRequest, url, reqBody, reqHeader) => {
  const token = sessionStorage.getItem("token");

  // Determine if request is to /login or /register
  const isAuthApi = url.includes("/login") || url.includes("/register");

  // Check if the body is FormData
  const isFormData = reqBody instanceof FormData;

  // Set default headers
  const defaultHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token && !isAuthApi && { Authorization: token }),
  };

  // Merge with any custom headers passed
  const headers = reqHeader ? { ...defaultHeaders, ...reqHeader } : defaultHeaders;

  // Configure Axios request
  const reqConfig = {
    method: httpRequest,
    url,
    data: isFormData ? reqBody : JSON.stringify(reqBody),
    headers,
  };

  // Make the API call
  return await axios(reqConfig)
    .then((result) => result)
    .catch((error) => {
      // console.error("API Error:", error.response?.data || error.message);
      return error;
    });
};