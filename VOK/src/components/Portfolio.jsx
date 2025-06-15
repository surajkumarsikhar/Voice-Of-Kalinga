import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import vid1 from "../assets/videos/vid_1.mp4";
import vid2 from "../assets/videos/vid_2.mp4";
import vid3 from "../assets/videos/vid_3.mp4";

gsap.registerPlugin(ScrollTrigger);

const videos = [
  { id: 1, src: vid1, title: "Dola Jatra | Puri" },
  { id: 2, src: vid2, title: "Rural Craftsman | Market Building" },
  { id: 3, src: vid3, title: "Photographer | Ram Mandir" },
];

const Portfolio = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const el = sectionRef.current;

    gsap.fromTo(
      el.querySelectorAll(".video-card"),
      {
        opacity: 0,
        y: 40,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div className="bg-black text-white w-full">
      {/* OUR WORK SECTION */}
      <div
        ref={sectionRef}
        id="work"
        className="min-h-screen w-full px-4 py-20 flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-5xl font-nunito font-bold text-center mb-12">
          STORIES
        </h2>

        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-7xl w-full">
          {videos.map((video) => (
            <div
              key={video.id}
              className="video-card backdrop-blur-md p-5 rounded-2xl shadow-md group transition-transform duration-500 scale-[.975]"
            >
              <div className="relative aspect-[9/16] overflow-hidden rounded-xl">
                <video
                  src={video.src}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition duration-500"
                />
              </div>
              <p className="mt-4 text-center text-lg font-semibold">
                {video.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
