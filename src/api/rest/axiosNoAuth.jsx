import axios from "axios";
const axiosLogin = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosLogin.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  async (error) => {
    if (error && error.response.data) {
      return error.response.data;
    }
  }
);

export default axiosLogin;
