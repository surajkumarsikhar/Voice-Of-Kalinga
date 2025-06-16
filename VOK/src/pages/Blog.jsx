import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { gsap } from "gsap";
import jhoti from "../assets/jhoti.png";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const Blog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const imgRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${baseURL}/blogs/${id}`)
      .then((res) => setBlog(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  useEffect(() => {
    const img = imgRef.current;
    if (img) {
      const startAnimation = () => {
        gsap.to(img, {
          rotation: 360,
          duration: 80,
          repeat: -1,
          ease: "linear",
          transformOrigin: "center center",
        });
      };

      if (img.complete) {
        startAnimation();
      } else {
        img.onload = startAnimation;
      }
    }
  }, [blog]);

  return (
    <div className="relative min-h-screen bg-black text-white font-nunito overflow-hidden flex items-center justify-center px-4 py-20 md:py-32">

      {/* Rotating Jhoti Image */}
      <img
        ref={imgRef}
        src={jhoti}
        alt="Jhoti"
        className="fixed w-[150vw] md:w-screen opacity-10 invert drop-shadow-[0_0_30px_rgba(255,255,255,0.08)]"
        style={{
          bottom: "-100%",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 0,
          aspectRatio: "1/1",
        }}
      />

      {/* Blog Content or Skeleton */}
      <div className="relative z-10 w-full max-w-3xl md:max-w-4xl p-6 md:p-10 border border-white/10 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl animate-fade-in">
        {blog ? (
          <>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-white leading-tight">
              {blog.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mb-4 md:mb-6">
              By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <div className="text-base sm:text-lg leading-relaxed text-white/90 whitespace-pre-line font-quicksand">
              {blog.body}
            </div>
          </>
        ) : (
          <>
            <div className="h-8 w-3/4 bg-white/10 rounded animate-pulse mb-4"></div>
            <div className="h-4 w-1/3 bg-white/10 rounded animate-pulse mb-6"></div>
            <div className="space-y-3">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="h-4 bg-white/10 rounded animate-pulse"
                  style={{ width: `${80 + Math.random() * 20}%` }}
                ></div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Custom CSS Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
      `}</style>
    </div>
  );
};

export default Blog;
