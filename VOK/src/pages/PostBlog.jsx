import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CheckCircle } from "phosphor-react"; // ✅ Success icon
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

    try {
      await axios.post(`${baseURL}/blogs`, { ...formData });
      setSuccess(true);
      setTimeout(() => navigate("/your-stories"), 2500);
    } catch (error) {
      console.error("Submission failed", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex items-center justify-center px-4 py-10 overflow-hidden font-nunito">
      {/* 🔆 Background */}
      <img
        src="/assets/wheel-logo.png"
        alt="Konark Wheel"
        className="absolute inset-0 w-full h-full object-cover opacity-40 z-0 pointer-events-none animate-zoom"
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-0" />
      <div className="absolute inset-0 bg-noise z-0 opacity-10" />

      {/* 🌟 Form Container */}
      <div className="relative z-10 w-full max-w-5xl p-6 sm:p-10 md:p-12 md:my-20 border border-white/10 bg-white/5 backdrop-blur-2xl rounded-2xl shadow-2xl animate-fade-in">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-white">
          Share Your Story
        </h1>

        {success ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <CheckCircle size={40} weight="fill" className="text-green-400 mb-3" />
            <p className="text-lg font-semibold text-green-400">
              Blog submitted! It'll appear once approved.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ✍️ Inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Title", name: "title", type: "text" },
                { label: "Author", name: "author", type: "text" },
                { label: "Email", name: "email", type: "email" },
                { label: "Phone Number", name: "phoneNumber", type: "tel" },
              ].map(({ label, name, type }) => (
                <div key={name}>
                  <label className="block mb-1 text-sm text-white/70">
                    {label}
                  </label>
                  <input
                    type={type}
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
                  />
                </div>
              ))}
            </div>

            {/* ✏️ Textarea */}
            <div>
              <label className="block mb-1 text-sm text-white/70">Story</label>
              <textarea
                name="body"
                rows="6"
                value={formData.body}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-black/30 text-white border border-white/20 rounded-xl shadow-inner resize-none focus:outline-none focus:ring-2 focus:ring-white/40 transition-all"
              />
            </div>

            {/* 🔘 Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-white/10 border border-white/20 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-white/20 backdrop-blur-lg transition-all"
            >
              {submitting ? "Submitting..." : "Submit Your Story"}
            </button>
          </form>
        )}
      </div>

      {/* 🎬 Animations */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(50px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes zoom {
          0% { transform: scale(1); }
          100% { transform: scale(1.04); }
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
