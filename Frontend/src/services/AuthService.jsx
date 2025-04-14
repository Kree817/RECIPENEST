import axios from "axios";

const BASE_URL = "http://localhost:7251/api";

const authService = {
  login: async (email, password) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },
};

export default authService;
