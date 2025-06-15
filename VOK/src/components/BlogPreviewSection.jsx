import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "./BlogCard";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const SkeletonCard = () => (
  <div className="bg-white/5 backdrop-blur-md p-6 rounded-xl shadow-md animate-pulse border border-white/10">
    <div className="h-6 w-3/4 bg-white/10 rounded mb-4"></div>
    <div className="h-4 w-1/2 bg-white/10 rounded mb-6"></div>
    <div className="h-20 w-full bg-white/10 rounded"></div>
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

  return (
    <section className=" backdrop-blur-md py-12 px-6 rounded-xl max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl text-white md:text-5xl font-nunito font-bold text-center mb-12">
          LATEST STORIES
        </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
        ) : blogs.length > 0 ? (
          blogs.slice(0, 3).map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <div className="col-span-3 text-center text-white/60">
            No stories yet. Stay tuned!
          </div>
        )}

        {/* Optional Placeholder if less than 3 blogs */}
        {!loading && blogs.length < 3 &&
          Array.from({ length: 3 - blogs.length }).map((_, i) => (
            <div
              key={`placeholder-${i}`}
              className="bg-white/10 border border-white/10 rounded-xl h-47 flex items-center justify-center text-white/40"
            >
              Coming Soon...
            </div>
          ))}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/your-stories"
          className="inline-block px-6 py-2 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-all"
        >
          View All Stories →
        </Link>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
