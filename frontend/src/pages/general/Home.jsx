import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../../context/AuthContext'
import {toast} from 'react-toastify'
const Home =  () => {
    const navigate = useNavigate()
    const [ videos, setVideos ] = useState([])
    
    const [videosLoading, setVideosLoading] = useState(true);
    const { isAuthenticated, role, loading } = useAuth()
    // console.log("Role ",role)
    // console.log("Role ",isAuthenticated)

    

    useEffect(() => {
        setVideosLoading(true);
        
        axios.get(`${import.meta.env.VITE_API_URL}/api/food/get-Items`, { withCredentials: true })
            .then(response => {

                // console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch((error) => { console.log(error) })
            .finally(() => {
                setVideosLoading(false);
            })
    }, [])


      
 

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    async function likeVideo(item) {

         if(role != 'user' ){
            navigate('/user/login')
            toast.error("Login as a User ")
            return;
         }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/like`, { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            // console.log("Video liked");
            toast.success("Video Liked")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            // console.log("Video unliked");
            toast.success("Video Unliked")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {

         if(role != 'user'){
            navigate('/user/login')
            toast.error("Login as a User ")
            return;
         }
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/save`, { foodId: item._id }, { withCredentials: true })
        // console.log("Response ",response)
        if(response.data.save){
            toast.success("Video Saved ")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            toast.success("Video Unsaved ")
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    // Show loader while videos are loading
    if (videosLoading) {
        return (
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
        );
    }

    return (
       
        <ReelFeed
            items={videos}
            onLike={likeVideo}
            onSave={saveVideo}
            emptyMessage="No videos available."
        />
        
    )
}

export default Home