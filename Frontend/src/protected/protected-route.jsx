import { Navigate } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
};

// Add PropTypes validation for the children prop
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Ensure that children is a valid React node
};

export default ProtectedRoute;
