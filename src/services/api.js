import axios from 'axios';

// Base Axios instance routed via Vite Proxy to Spring Boot on localhost:8080
const api = axios.create({
  baseURL: '/medisetu/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Response interceptor to normalize backend ErrorResponse & 400 details map
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.data) {
      const data = error.response.data;
      const customError = new Error(data.message || 'Server request failed');
      customError.status = error.response.status;
      customError.error = data.error; // e.g. "BAD_REQUEST", "CONFLICT", "NOT_FOUND"
      customError.details = data.details || null; // Map of { fieldName: errorMessage }
      customError.timestamp = data.timestamp;
      return Promise.reject(customError);
    }
    return Promise.reject(error);
  }
);

export default api;
