import React from "react";
import { Link } from "react-router-dom";

const BlogCard = ({ blog }) => {
  return (
    <div className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 group overflow-hidden">
      {/* Fancy Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-white/5 opacity-0 group-hover:opacity-10 transition duration-500 pointer-events-none" />

      <h2 className="text-2xl font-bold mb-2 font-nunito line-clamp-2 text-white">
        {blog.title}
      </h2>
      <p className="text-sm text-gray-400 mb-3 font-quicksand">
        By {blog.author}
      </p>
      <p className="text-gray-300 text-sm font-quicksand line-clamp-3 mb-4">
        {blog.body.slice(0, 150)}...
      </p>
      <Link
        to={`/your-stories/${blog._id}`}
        className="text-amber-400 font-semibold font-quicksand inline-flex items-center gap-1 hover:underline transition group"
      >
        Read More{" "}
        <span className="group-hover:translate-x-1 transition-transform">→</span>
      </Link>
    </div>
  );
};

export default BlogCard;
