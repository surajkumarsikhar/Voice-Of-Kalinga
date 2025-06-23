import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  House,
  Books,
  PlayCircle,
  PhoneCall,
} from "phosphor-react";
import vokLogo from "../assets/logo.png";
import coffeeLogo from "../assets/buymeacoffee.svg";

const Navbar = () => {
  const { pathname } = useLocation();

  const navItems = [
    { path: "/", label: "Home", icon: <House size={24} weight="duotone" /> },
    { path: "/your-stories", label: "Your Stories", icon: <Books size={24} weight="duotone" /> },
    { path: "/watch-stories", label: "Watch Stories", icon: <PlayCircle size={24} weight="duotone" /> },
    { path: "/contact", label: "Contact Us", icon: <PhoneCall size={24} weight="duotone" /> },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 md:hidden bg-white/10 backdrop-blur-xl border border-white/10 shadow-lg rounded-full px-6 py-2 w-[90%]">
        <ul className="flex justify-between items-center">
          {navItems.map((item) => (
            <li key={item.path} className="flex-1 text-center">
              <Link
                to={item.path}
                className={`flex flex-col items-center text-xs gap-1 ${
                  pathname === item.path ? "text-white font-semibold" : "text-white/60"
                }`}
              >
                {item.icon}
                <span className="text-[10px]">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Desktop Navbar */}
      <nav className="hidden md:flex fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-[94%] bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-2xl px-6 py-4 justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={vokLogo} alt="VOK" className="h-8 w-auto object-contain" />
        </Link>

        {/* Nav Links */}
        <ul className="flex gap-8 items-center text-white font-medium text-lg tracking-wide pr-12">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`transition-all hover:text-gray-300 ${
                  pathname === item.path ? "font-bold text-white" : "text-white/70"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Coffee Button */}
        <a href="https://coff.ee/surajkumarsikhar" target="_blank" rel="noopener noreferrer">
          <img src={coffeeLogo} alt="Buy Me A Coffee" className="h-8 w-auto invert" />
        </a>
      </nav>
    </>
  );
};

export default Navbar;
