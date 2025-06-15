import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const baseURL = import.meta.env.VITE_API_BASE_URL;

const PostBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    body: "",
    email: "",
    phoneNumber: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    console.log("Submitting blog with data:", formData);

    try {
      await axios.post(`${baseURL}/blogs`, {
        ...formData
      });
      setSuccess(true);
      setTimeout(() => navigate("/your-stories"), 3000);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 overflow-hidden font-nunito">
      {/* Background image */}
      <img
        src="/assets/wheel-logo.png"
        alt="Konark Wheel"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0 pointer-events-none animate-zoom"
      />

      {/* Glass + Paper overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0" />
      <div className="absolute inset-0 bg-noise z-0 opacity-10" />

      {/* Form container */}
      <div className="relative top-10 z-10 w-full max-w-5xl p-8 sm:p-12 border border-white/10 bg-white/5 backdrop-blur-lg rounded-2xl shadow-2xl animate-fade-in">
        <h1 className="text-4xl font-bold text-center mb-8 text-white">
          Post Your Story
        </h1>

        {success ? (
          <p className="text-center text-green-400 text-lg font-semibold">
            ✅ Blog submitted. It'll appear once approved.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Row 1: Title + Author */}
            <div className="flex flex-col md:flex-row gap-6">
              {[
                { label: "Title", name: "title", type: "text" },
                { label: "Author", name: "author", type: "text" },
              ].map(({ label, name, type }) => (
                <div key={name} className="w-full">
                  <label className="block mb-1 text-sm text-white/70">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                  />
                </div>
              ))}
            </div>

            {/* Row 2: Email + Phone */}
            <div className="flex flex-col md:flex-row gap-6">
              {[
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phoneNumber", type: "tel" },
              ].map(({ label, name, type }) => (
                <div key={name} className="w-full">
                  <label className="block mb-1 text-sm text-white/70">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white/30 transition"
                  />
                </div>
              ))}
            </div>

            {/* Body */}
            <div>
              <label className="block mb-1 text-sm text-white/70">Body</label>
              <textarea
                name="body"
                rows="6"
                value={formData.body}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-xl shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-white/30 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white text-black font-bold py-3 rounded-xl shadow-lg hover:bg-gray-200 transition"
            >
              {submitting ? "Submitting..." : "Submit Story"}
            </button>
          </form>
        )}
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.05); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out both;
        }
        .animate-zoom {
          animation: zoom 15s ease-in-out infinite alternate;
        }
        .bg-noise {
          background-image: url("https://transparenttextures.com/patterns/asfalt-light.png");
        }
      `}</style>
    </div>
  );
};

export default PostBlog;
