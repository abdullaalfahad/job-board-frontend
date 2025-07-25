import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://job-board-backend-liyl.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
