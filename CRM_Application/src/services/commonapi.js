import axios from "axios";

export const commonapi = async (httpRequest, url, reqBody, customHeaders = {}) => {
  const token = sessionStorage.getItem("token");
  const isPublicApi = url.includes("/login");

  const isFormData = reqBody instanceof FormData;

  const defaultHeaders = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(token && !isPublicApi && { Authorization: `Bearer ${token}` }),
  };

  const headers = { ...defaultHeaders, ...customHeaders };

  const config = {
    method: httpRequest,
    url,
    data: isFormData ? reqBody : JSON.stringify(reqBody),
    headers,
  };

  return await axios(config)
    .then((result) => result)
    .catch((error) => error);
};
