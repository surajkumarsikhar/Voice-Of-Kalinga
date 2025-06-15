import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { PenLine } from "lucide-react";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const SkeletonCard = () => (
  <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md animate-pulse border border-white/10">
    <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
    <div className="h-4 w-1/2 bg-white/10 rounded mb-6"></div>
    <div className="h-20 w-full bg-white/10 rounded"></div>
  </div>
);

const YourStories = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${baseURL}/blogs`);
        setBlogs(res.data.filter((blog) => blog.approved));
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white px-4 py-20 overflow-hidden font-nunito">
      {/* 🎞️ Animated Background Image */}
      <img
        src="/assets/ratha.jpg"
        alt="Jagannath Dome"
        className="absolute top-20 left-0 w-full h-full object-contain opacity-100 invert z-0 pointer-events-none animate-fade-in-up"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />

      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl text-center font-bold mb-8 mt-8">
          Your Stories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : blogs.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No stories found.
            </div>
          ) : (
            blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
          )}
        </div>
      </div>

      {/* Floating Post Button */}
      <Link
        to="/post-blog"
        className="fixed bottom-5 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 backdrop-blur-md text-white border border-white/20 px-6 py-3 rounded-full shadow-lg hover:bg-white/20 transition-all flex items-center gap-2 font-semibold"
      >
        <PenLine size={18} />
        <span className="hidden sm:inline">Post Yours</span>
      </Link>

      {/* 🧩 Animation Styles */}
      <style>{`
        @keyframes fade-in-up {
          0% {
            opacity: 0;
            transform: translateY(100px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default YourStories;
