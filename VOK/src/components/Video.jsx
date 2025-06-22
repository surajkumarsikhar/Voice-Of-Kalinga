import React, { useRef } from "react";
import vok from "../assets/vok.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const isMobile = window.innerWidth < 640;

    // Pin the video section
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: isMobile ? "+=65 %" : "+=150%",
      pin: true,
      scrub: true,
    });

    // Animate logo
    gsap.from("#logo", {
      y: isMobile ? 100 : 200,
      scale: isMobile ? 1 : 0.8,
      opacity: 0,
      scrollTrigger: {
        trigger: "#page",
        start: "top 0%",
        end: isMobile ? "top -40%" : "top -60%",
        scrub: 2,
      },
    });

    // Animate overlay blur
    gsap.fromTo(
      ".overlay",
      {
        opacity: 0.8,
        backdropFilter: "blur(0px)",
        webkitBackdropFilter: "blur(0px)",
      },
      {
        opacity: 1,
        backdropFilter: "blur(10px)",
        webkitBackdropFilter: "blur(10px)",
        ease: "none",
        scrollTrigger: {
          trigger: "#page",
          start: "top 0%",
          end: isMobile ? "top -60%" : "top -130%",
          scrub: 2,
        },
      }
    );

    // Animate motto words
    gsap.utils.toArray(".motto-word").forEach((el, i) => {
      gsap.from(el, {
        y: 100,
        opacity: 0,
        scrollTrigger: {
          trigger: "#page",
          start: isMobile ? `${2 + i * 4}% top` : `${13 + i * 4}% top`,
          end: isMobile ? `${5 + i * 2}% end` : `${15 + i * 2}% end`,
          scrub: 2,
        },
      });
    });
4
    // Animate the "Nominate a Hero" button
    gsap.from("#nominate-btn",{
      y: 100,
      opacity: 0,
      scrollTrigger: {
        trigger: "#page",
        start: isMobile ? "top -30%" : "top -140%",
        end: isMobile ? "top -60%" : "top -120%",
        scrub: 2,
      },
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative min-h-screen w-full" id="page">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full z-0">
        <video
          src={vok}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full min-h-screen object-cover"
        />
      </div>

      {/* Overlay */}
      <div className="overlay absolute -inset-1 z-20 bg-black/80 sm:bg-black/90 backdrop-blur-sm sm:backdrop-blur-none" />

      {/* Logo + Motto + CTA */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-6 sm:gap-6 px-4 text-center pt-16 sm:pt-0">
        {/* Logo */}
        <h1
          id="logo"
          className="text-white text-[4rem] sm:text-[7rem] md:text-[9rem] lg:text-[10rem] font-bold drop-shadow-xl leading-none tracking-tight"
        >
          VOK
        </h1>

        {/* Motto */}
        <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-1 sm:gap-2 text-white text-lg sm:text-xl md:text-2xl lg:text-3xl font-quicksand">
          <span className="motto-word">Unheard Stories,</span>
          <span className="motto-word">Documented Voices.</span>
        </div>

        {/* CTA Button */}
     <a
  id="nominate-btn"
  href="/nominate"
  className="mt-4 sm:mt-6 px-6 py-2 sm:py-3 sm:px-8 rounded-full border border-white text-white font-semibold text-base sm:text-lg 
             hover:bg-white hover:text-black scale-100 hover:scale-105"
>
  Nominate a Hero
</a>

      </div>
    </div>
  );
};

export default Video;
