import React from "react";
import { FaInstagram, FaYoutube, FaXTwitter } from "react-icons/fa6"; // FaXTwitter is the new official icon for X (Twitter)

const socialLinks = [
  {
    name: "Instagram",
    icon: <FaInstagram size={24} />,
    url: "https://instagram.com/yourhandle",
  },
  {
    name: "YouTube",
    icon: <FaYoutube size={24} />,
    url: "https://youtube.com/yourchannel",
  },
  {
    name: "X (Twitter)",
    icon: <FaXTwitter size={24} />,
    url: "https://x.com/yourhandle",
  },
];

const HandlesSection = () => {
  return (
    <section className="py-12 bg-white/5 backdrop-blur-md text-white">
      <h2 className="text-3xl font-bold text-center mb-8 font-nunito">
        Follow Us
      </h2>

      <div className="flex justify-center gap-10 flex-wrap">
        {socialLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-white/10 rounded-full hover:bg-white/10 transition-all font-nunito"
          >
            {link.icon}
            <span className="text-lg">{link.name}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default HandlesSection;
