import React, { useState, useEffect } from 'react'
import '../../styles/profile.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const Profile = () => {
    const { id } = useParams()
    const [ profile, setProfile ] = useState(null)
    const [ videos, setVideos ] = useState([])
    const [loading , setLoading] = useState(false)
    console.log(id)

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



    return (
        <main className="profile-page">
            <section className="profile-header">
                <div className="profile-meta">

                    <img className="profile-avatar" src="https://images.unsplash.com/photo-1754653099086-3bddb9346d37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw0Nnx8fGVufDB8fHx8fA%3D%3D" alt="" />

                    <div className="profile-info">
                        <h1 className="profile-pill profile-business" title="Business name">
                            {profile?.name}
                        </h1>
                        <p className="profile-pill profile-address" title="Address">
                            {profile?.address}
                        </p>
                    </div>
                </div>

                <div className="profile-stats" role="list" aria-label="Stats">
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">total meals</span>
                        <span className="profile-stat-value">{profile?.foodItems.length}</span>
                    </div>
                    <div className="profile-stat" role="listitem">
                        <span className="profile-stat-label">customer served</span>
                        <span className="profile-stat-value">{profile?.foodItems?.reduce((sum, item) => sum + item.likeCount + item.savesCount, 0)}</span>
                    </div>
                </div>
            </section>

            <hr className="profile-sep" />

         <section className="profile-grid" aria-label="Videos">
                {videos.map((v) => (
                    <div key={v._id} className="profile-grid-item">
                    <video
                        className="profile-grid-video"
                        src={v.video}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        
                    />
                    </div>
                ))}
                </section>

        </main>
    )
}

export default Profile