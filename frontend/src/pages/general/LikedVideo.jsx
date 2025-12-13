import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heart, Bookmark, MessageCircle, ArrowLeft } from "lucide-react";

const LikedVideo = () => {
  const [likedVideos, setLikedVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLikedVideos = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user/mylike`,
          {
            withCredentials: true,
          }
        );
        console.log("res", res);
        setLikedVideos(res.data.likedVideos);
      } catch (err) {
        console.error("Failed to fetch liked videos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedVideos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
        <p className="text-white mt-4 text-lg">Loading your favorites...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20 animate-pulse"></div>
      <div className="fixed inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="p-3 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 hover:bg-white/10 transition-all"
          >
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Heart className="w-10 h-10 text-red-500 fill-red-500" />
              My Liked Videos
            </h1>
            <p className="text-white/60 mt-2">{likedVideos.length} videos saved</p>
          </div>
        </div>

        {likedVideos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-12 text-center max-w-md">
              <Heart className="w-20 h-20 text-white/30 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">No liked videos yet</h2>
              <p className="text-white/60">Start exploring and save your favorite recipes!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedVideos.map((item) => {
              const food = item.food;

              return (
                <div
                  key={item._id}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/50 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-2"
                >
                  {/* Video Container */}
                  <div className="relative aspect-[4/5] bg-black overflow-hidden">
                    <video
                      src={food.video}
                      className="w-full h-full object-cover"
                      poster={food.thumbnail}
                      controls
                    />
                    
                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                    {/* Stats Overlay - Right Side (TikTok style) */}
                    <div className="absolute right-3 bottom-20 flex flex-col gap-4">
                      <div className="flex flex-col items-center gap-1 text-white">
                        <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                          <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                        </div>
                        <span className="text-sm font-semibold">{food.likeCount}</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1 text-white">
                        <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                          <Bookmark className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                        </div>
                        <span className="text-sm font-semibold">{food.savesCount}</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-1 text-white">
                        <div className="p-2 rounded-full bg-white/10 backdrop-blur-md">
                          <MessageCircle className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-semibold">{food.comments.length}</span>
                      </div>
                    </div>

                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-1">
                        {food.name}
                      </h3>
                      <p className="text-white/80 text-sm line-clamp-2 mb-3">
                        {food.description}
                      </p>
                      
                      <button className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-cyan-500/50">
                        Visit Store
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedVideo;