import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../../styles/reels.css'
import ReelFeed from '../../components/ReelFeed'
import { useNavigate } from 'react-router-dom';

const Home =  () => {
    const navigate = useNavigate()
    const [ videos, setVideos ] = useState([])
      const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [authLoading, setAuthLoading] = useState(true);

   
    // Autoplay beh uavior is handled inside ReelFeed
    
    useEffect(() => {

        

        axios.get(`${import.meta.env.VITE_API_URL}/api/food/get-Items`, { withCredentials: true })
            .then(response => {

                console.log(response.data);

                setVideos(response.data.foodItems)
            })
            .catch((error) => { console.log(error) })
    }, [])


      // Check if user is logged in (user token)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/auth/user/check`,
          { withCredentials: true }
        );

        console.log("auth check:", response.data);

        setIsAuthenticated(response.data.authenticated || false);
      } catch (error) {
        console.error(
          "auth check error",
          error.response?.status,
          error.response?.data || error.message
        );
        setIsAuthenticated(false);
      } finally {
        setAuthLoading(false);
      }
    };

    checkAuth();
  }, []);

    // Using local refs within ReelFeed; keeping map here for dependency parity if needed

    async function likeVideo(item) {

         if (!isAuthenticated) {
            navigate("/user/login");
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/like`, { foodId: item._id }, {withCredentials: true})

        if(response.data.like){
            console.log("Video liked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount + 1 } : v))
        }else{
            console.log("Video unliked");
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, likeCount: v.likeCount - 1 } : v))
        }
        
    }

    async function saveVideo(item) {

         if (!isAuthenticated) {
            navigate("/user/login");
            return;
        }
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/save`, { foodId: item._id }, { withCredentials: true })
        console.log("Response ",response)
        if(response.data.save){
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount + 1 } : v))
        }else{
            setVideos((prev) => prev.map((v) => v._id === item._id ? { ...v, savesCount: v.savesCount - 1 } : v))
        }
    }

    async function fetchComment(item){
      if (!isAuthenticated) {
            navigate("/user/login");
            return;
        }

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/food/comment`, { itemId: item._id }, { withCredentials: true }) 


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