import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

// Create a Context to manage the user ID globally
const UserContext = createContext();

// UserProvider component will wrap the App to provide the user context
export const UserProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // On mount, check if there is a stored user ID in localStorage
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId); // Set the user ID if it exists in localStorage
    }
  }, []);

  const setUser = (id) => {
    setUserId(id); // Set the user ID in state and localStorage
    localStorage.setItem("userId", id);
  };

  const value = {
    userId,  // The user ID value
    setUser, // Function to set the user ID
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// PropTypes validation for UserProvider
UserProvider.propTypes = {
  children: PropTypes.node.isRequired,  // Validate that `children` is required
};

// Custom hook to access the UserContext in any component
export const useUser = () => {
  return useContext(UserContext);
};
