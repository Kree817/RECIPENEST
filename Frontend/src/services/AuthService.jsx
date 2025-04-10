import axios from 'axios';

const API_URL = 'http://localhost:5188/api/auth'; // Backend running on port 5188

// Register user
const register = async (name, email, password, confirmPassword) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password, confirmPassword });
    return response.data; // Return success message or user data
  } catch (error) {
    console.error("Error during registration:", error);
    throw new Error(error.response?.data || "Something went wrong during registration.");
  }
};

export default {
  register,
};
