import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
// import Chefs from './pages/Chefs';
// import Blog from './pages/Blog';
// import Contact from './pages/Contact';
import RecipeDetails from './pages/RecipeDetailsPage';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import UserDashboard from './pages/chef-dashboard';
import ProtectedRoute from './protected/protected-route';
import ChefSignup from './components/ChefSignup';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/chefs" element={<Chefs />} /> */}
        {/* <Route path="/blog" element={<Blog />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
        <Route path="/recipe/:id" element={<RecipeDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/chef-signup" element={<ChefSignup />} />
        
        
        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard /> 
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
