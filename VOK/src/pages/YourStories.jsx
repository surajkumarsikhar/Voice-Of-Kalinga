import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "../components/BlogCard";
import { PencilSimple } from "phosphor-react"; // ✅ Premium-looking Phosphor icon
import rathaBg from "../assets/ratha.jpg";

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
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden px-4 pt-20 pb-36 font-nunito">
      {/* 🔲 Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={rathaBg}
          alt="Jagannath Dome"
          className="w-full h-full object-cover opacity-10 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
      </div>

      {/* ✨ Content */}
      <div className="relative z-10 max-w-7xl mx-auto md:my-8">
        <h1 className="text-4xl md:text-6xl text-center font-bold mb-10 animate-fade-in-up">
          Your Stories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : blogs.length === 0 ? (
            <div className="col-span-full text-center text-gray-400">
              No stories found.
            </div>
          ) : (
            blogs.map((blog, i) => (
              <div
                key={blog._id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <BlogCard blog={blog} />
              </div>
            ))
          )}
        </div>
      </div>

      {/* 🖊 Floating Post Button */}
<Link
  to="/post-blog"
  className="fixed bottom-25 right-8 sm:bottom-8 sm:right-8 z-50 bg-white/10 backdrop-blur-xl text-white border border-white/20 p-4 rounded-full shadow-xl hover:bg-white/20 transition-all flex items-center justify-center"
>
  <PencilSimple size={24} weight="bold" />
</Link>


      {/* ✨ Animations */}
      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.7s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default YourStories;
