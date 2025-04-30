import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import RecipeDetails from './pages/RecipeDetailsPage';
import RecipePage from './pages/recipe-page';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import ChefDashboard from './pages/chef-dashboard';
import ProtectedRoute from './protected/protected-route';
import ChefSignup from './components/ChefSignup';
import SearchResults from "./components/SearchResults";  // Import SearchResults
import { UserProvider } from './context/UserContext'; // Import the UserProvider
import ChefPage from './pages/Chef-page';
import ChefEditProfile from './components/ChefEditProfile'; // Chef Edit Profile
import MyRecipes from './components/MyRecipes'; // Component for My Recipes
import MyBlogs from './components/ManageBlogs'; // Component for My Blogs
import AddRecipe from './components/AddRecipe'; // Component for Add Recipe
import AddBlog from './components/AddBlog'; // Component for Add Blog
import BlogPage from './pages/blog-page'; // Component for Blogs
import BlogDetail from './components/BlogDetail';
import Contact from './components/ContactUs'; // Component for Contact Us
import Help from './components/Help'; // Component for Help
import HelpPage from './pages/help-page'; // Component for Help Page
import Footer from './components/Footer'; // Import Footer


//For admin

import AdminLoginPage from './admin-components/admin-login';
import AdminDashboard from './pages/admin-dashboard'; // Admin Dashboard
import AllRecipes from './admin-components/all-recipes';  
import AllBlogs from './admin-components/all-blogs'; 
import AllChefs from './admin-components/all-chefs'; // Admin All Chefs

function App() {
  return (
    <UserProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipe/:id" element={<RecipeDetails />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/recipe-page" element={<RecipePage />} />
          <Route path="/chef-signup" element={<ChefSignup />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/chef-page" element={<ChefPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help-page" element={<HelpPage />} />

          <Route path="/admin-login" element={<AdminLoginPage />} />

          {/* Protected Routes for the Chef */}
          <Route
            path="/chef-dashboard"
            element={
              <ProtectedRoute>
                <ChefDashboard />
              </ProtectedRoute>
            }
          />

          {/* Chef Profile Edit Route */}
          <Route
            path="/chef/edit-profile"
            element={
              <ProtectedRoute>
                <ChefEditProfile />
              </ProtectedRoute>
            }
          />

          {/* My Recipes Route*/}
          <Route
            path="/chef/my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipes />
              </ProtectedRoute>
            }
          /> 

          {/* My Blogs Route */}
          <Route
            path="/chef/my-blogs"
            element={
              <ProtectedRoute>
                <MyBlogs />
              </ProtectedRoute>
            }
          />

          {/* Add Recipe Route */}
          <Route
            path="/chef/add-recipe"
            element={
              <ProtectedRoute>
                <AddRecipe />
              </ProtectedRoute>
            }
          />

          {/* Add Blog Route */}
          <Route
            path="/chef/add-blog"
            element={
              <ProtectedRoute>
                <AddBlog />
              </ProtectedRoute>
            }
          />


          {/* Protected Routes for the Admin */}
          <Route
            path="/admin-dashboard"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

<Route
            path="/all-recipes"
            element={
              <ProtectedRoute>
                <AllRecipes />
              </ProtectedRoute>
            }
          />

<Route
            path="/all-blogs"
            element={
              <ProtectedRoute>
                <AllBlogs />
              </ProtectedRoute>
            }
          />



<Route
            path="/all-chefs"
            element={
              <ProtectedRoute>
                <AllChefs />
              </ProtectedRoute>
            }
          />

        </Routes>

        <Footer/>


      </Router>
    </UserProvider>
  );
}

export default App;
