import React, { useEffect, useState } from 'react'
import '../../styles/reels.css'
import axios from 'axios'
import ReelFeed from '../../components/ReelFeed'
import { useAuth } from '../../context/AuthContext'
import {toast} from 'react-toastify'
const Saved = () => {
    const { isAuthenticated, role, loading: authLoading } = useAuth()
    const [ videos, setVideos ] = useState([])
    const [loading , setLoading] = useState(true)


    if (authLoading) return null

    if (role !== 'user') {
        toast.info("Login as a user")
    return <Navigate to="/" replace />
    }

     

    useEffect(() => {
        setLoading(true)
        axios.get(`${import.meta.env.VITE_API_URL}/api/food/save`, { withCredentials: true })
            .then(response => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likeCount: item.food.likeCount,
                    savesCount: item.food.savesCount,
                    commentsCount: item.food.commentsCount,
                    foodPartner: item.food.foodPartner,
                }))
                
                setVideos(savedFoods)
            })
            .finally( () => setLoading(false))
    }, [])

    const removeSaved = async (item) => {
        try {
            toast.success("Video Unsaved")
            await axios.post(`${import.meta.env.VITE_API_URL}/api/food/save`, { foodId: item._id }, { withCredentials: true })
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: Math.max(0, (v.savesCount ?? 1) - 1) } : v))
        } catch {
            // noop
        }
    }

    return (
        <>
        {loading ?
        (
             <div style={{
                minHeight: '100vh',
                background: '#000',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Animated Background */}
                <div style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'radial-gradient(circle at 20% 30%, rgba(100, 200, 255, 0.15) 0%, transparent 40%), radial-gradient(circle at 80% 70%, rgba(255, 100, 200, 0.15) 0%, transparent 40%)',
                    backgroundSize: '200% 200%',
                    animation: 'float 15s ease-in-out infinite',
                    opacity: 0.6,
                    pointerEvents: 'none',
                    zIndex: 0
                }}></div>

                {/* Spinner */}
                <div style={{
                    width: '50px',
                    height: '50px',
                    border: '4px solid rgba(255, 255, 255, 0.1)',
                    borderTopColor: '#4fc3f7',
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite',
                    position: 'relative',
                    zIndex: 1
                }}></div>
                
                <p style={{
                    color: '#fff',
                    fontSize: '18px',
                    fontWeight: '500',
                    position: 'relative',
                    zIndex: 1
                }}>Loading delicious videos...</p>

                <style>{`
                    @keyframes spin {
                        to { transform: rotate(360deg); }
                    }
                    @keyframes float {
                        0%, 100% {
                            background-position: 0% 0%;
                        }
                        50% {
                            background-position: 100% 100%;
                        }
                    }
                `}</style>
            </div>
        )
         :
        (
            <ReelFeed
            items={videos}
            onSave={removeSaved}
            emptyMessage="No saved videos yet."
        />
        )
        }
        
        </>
    )
}

export default Saved