import React, { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TextPressure from "../style/TextPressure";
import vok_ani from "../assets/videos/vok_ani.mp4";

gsap.registerPlugin(ScrollTrigger);

const Icube = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);
  const [vh, setVh] = useState(window.innerHeight);

  useEffect(() => {
    const updateHeight = () => {
      setVh(window.innerHeight);
    };
    window.addEventListener("resize", updateHeight);
    updateHeight();

    const el = sectionRef.current;
    const text = textRef.current;
    const video = videoRef.current;

    const isMobile = window.innerWidth < 640;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: "top top",
        end: isMobile ? "top -100%" : "top -150%",
        scrub: true,
        pin: true,
      },
    });

    // Text animation
    tl.fromTo(text, { x: "100vw" }, { x: "-100vw", ease: "none" }, 0);

    // Video animation
    if (video) {
      tl.fromTo(
        video,
        {
          scale: 1,
          opacity: 0.5,
          filter: "brightness(0.7) contrast(1.2)",
        },
        {
          scale: 1.1,
          opacity: 0.15,
          filter: "brightness(1) contrast(1)",
          ease: "none",
        },
        0
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      window.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      style={{ height: `${vh}px` }}
      className="w-full flex items-center justify-center bg-black overflow-hidden relative"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={vok_ani} />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for contrast */}
        <div className="absolute -inset-1 bg-black/30"></div>
        {/* Blur gradient top & bottom */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black via-black/50 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black via-black/50 to-transparent pointer-events-none"></div>
      </div>

      {/* Foreground Moving Text */}
      <div ref={textRef} className="w-full z-10 relative">
        {/* Glow effect behind text */}
        <div className="absolute inset-0 blur-sm opacity-30">
          <TextPressure
            text="INITIATE . INFLUENCE . INSPIRE"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ffffff"
            minFontSize={36}
          />
        </div>

        {/* Main Text */}
        <div className="flex items-center justify-center">
          <TextPressure
            text="INITIATE . INFLUENCE . INSPIRE"
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ffffff"
            minFontSize={36}
          />
        </div>
      </div>

      {/* Twinkling White Particles */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Keyframes */}
      <style jsx>{`
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Icube;
