
import { GiH2O } from 'react-icons/gi'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import UserRegister from '../pages/auth/UserRegister'
import UserLogin from '../pages/auth/UserLogin'
import ChooseRegister from '../pages/auth/ChooseRegister';
import FoodPartnerRegister from '../pages/auth/FoodPartnerRegister'
import FoodPartnerLogin from '../pages/auth/FoodPartnerLogin'
import Home from '../pages/general/Home'
import CreateFood from '../pages/food-partner/CreateFood';
import Profile from '../pages/food-partner/Profile';
import BottomNav from '../components/BottomNav';
import Saved from '../pages/general/Saved';
import UserProfile from '../pages/auth/UserProfile';
import FoodProfile from '../pages/auth/FoodProfile';
import LikedVideo from '../pages/general/LikedVideo';
import ProtectedRoute from './ProtectedRoute';

const AppRoutes = () => {
  return (
    <>
    <Router>
        <Routes>

            {/* PUBLIC ROUTES  */}
            <Route path="/register" element={<ChooseRegister/>} />
            <Route path='/user/register' element={<UserRegister/>}  />
            <Route path='/user/login' element={<UserLogin/>} />
            <Route path='/food-partner/register' element={ <FoodPartnerRegister/> } />
            <Route path='/food-partner/login'  element={<FoodPartnerLogin/> } />
            <Route path='/'  element={ <><Home/> <BottomNav/> </>} />
            <Route path="/food-partner/:id" element={<Profile />} />

          {/* USER PROTECTED ROUTES */}

          <Route
           path="/saved"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <>
              <Saved />   
              </>
            </ProtectedRoute>
          } />

          <Route 
          path="/user/profile" 
          element={ 
          <ProtectedRoute  allowedRoles={['user']} >
            <UserProfile/>
          </ProtectedRoute>
          
          } />

          <Route 
          path="/user/profile" 
          element={ 
          <ProtectedRoute allowedRoles={['user']}>
            <UserProfile/>
          </ProtectedRoute>
          }/>

          <Route 
          path="/my-liked-video" 
          element={
            <ProtectedRoute allowedRoles={['user']}>
            <LikedVideo/>
            </ProtectedRoute>
            } />

            {/* Food Partner Protected Routes */}
            <Route path="/create-food" 
            element={
            <ProtectedRoute allowedRoles={['food']}>
            <CreateFood />
            </ProtectedRoute>
            } /> 
                       
            <Route path="/food/profile" 
            element={
              <ProtectedRoute>
              <FoodProfile/>
              </ProtectedRoute>
              } />
            

        </Routes>
        <BottomNav />
    </Router>
    </>
  )
}

export default AppRoutes
