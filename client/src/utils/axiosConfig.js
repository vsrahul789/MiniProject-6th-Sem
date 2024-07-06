// src/utils/axiosConfig.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/restaurants', // Adjust base URL if needed
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
