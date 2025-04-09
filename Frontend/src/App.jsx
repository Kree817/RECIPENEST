import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import LoginForm from "./components/login";
import SignupForm from "./components/signup";
import CreateRecipe from "./components/create-recipe";
import Home from "./pages/home";

function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/recipes" element={<Home />} />
        <Route path="/create-recipe" element={<CreateRecipe />} />
      </Routes>
    </Router>
  );
}

export default App;
