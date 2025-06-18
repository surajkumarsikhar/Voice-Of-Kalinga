import React, { useState } from "react";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const NominateHero = () => {
  const [formData, setFormData] = useState({
    yourName: "",
    yourEmail: "",
    yourPhone: "",
    heroName: "",
    heroLocation: "",
    reason: "",
    story: "",
    photo: null,
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    if (e.target.name === "photo") {
      setFormData({ ...formData, photo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const form = new FormData();
      for (let key in formData) {
        form.append(key, formData[key]);
      }

      await axios.post(`${baseURL}/nominate`, form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setStatus("Nomination submitted successfully!");
      setFormData({
        yourName: "",
        yourEmail: "",
        yourPhone: "",
        heroName: "",
        heroLocation: "",
        reason: "",
        story: "",
        photo: null,
      });
    } catch (err) {
      setStatus("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-4 pb-16 font-nunito">
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-10">
        Nominate a Hero
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white/5 p-8 rounded-2xl space-y-6 backdrop-blur-md border border-white/10"
      >
        {/* Your Name */}
        <div>
          <label className="block mb-2 font-semibold">👤 Your Name</label>
          <input
            type="text"
            name="yourName"
            required
            value={formData.yourName}
            onChange={handleChange}
            placeholder="Enter your name"
            className="w-full p-3 bg-black/70 border border-white/10 rounded-md text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-semibold">📧 Your Email</label>
          <input
            type="email"
            name="yourEmail"
            required
            value={formData.yourEmail}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full p-3 bg-black/70 border border-white/10 rounded-md text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-semibold">📞 Your Phone</label>
          <input
            type="text"
            name="yourPhone"
            required
            pattern="[0-9]{10}"
            value={formData.yourPhone}
            onChange={handleChange}
            placeholder="10-digit phone number"
            className="w-full p-3 bg-black/70 border border-white/10 rounded-md text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Hero Name */}
        <div>
          <label className="block mb-2 font-semibold">🌟 Hero's Name</label>
          <input
            type="text"
            name="heroName"
            required
            value={formData.heroName}
            onChange={handleChange}
            placeholder="Name of the person you're nominating"
            className="w-full p-3 bg-black/70 border border-white/10 rounded-md text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Hero Location */}
        <div>
          <label className="block mb-2 font-semibold">📍 Hero’s Location</label>
          <input
            type="text"
            name="heroLocation"
            required
            value={formData.heroLocation}
            onChange={handleChange}
            placeholder="City/Area where they live or work"
            className="w-full p-3 bg-black/70 border border-white/10 rounded-md text-white placeholder-white focus:outline-none"
          />
        </div>

        {/* Why nominate */}
        <div>
          <label className="block mb-2 font-semibold">
            💡 Why do you want to nominate them?
          </label>
          <textarea
            name="reason"
            rows="3"
            required
            value={formData.reason}
            onChange={handleChange}
            placeholder="What makes them special?"
            className="w-full p-3 bg-black/70 border border-white/10 rounded-md text-white placeholder-white focus:outline-none"
          ></textarea>
        </div>

        {/* Story/Context */}
        <div>
          <label className="block mb-2 font-semibold">
            📝 What do they do? (Story/Context)
          </label>
          <textarea
            name="story"
            rows="5"
            required
            value={formData.story}
            onChange={handleChange}
            placeholder="Tell us their story..."
            className="w-full p-3 bg-black/70 border border-white/10 rounded-md text-white placeholder-white focus:outline-none"
          ></textarea>
        </div>

        {/* Photo */}
        <div>
          <label className="block mb-2 font-semibold">📸 Photo (optional)</label>
          <input
            type="file"
            name="photo"
            accept="image/*"
            onChange={handleChange}
            className="w-full text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-white/80 file:text-black hover:file:bg-white"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="bg-white text-black px-8 py-3 rounded-md font-semibold hover:bg-gray-300 transition"
          >
            {loading ? "Submitting..." : "Submit Nomination"}
          </button>

          {status && (
            <p className="text-sm text-green-400 pt-4">{status}</p>
          )}
        </div>
      </form>
    </div>
  );
};

export default NominateHero;
