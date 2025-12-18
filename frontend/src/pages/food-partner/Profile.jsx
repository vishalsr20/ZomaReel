import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Heart, Bookmark, MessageCircle, MapPin } from 'lucide-react'

const Profile = () => {
    const { id } = useParams()
    const [profile, setProfile] = useState(null)
    const [videos, setVideos] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true)
                const res = await axios.get(
                    `${import.meta.env.VITE_API_URL}/api/food-partner/${id}`,
                    { withCredentials: true }
                )
                setProfile(res.data.foodPartner)
                setVideos(res.data.foodPartner.foodItems || [])
            } catch (err) {
                console.error(err)
                setError('Failed to load profile')
            } finally {
                setLoading(false)
            }
        }

        fetchProfile()
    }, [id])

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center">
                <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
                <p className="text-white mt-4 text-lg">Loading profile...</p>
            </div>
        )
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center px-4">
                    <p className="text-red-500 text-lg">{error}</p>
                </div>
            </div>
        )
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
            <div className="relative z-10 px-4 py-6">
                {/* Profile Header */}
                <div className="mb-6">
                    <div className="flex items-start gap-4 mb-6">
                        <img 
                            className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-2 border-purple-500/50 shadow-lg shadow-purple-500/20" 
                            src={profile?.profileImage || "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"} 
                            alt="Profile" 
                        />

                        <div className="flex-1 min-w-0">
                            <h1 className="text-2xl font-bold text-white mb-2 truncate">
                                {profile?.name}
                            </h1>
                            <p className="text-white/70 text-sm flex items-start gap-1">
                                <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
                                <span className="break-words">{profile?.address}</span>
                            </p>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
                            <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Total Meals</p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                                {profile?.foodItems?.length || 0}
                            </p>
                        </div>
                        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-4 text-center">
                            <p className="text-xs text-white/60 uppercase tracking-wide mb-1">Customers Served</p>
                            <p className="text-2xl font-bold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
                                {profile?.foodItems?.reduce((sum, item) => sum + item.likeCount + item.savesCount, 0) || 0}
                            </p>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-white/10 mb-6"></div>

                    {/* Video Grid */}
                    <div>
                        <h2 className="text-xl font-bold text-white mb-4">Food Items</h2>
                        {videos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
                                    <p className="text-white/60 text-sm">No food items available yet</p>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 mb-20">
                                {videos.map((food) => (
                                    <div
                                        key={food._id}
                                        className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/20 transition-all duration-300"
                                    >
                                        {/* Video Container */}
                                        <div className="relative aspect-[4/5] bg-black overflow-hidden">
                                            <video
                                                src={food.video}
                                                className="w-full h-full object-cover"
                                                playsInline
                                                preload="metadata"
                                            />
                                            
                                            {/* Overlay Gradient */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>

                                            {/* Play Icon */}
                                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                <div className="bg-white/10 backdrop-blur-md rounded-full p-3">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Stats Overlay - Right Side */}
                                            <div className="absolute right-2 bottom-16 flex flex-col gap-3">
                                                <div className="flex flex-col items-center gap-1 text-white">
                                                    <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-md">
                                                        <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                                                    </div>
                                                    <span className="text-xs font-semibold">{food.likeCount}</span>
                                                </div>
                                                
                                                <div className="flex flex-col items-center gap-1 text-white">
                                                    <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-md">
                                                        <Bookmark className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                                                    </div>
                                                    <span className="text-xs font-semibold">{food.savesCount}</span>
                                                </div>
                                                
                                                <div className="flex flex-col items-center gap-1 text-white">
                                                    <div className="p-1.5 rounded-full bg-white/10 backdrop-blur-md">
                                                        <MessageCircle className="w-4 h-4" />
                                                    </div>
                                                    <span className="text-xs font-semibold">{food.comments?.length || 0}</span>
                                                </div>
                                            </div>

                                            {/* Bottom Info */}
                                            <div className="absolute bottom-0 left-0 right-0 p-3 ">
                                                <h3 className="text-white font-bold text-sm mb-1 line-clamp-1">
                                                    {food.name}
                                                </h3>
                                                <p className="text-white/70 text-xs line-clamp-2 ">
                                                    {food.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile