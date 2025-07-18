// Office Configuration
// Define office IP addresses that are allowed for "Office" work mode
export const OFFICE_IPS = [
  "116.68.101.245" // Example office IP
];

// Work location options
export const WORK_LOCATIONS = {
  OFFICE: "Office",
  HYBRID: "Hybrid"
};

// Function to check if an IP is in the office network
export const isOfficeIP = (ipAddress) => {
  return OFFICE_IPS.includes(ipAddress);
};
