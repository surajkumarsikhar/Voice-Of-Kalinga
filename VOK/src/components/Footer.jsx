import React from "react";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="bg-black relative">
      {/* Top fade */}
      <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none"></div>
      
      <footer className="bg-white/5 backdrop-blur-sm text-white py-10 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">

          {/* Brand / Logo */}
          <div>
            <h2 className="text-2xl font-bold font-nunito mb-2">Voice of Kalinga</h2>
            <p className="text-white/60 text-sm font-quicksand">
              Stories from the Streets of Odisha
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3 font-nunito">Quick Links</h3>
            <ul className="space-y-2 text-sm font-quicksand">
              <li><Link to="/" className="hover:text-amber-400">Home</Link></li>
              <li><Link to="/your-stories" className="hover:text-amber-400">Your Stories</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400">Contact</Link></li>
            </ul>
          </div>

          {/* Social Handles */}
          <div>
            <h3 className="text-lg font-semibold mb-3 font-nunito">Follow Us</h3>
            <div className="flex justify-center gap-6 text-xl">
              <a href="https://www.instagram.com/voiceofkalinga/" target="_blank" rel="noreferrer" className="hover:text-amber-400">
                <FaInstagram />
              </a>
              <a href="https://www.youtube.com/channel/UCp--FI5cLQ31Gz_HyQFiTvw" target="_blank" rel="noreferrer" className="hover:text-amber-400">
                <FaYoutube />
              </a>
              <a href="https://x.com/yourhandle" target="_blank" rel="noreferrer" className="hover:text-amber-400">
                <FaXTwitter />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-white/40 text-sm font-quicksand">
          &copy; {new Date().getFullYear()} Voice of Kalinga. All rights reserved.
        </div>
      </footer>
      
      {/* Bottom fade */}
      {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none"></div> */}
    </div>
  );
};

export default Footer;