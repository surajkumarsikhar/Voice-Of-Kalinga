import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const SkeletonCard = () => (
  <div className="bg-white/5 p-6 rounded-xl shadow-sm animate-pulse border border-white/10">
    <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
    <div className="h-4 w-1/2 bg-white/10 rounded mb-4"></div>
    <div className="h-24 w-full bg-white/10 rounded"></div>
  </div>
);

const BlogPreviewSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(`${baseURL}/blogs`);
        const approvedBlogs = res.data.filter((blog) => blog.approved);
        setBlogs(approvedBlogs);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const visibleBlogs = blogs.slice(0, 3);
  const placeholders = Array.from({ length: 3 - visibleBlogs.length });

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Heading */}
      <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-bold font-nunito text-center mb-12 tracking-tight">
        LATEST STORIES
      </h2>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {loading
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          : visibleBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)}

        {/* Coming Soon placeholders */}
        {!loading &&
          blogs.length < 3 &&
          placeholders.map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="flex items-center justify-center h-48 bg-white/5 border border-white/10 rounded-xl text-white/40 font-medium text-lg"
            >
              Coming Soon...
            </div>
          ))}
      </div>

      {/* View All Stories Button */}
      <div className="mt-10 text-center">
        <Link
          to="/your-stories"
          className="inline-block px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
        >
          View All Stories →
        </Link>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
