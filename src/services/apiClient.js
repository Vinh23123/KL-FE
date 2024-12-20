import axios from "axios";

const option = {
  baseURL: "http://localhost:8081/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
};

const apiClient = axios.create(option);

apiClient.interceptors.response.use(
  (response) => response, // Successful responses just return as normal
  (error) => {
    console.error("API call failed:", error);
    if (error.response) {
      // Handle specific HTTP status codes
      if (error.response.status === 401) {
        console.warn("Unauthorized - Redirecting to login...");
        // Handle unauthorized access (e.g., log the user out or redirect)
      } else if (error.response.status === 404) {
        console.warn("Not found - The resource was not found.");
        // Handle 404 not found (e.g., show a message to the user)
      }
    } else if (error.request) {
      // The request was made, but no response was received
      console.warn("No response received from the server.");
    } else {
      // Something else went wrong in setting up the request
      console.error("Error setting up the request:", error.message);
    }
    return Promise.reject(error); // Always reject the error to handle it further down the chain if needed
  }
);

export default apiClient;
