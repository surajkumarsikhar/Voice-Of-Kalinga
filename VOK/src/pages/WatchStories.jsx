import React, { useEffect, useState } from "react";
import axios from "axios";
import dhauli from "../assets/dhauli.png";
import { Heart, Share } from "phosphor-react";

const baseURL = import.meta.env.VITE_API_BASE_URL;

// Skeleton loader while videos are loading
const SkeletonVideo = () => (
  <div className="bg-black/60 border border-white/10 rounded-xl shadow-md animate-pulse aspect-[9/16] backdrop-blur-md scale-95" />
);

// Single video card with like and share
const CloudinaryVideo = ({ url, created_at }) => {
  const [likes, setLikes] = useState(0);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Voice of Kalinga Story",
          text: "Check out this inspiring story!",
          url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-black/60 border border-white/10 rounded-xl shadow-lg overflow-hidden scale-95 backdrop-blur-md flex flex-col">
      <video
        className="w-full aspect-[9/16] rounded-xl"
        controls
        playsInline
        muted
        preload="metadata"
      >
        <source src={url} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="flex justify-between items-center px-4 py-2 text-white/70 text-xs">
        <span>{new Date(created_at).toLocaleDateString()}</span>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setLikes(likes + 1)}
            className="flex items-center gap-1 hover:scale-110 transition"
          >
            <Heart size={20} weight="fill" className="text-red-500" />
            <span>{likes}</span>
          </button>
          <button
            onClick={handleShare}
            className="hover:scale-110 transition"
            title="Share"
          >
            <Share size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

const WatchStories = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await axios.get(`${baseURL}/cloudinary-videos`);
        setVideos(res.data.resources);
      } catch (err) {
        console.error("Failed to fetch Cloudinary videos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-black relative overflow-hidden text-white px-4 py-20 font-nunito">
      {/* Background Image + overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={dhauli}
          alt="Dhauligiri"
          className="w-full h-full object-cover object-center opacity-30 invert"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Main Content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl text-center font-bold mb-8 md:mt-8">
          Watch Stories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto px-2 sm:px-4">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonVideo key={i} />)
            : videos.map((video, index) => (
                <CloudinaryVideo
                  key={index}
                  url={video.url}
                  created_at={video.created_at}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default WatchStories;
