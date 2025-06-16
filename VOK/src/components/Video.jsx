import React, { useRef } from "react";
import vok from "../assets/vok.mp4";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import logo from "../assets/logo.png"; 

gsap.registerPlugin(ScrollTrigger);

const Video = () => {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      // Pin the section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=140%",
        pin: true,
        scrub: true,
      });

      // Animate logo to center
      gsap.from("#logo", {
        y: 500,
        opacity: 0,
        scrollTrigger: {
          trigger: "#page",
          start: "top 0%",
          end: "top -60%",
          scrub: 2,
        },
      });

      // Animate blur on scroll
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
          end: "top -130%",
          scrub: 2,
        },
      }
    );

      // Animate each word of the motto
      gsap.utils.toArray(".motto-word").forEach((el, i) => {
        gsap.from(el, {
          y: 100,
          opacity: 0,
          scrollTrigger: {
            trigger: "#page",
            start: `${13 + i * 4}% top`,
            end: `${15 + i * 2}% end`,
            scrub: 2,
            markers:true
          },
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <>
      <div ref={containerRef} className="relative h-screen w-full" id="page">
        {/* Background Video */}
        <div className="absolute top-0 left-0 w-full h-full z-0">
          <video
            src={vok}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Black Overlay */}
        <div className="overlay absolute -inset-1 bg-black/90 z-20 backdrop-blur-none" />

        {/* Animated Logo & Motto */}
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 px-4 text-center">
          <h1
            id="logo"
            className="text-white text-[12rem] md:text-[10rem] lg:text-[11rem] font-bold text-center drop-shadow-lg"
          >
            VOK
          </h1>

          <div className="flex flex-wrap justify-center gap-2 text-white text-xl md:text-2xl lg:text-3xl ">
            <span className="motto-word font-quicksand">Unheard Stories,</span>
            {/* <span className="motto-word font-quicksand">Stories,</span> */}
            <span className="motto-word font-quicksand">Documented Voices.</span>
            {/* <span className="motto-word font-quicksand">Voices.</span> */}
          </div>
        </div>
      </div>

      {/* Scrollable Content */}

    </>
  );
};

export default Video;
