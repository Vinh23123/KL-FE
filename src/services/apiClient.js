import axios from "axios";

const options = {
  baseURL: "http://localhost:8081/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
};

const apiClient = axios.create(options);

function getLocalAccessToken() {
  const accessToken = localStorage.getItem("accessToken");
  // console.log(accessToken);

  return accessToken;
}

function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  // console.log(refreshToken);

  return refreshToken;
}

function refreshToken() {
  return apiClient.post("/auth/refreshtoken", {
    refreshToken: getLocalRefreshToken(),
  });
}

apiClient.interceptors.request.use(
  (config) => {
    const token = getLocalAccessToken();
    console.log(token);

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => response, // Successful responses just return as normal
  async (error) => {
    const originalConfig = error.config;

    console.error("API call failed:", error);

    if (error.response) {
      const statusCode = error.response.status;

      // Handle 401 Unauthorized
      if (statusCode === 401) {
        const errorMessage = error.response.data?.message;

        // Check if it's due to expired token
        if (
          errorMessage ===
            "Full authentication is required to access this resource" &&
          !originalConfig._retry
        ) {
          originalConfig._retry = true;

          try {
            // Refresh the token
            const refreshResponse = await refreshToken();
            const { accessToken } = refreshResponse.data.data;

            // Save new token
            window.localStorage.setItem("accessToken", accessToken);

            // Update default headers
            apiClient.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${accessToken}`;
            originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;

            // Retry the original request with the new token
            return apiClient(originalConfig);
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            // Redirect to login if refresh token fails
            window.localStorage.removeItem("accessToken");
            window.location.href = "/booking-app/login";
            return Promise.reject(refreshError);
          }
        }

        // Handle bad credentials (e.g., during login)
        if (errorMessage === "Bad credentials") {
          return Promise.reject({ message: "Invalid username or password." });
        }
      }

      // Handle 403 Forbidden
      if (statusCode === 403) {
        console.warn("Access forbidden - User does not have permission.");
        return Promise.reject(error.response.data);
      }

      // Handle 404 Not Found
      if (statusCode === 404) {
        console.warn("Not found - The resource was not found.");
        return Promise.reject(error.response.data);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.warn("No response received from the server.");
      return Promise.reject({
        message: "No response received from the server.",
      });
    } else {
      // Something else went wrong in setting up the request
      console.error("Error setting up the request:", error.message);
      return Promise.reject(error.response.data);
    }

    // Reject the error for further handling
    return Promise.reject(error?.response?.data || error.message);
  }
);

export default apiClient;
