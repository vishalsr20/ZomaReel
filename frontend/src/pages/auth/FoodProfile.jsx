import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../../styles/foodProfile.css'
import { Link } from 'react-router-dom'
export default function FoodPartnerProfile() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/food/profile`, {
          withCredentials: true
        })
        setData(res.data.user)
      } catch (err) {
        console.error('Failed to fetch food partner profile', err)
        setError(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner" />
        <p>Loading profile...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="profile-error">
        Failed to load profile. Please login or try again later.
      </div>
    )
  }

  if (!data) return null

  const { partner, foodItem } = data

  const getInitials = (name) => {
    if (!name) return 'FP'
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  const totals = {
    videos: Array.isArray(foodItem) ? foodItem.length : 0,
    likes: Array.isArray(foodItem) ? foodItem.reduce((s, f) => s + (f.likeCount || 0), 0) : 0,
    saves: Array.isArray(foodItem) ? foodItem.reduce((s, f) => s + (f.savesCount || 0), 0) : 0,
    comments: Array.isArray(foodItem) ? foodItem.reduce((s, f) => s + ((f.comments && f.comments.length) || 0), 0) : 0
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Header Section */}
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-circle">
              {getInitials(partner?.name)}
            </div>
            <div className="avatar-glow" />
          </div>
          <h1 className="profile-name">{partner?.name || 'Food Partner'}</h1>
          <p className="profile-email">{partner?.email || ''}</p>
          <p className="profile-contact">{partner?.phone || ''}</p>
          <p className="profile-address">{partner?.address || ''}</p>
        </div>

        {/* Stats Section */}
        <div className="profile-stats">
          <div className="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 22l7.8-8.6 1-1a5.5 5.5 0 0 0 0-7.8z" />
            </svg>
            <div className="stat-info">
              <span className="stat-value text-green-500">{totals.likes}</span>
              <span className="stat-label">Likes</span>
            </div>
          </div>

          <div className="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
            </svg>
            <div className="stat-info">
              <span className="stat-value text-red-500">{totals.saves}</span>
              <span className="stat-label">Saved</span>
            </div>
          </div>

          <div className="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
            </svg>
            <div className="stat-info">
              <span className="stat-value">{totals.comments}</span>
              <span className="stat-label">Comments</span>
            </div>
          </div>

          <div className="stat-card">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
            <div className="stat-info">
              <span className="stat-value text-blue-500">{totals.videos}</span>
              <span className="stat-label">Videos</span>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="profile-actions">
          <button className="action-btn action-btn-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Edit Profile
          </button>

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
          <Link to={'/food-items'} >
          <button className="menu-item">
            <div className="menu-item-content">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
                <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              
              <span>My Food Items</span>
             
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
           </Link>

          <button className="menu-item">
            <div className="menu-item-content">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
              <span>Restaurant Details</span>
            </div>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          <button className="menu-item">
            <div className="menu-item-content">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              <span>Revenue Analytics</span>
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

        {/* Food Items Grid */}
        {Array.isArray(foodItem) && foodItem.length > 0 && (
          <div className="food-items-section">
            <h2 className="section-title">Food Items</h2>
            <div className="profile-grid">
              {foodItem.map(item => (
                <article 
                  key={item._id} 
                  className="profile-grid-item"
                  onClick={() => window.open(item.video, '_blank')}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="profile-grid-video">
                    <video
                      className="grid-video-el"
                      src={item.video}
                      controls={false}
                      muted
                      preload="metadata"
                      playsInline
                    />
                    <div className="grid-overlay">
                      <div className="grid-title">{item.name}</div>
                      <div className="grid-stats">
                        <span>❤️ {item.likeCount || 0}</span>
                        <span>💾 {item.savesCount || 0}</span>
                        <span>💬 {(item.comments && item.comments.length) || 0}</span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}