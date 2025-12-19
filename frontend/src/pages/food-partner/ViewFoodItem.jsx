import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Heart, Bookmark, MessageCircle, MapPin } from 'lucide-react'

const ViewFoodItem = () => {
  const [foodItems, setFoodItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        setLoading(true)
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/food/foodItem`,
          { withCredentials: true }
        )
        setFoodItems(res.data.foodItems || [])
      } catch (err) {
        console.error(err)
        setError('Failed to load food items')
      } finally {
        setLoading(false)
      }
    }

    fetchFoodItems()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-purple-500 rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    )
  }

  return (
    /* 👇 SCROLL CONTAINER */
    <div
      className="
        h-screen 
        overflow-y-scroll 
        snap-y snap-mandatory 
        scroll-smooth 
        bg-black 
        text-white
      "
    >
      {foodItems.map((food) => (
        /* 👇 SNAP ITEM */
        <div
          key={food._id}
          className="
            relative 
            h-screen 
            w-full 
            snap-start 
            flex 
            items-center 
            justify-center
          "
        >
          {/* Video */}
          <video
            src={food.video}
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Right Actions */}
          <div className="absolute right-4 bottom-32 flex flex-col gap-5 z-10">
            <Action
              icon={<Heart className="w-6 h-6 fill-red-500 text-red-500" />}
              count={food.likeCount}
            />
            <Action
              icon={<Bookmark className="w-6 h-6 fill-yellow-500 text-yellow-500" />}
              count={food.savesCount}
            />
            <Action
              icon={<MessageCircle className="w-6 h-6" />}
              count={food.comments?.length || 0}
            />
          </div>

          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <h2 className="text-xl font-bold mb-1">{food.name}</h2>
            <p className="text-sm text-white/80 mb-3 max-w-xl">
              {food.description}
            </p>

            {/* Partner Info */}
            <div className="flex items-start gap-2 text-white/70 text-sm">
              <MapPin className="w-4 h-4 text-cyan-400 mt-0.5" />
              <div>
                <p className="font-semibold text-white">
                  {food.foodPartner?.name}
                </p>
                <p className="text-xs">{food.foodPartner?.address}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

const Action = ({ icon, count }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="p-3 rounded-full bg-white/10 backdrop-blur-md">
      {icon}
    </div>
    <span className="text-xs font-semibold">{count}</span>
  </div>
)

export default ViewFoodItem
