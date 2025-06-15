import React,{useEffect,useRef} from "react";
import ScrollReveal from "../style/ScrollReveal";
import konarkWheel from "../assets/konark-wheel.png";
import { gsap } from "gsap";

const Ourvision = () => {
  const wheelRef = useRef(null);

  useEffect(() => {
    if (wheelRef.current) {
      gsap.to(wheelRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "linear",
        transformOrigin: "50% 50%",
      });
    }
  }, []);
  return (
    <div
      id="vision"
      className="relative min-h-screen w-full bg-black px-4 text-white flex items-center justify-center pt-55"
    >
      <img
        ref={wheelRef}
        src={konarkWheel}
        alt="Konark Wheel"
        className="absolute z-0 opacity-10 w-[90%] md:w-[60%] max-w-[700px] object-contain"
        style={{ top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}
      />
      {/* Absolute Heading */}
      <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-3xl md:text-6xl md:pt-15 sm:pt-24 font-nunito font-bold text-center z-20 pt-15 lg:pt-25">
        OUR VISION
      </h1>

      {/* ScrollReveal Content Box */}
      <div className="absolute w-full max-w-7xl px-6 md:p-10 -mt-25 rounded-3xl bg-black/10 shadow-xl z-10">
        <ScrollReveal
          baseOpacity={0}
          enableBlur={true}
          baseRotation={5}
          blurStrength={10}
          containerClassName="text-white text-center whitespace-pre-wrap"
        >
          {`At Voice of Kalinga, we believe that every unheard voice carries the weight of a thousand untold stories. While the world tunes in to curated conversations and polished podcasts, we choose to walk the dusty streets, sit on paan-stained benches, and stand beside those who hustle under the open sky.
          
Our vision is to be the echo of the everyday warrior — the street vendor, the artisan, the tea-seller, the busker, the dreamer. We aim to capture the raw, real, and rooted essence of Odisha through on-ground storytelling that doesn’t just inform, but transforms.
          
We don’t wait for stories to come to us — we go where they are born. Starting from reels, we're building toward full-length documentaries and original series that dive deep into the heart of our land — unfiltered, unedited, unforgettable. Voice of Kalinga isn’t just a brand; it’s a revolution in storytelling. A movement to make the invisible visible, the unheard unforgettable.
          
Because the streets speak.
And we listen.`}
        </ScrollReveal>
      </div>
    </div>
  );
};

export default Ourvision;
