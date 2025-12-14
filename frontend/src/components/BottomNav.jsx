import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import '../styles/bottom-nav.css'
import {useAuth} from "../context/AuthContext"
const BottomNav = () => {
  
  const { isAuthenticated, role, loading } = useAuth()
   if (loading) return null
  return (
    <nav className="bottom-nav" role="navigation" aria-label="Bottom">
      <div className="bottom-nav__inner">
        <NavLink to="/" end className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 10.5 12 3l9 7.5"/>
              <path d="M5 10v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V10"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Home</span>
        </NavLink>

        <NavLink to="/saved" className={({ isActive }) => `bottom-nav__item ${isActive ? 'is-active' : ''}`}>
          <span className="bottom-nav__icon" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z"/>
            </svg>
          </span>
          <span className="bottom-nav__label">Saved</span>
        </NavLink>

      
    {!loading && (
      isAuthenticated ? (
        role === 'user' ? (
          <NavLink
            to="/user/profile"
            className={({ isActive }) =>
              `bottom-nav__item ${isActive ? 'is-active' : ''}`
            }
          >
            <span className="bottom-nav__icon" aria-hidden="true">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="8" r="5" />
                <path d="M20 21a8 8 0 1 0-16 0" />
              </svg>
            </span>
            <span className="bottom-nav__label">Profile</span>
          </NavLink>
        ) : (
          <>
            <NavLink
              to="/create-food"
              className={({ isActive }) =>
                `bottom-nav__item ${isActive ? 'is-active' : ''}`
              }
            >
              <span className="bottom-nav__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </span>
              <span className="bottom-nav__label">Create</span>
            </NavLink>

            <NavLink
              to="/food/profile"
              className={({ isActive }) =>
                `bottom-nav__item ${isActive ? 'is-active' : ''}`
              }
            >
              <span className="bottom-nav__icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="5" />
                  <path d="M20 21a8 8 0 1 0-16 0" />
                </svg>
              </span>
              <span className="bottom-nav__label">Profile</span>
            </NavLink>
          </>
        )
      ) : (
        <NavLink
          to="/user/login"
          className={({ isActive }) =>
            `bottom-nav__item ${isActive ? 'is-active' : ''}`
          }
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
              <polyline points="10 17 15 12 10 7" />
              <line x1="15" y1="12" x2="3" y2="12" />
            </svg>
          </span>
          <span className="bottom-nav__label">Sign in</span>
        </NavLink>
      )
    )}


      </div>
    </nav>
  )
}

export default BottomNav