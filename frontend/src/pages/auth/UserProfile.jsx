import React, { useEffect, useState } from 'react'
import { useNavigate,Link } from 'react-router-dom'
import axios from 'axios'
import '../../styles/userProfile.css'

const UserProfile = () => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user/profile`, {
          withCredentials: true
        })
        // console.log("profile",response.data)
        setUser(response.data.user)
      } catch (error) {
        console.error('Failed to fetch profile:', error)
        navigate('/user/login')
      } finally {
        setLoading(false)
      }
    }

    fetchUserProfile()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/user/logout`, {
        withCredentials: true
      })
      
      
      cookieStore.delete("token")
      navigate('/user/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
        <p>Loading profile...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  // Get initials for avatar
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {getInitials(user.fullName)}
            </div>
            <div className="avatar-glow" />
          </div>
          <h1 className="profile-name">{user.fullName }</h1>
          <p className="profile-email">{user.email}</p>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            <div className="stat-info">
              <span 
               className="stat-value text-green-500">{user.likeCount}</span>
              <span className="stat-label  ">Likes</span>
            </div>
          </div>

          <div className="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
            <div className="stat-info">
              <span className="stat-value text-red">{user.saveCount}</span>
              <span className="stat-label">Saved</span>
            </div>
          </div>

          <div className="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
            <div className="stat-info">
              <span className="stat-value text-4xl ">{user.commentCount}</span>
              <span className="stat-label text-4xl text-red-200">Comments</span>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="profile-actions">
          <Link to={'/user/edit'}
          state={{user}}
          >
          <button className="action-btn action-btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </button>
          </Link>

          <button className="action-btn action-btn-secondary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 1v6m0 6v6m8.66-12L15.5 9m-7 0L3.34 7M20.66 17L15.5 15m-7 0l-5.16 2M1 12h6m6 0h6" />
            </svg>
            Settings
          </button>
        </div>

        {/* Menu Section */}
        <div className="profile-menu">
          
          <Link to="/saved" >
          <button className="menu-item" >
            <div className="menu-item-content">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
              </svg>
              <span >My Saved Items</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          </Link>

          <Link to={"/my-liked-video"} >
          <button className="menu-item">
            <div className="menu-item-content">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
              </svg>
              <span>Liked Videos</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
          </Link>

          <button className="menu-item">
            <div className="menu-item-content">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span>Order History</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button className="menu-item">
            <div className="menu-item-content">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 16v-4m0-4h.01" />
              </svg>
              <span>Help & Support</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        {/* Logout Button */}
        <button className="logout-btn mb-10" onClick={handleLogout}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  )
}

export default UserProfile