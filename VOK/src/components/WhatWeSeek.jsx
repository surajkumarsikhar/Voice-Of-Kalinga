import React from "react";
import { Link } from "react-router-dom";

const WhatWeSeek = () => {
  return (
    <section className="bg-black text-white py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6 font-nunito">What We Seek</h2>
        <p className="text-white/70 text-lg font-quicksand mb-8">
          We believe every street has a story, every hustle has a voice. At Voice of Kalinga, we aim to highlight the unsung heroes, daily strugglers, and passionate changemakers across Odisha.
          <br /><br />
          If you know someone whose story deserves to be told — we’re listening.
        </p>

        <Link
          to="/post-blog"
          className="inline-block px-8 py-3 rounded-full bg-white text-black font-semibold transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10 group-hover:text-black">Share a Story →</span>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-gray-300 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </Link>
      </div>
    </section>
  );
};

export default WhatWeSeek;
