import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; // ✅ path should be correct
import axios from "axios";

axios.defaults.withCredentials = true;

import Home from "./pages/Home";
import YourStories from "./pages/YourStories";
import WatchStories from "./pages/WatchStories";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import PostBlog from "./pages/PostBlog";
import Footer from "./components/Footer";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";



const App = () => {
  return (
    <div className="overflow-x-hidden">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/your-stories" element={<YourStories />} />
          <Route path="/your-stories/:id" element={<Blog />} />
          <Route path="/watch-stories" element={<WatchStories />} />
          <Route path="/post-blog" element={<PostBlog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
