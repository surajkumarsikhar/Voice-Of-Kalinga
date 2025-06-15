import React from "react";
import { Link, useLocation } from "react-router-dom";
import vokLogo from "../assets/logo.png";
import coffeeLogo from "../assets/buymeacoffee.svg";

// Icons (you can install lucide-react or use any preferred icon lib)
import { Home, BookOpen, Video, Phone } from "lucide-react";

const Navbar = () => {
  const { pathname } = useLocation();

  return (
    <>
      {/* Top Navbar for Desktop */}
      <nav className="hidden md:flex fixed top-2 left-1/2 transform -translate-x-1/2 w-[96%] z-50 backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-xl px-5 py-4">
        {/* Left Section - Logo */}
        <div className="flex items-center w-1/3">
          <Link to="/" className="w-18 h-10">
            <img src={vokLogo} alt="VOK" className="object-cover h-full" />
          </Link>
        </div>

        {/* Center Section - Links */}
        <div className="flex justify-center items-center w-1/3">
          <ul className="flex gap-10 items-center text-white font-nunito text-lg">
            <li>
              <Link to="/" className={`hover:text-gray-300 ${pathname === "/" ? "text-white font-bold" : ""}`}>Home</Link>
            </li>
            <li>
              <Link to="/your-stories" className={`hover:text-gray-300 ${pathname === "/your-stories" ? "text-white font-bold" : ""}`}>Your Stories</Link>
            </li>
            <li>
              <Link to="/watch-stories" className={`hover:text-gray-300 ${pathname === "/watch-stories" ? "text-white font-bold" : ""}`}>Watch Stories</Link>
            </li>
            <li>
              <Link to="/contact" className={`hover:text-gray-300 ${pathname === "/contact" ? "text-white font-bold" : ""}`}>Contact Us</Link>
            </li>
          </ul>
        </div>

        {/* Right Section - Buy Me A Coffee */}
        <div className="flex justify-end items-center w-1/3">
          <a href="#" className="w-10 h-8">
            <img src={coffeeLogo} alt="Buy Me A Coffee" className="invert object-contain h-full" />
          </a>
        </div>
      </nav>

      {/* Bottom Navbar for Mobile */}
      <nav className="fixed bottom-0 w-full md:hidden z-50 backdrop-blur-lg bg-white/10 border-t border-white/20 shadow-2xl">
        <ul className="flex justify-around items-center py-2 text-white">
          <li>
            <Link to="/" className="flex flex-col items-center text-xs">
              <Home size={22} />
            </Link>
          </li>
          <li>
            <Link to="/your-stories" className="flex flex-col items-center text-xs">
              <BookOpen size={22} />
            </Link>
          </li>
          <li>
            <Link to="/watch-stories" className="flex flex-col items-center text-xs">
              <Video size={22} />
            </Link>
          </li>
          <li>
            <Link to="/contact" className="flex flex-col items-center text-xs">
              <Phone size={22} />
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;