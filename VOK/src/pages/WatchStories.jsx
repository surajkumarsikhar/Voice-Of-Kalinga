import React, { useEffect, useState } from "react";
import axios from "axios";
import dhauli from "../assets/dhauli.png"
const baseURL = import.meta.env.VITE_API_BASE_URL;

// Skeleton card while loading
const SkeletonVideo = () => (
  <div className="bg-black/60 border border-white/10 rounded-xl shadow-md animate-pulse aspect-[9/16] backdrop-blur-md scale-95" />
);

// Cloudinary video card
const CloudinaryVideo = ({ url, created_at }) => (
  <div className="bg-black/60 border border-white/10 rounded-xl shadow-lg overflow-hidden scale-95 backdrop-blur-md">
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
    <div className="text-xs text-white/60 p-2">
      <p>{new Date(created_at).toLocaleDateString()}</p>
    </div>
  </div>
);

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
    <div
      className="min-h-screen bg-black relative overflow-hidden text-white px-4 py-20 font-nunito"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={dhauli}
          alt="Dhauligiri"
          className="w-full h-full object-cover object-center opacity-30 invert"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      </div>

      {/* Main content */}
      <div className="relative z-10">
        <h1 className="text-4xl md:text-6xl text-center font-bold mb-8 mt-8">
          Watch Stories
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
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
