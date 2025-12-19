import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import ChooseRegister from '../pages/auth/ChooseRegister'
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'

import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood'
import Profile from '../pages/food-partner/Profile'
import Saved from '../pages/general/Saved'
import UserProfile from '../pages/auth/UserProfile'
import FoodProfile from '../pages/auth/FoodProfile'
import LikedVideo from '../pages/general/LikedVideo'
import UserEditProfile from '../pages/auth/UserEditProfile'

import BottomNav from '../components/BottomNav'
import ProtectedRoute from './ProtectedRoute'
import HelpAndSupport from '../pages/general/HelpAndSupport'
import ViewFoodItem from '../pages/food-partner/ViewFoodItem'

const AppRoutes = () => {
  return (
    <Router>
      {/* ALL ROUTES */}
      <Routes>

        {/* PUBLIC ROUTES */}
        <Route path="/register" element={<ChooseRegister />} />
        <Route path="/user/register" element={<UserRegister />} />
        <Route path="/user/login" element={<UserLogin />} />
        <Route path="/food-partner/register" element={<FoodPartnerRegister />} />
        <Route path="/food-partner/login" element={<FoodPartnerLogin />} />
        <Route path='/contactAndSupport' element={<HelpAndSupport/>} />

        {/* GENERAL ROUTES */}
        <Route path="/" element={<Home />} />
        <Route path="/food-partner/:id" element={<Profile />} />

        {/* USER PROTECTED ROUTES */}
        <Route
          path="/saved"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <Saved />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/profile"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/edit"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <UserEditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-liked-video"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <LikedVideo />
            </ProtectedRoute>
          }
        />

        {/* FOOD PARTNER PROTECTED ROUTES */}
        <Route
          path="/create-food"
          element={
            <ProtectedRoute allowedRoles={['food']}>
              <CreateFood />
            </ProtectedRoute>
          }
        />

        <Route
          path="/food/profile"
          element={
            <ProtectedRoute allowedRoles={['food']}>
              <FoodProfile />
            </ProtectedRoute>
          }
        />
        <Route
        path='/food-items'
        element={
          <ProtectedRoute allowedRoles={['food']} >
            <ViewFoodItem/>
          </ProtectedRoute>
        }
        />

      </Routes>

      {/* ✅ BOTTOM NAV — PRESENT EVERYWHERE */}
      <BottomNav />
    </Router>
  )
}

export default AppRoutes
