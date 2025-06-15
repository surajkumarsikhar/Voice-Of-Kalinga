import React, { useState } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = "service_tl1al1j";         // 🔁 replace with your EmailJS service ID
    const templateID = "template_u9a4k6b";       // 🔁 replace with your EmailJS template ID
    const userID = "dETZy5j14kzOP_cEE";            // 🔁 replace with your EmailJS public key

    const templateParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
      time: new Date().toLocaleString(),
    };

    emailjs
      .send(serviceID, templateID, templateParams, userID)
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          setStatus("Failed to send message. Please try again later.");
          console.error("EmailJS error:", err);
        }
      );
  };

  return (
    <div className="min-h-screen bg-black text-white py-20 px-4 font-nunito">
      <h2 className="text-4xl md:text-6xl font-bold text-center mb-8 mt-8">
        Contact Us
      </h2>

      <form
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto bg-white/5 p-8 rounded-xl space-y-6 backdrop-blur-md border border-white/10"
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your Name"
          className="w-full p-3 bg-black/80 border border-white/10 rounded-md placeholder-white text-white focus:outline-none"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Your Email"
          className="w-full p-3 bg-black/80 border border-white/10 rounded-md placeholder-white text-white focus:outline-none"
        />

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows="5"
          placeholder="Your Message"
          className="w-full p-3 bg-black/80 border border-white/10 rounded-md placeholder-white text-white focus:outline-none"
        ></textarea>

        <button
          type="submit"
          className="bg-white text-black px-6 py-3 rounded-md font-semibold hover:bg-gray-300 transition"
        >
          Send Message
        </button>

        {status && (
          <p className="text-sm text-green-400 pt-2 text-center">{status}</p>
        )}
      </form>
    </div>
  );
};

export default Contact;
