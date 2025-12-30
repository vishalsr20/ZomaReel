# 🍔 Zomreel – Full Stack Food Reels Platform

Zomreel is a **reels-based food discovery platform** inspired by short-video experiences, where users can discover food items through engaging video reels posted by food partners. The platform supports **role-based authentication**, real-time user interactions, and detailed profile dashboards.

---

## 🚀 Features

### 🔐 Authentication & Authorization

* JWT-based authentication
* **Role-based access control**

  * User
  * Food Partner
* Secure auth middleware for protected routes

---

### 👤 User Features

* Browse food partner stores
* View food reels
* Like, save, and comment on reels
* User profile dashboard displaying:

  * Total liked reels
  * Total saved reels
  * Total comments
  * Engagement history

---

### 🏪 Food Partner Features

* Upload food reels
* Manage food items
* Food partner profile dashboard showing:

  * Uploaded reels
  * Likes and engagement on reels
  * Overall content performance

---

## 🧠 Core Concepts Implemented

* Role-based authentication middleware
* RESTful API design
* Separation of concerns (routes, controllers, middleware)
* Secure protected routes
* User engagement tracking
* Scalable backend architecture

---

## 🛠 Tech Stack

### Frontend

* React
* Modern UI with responsive design

### Backend

* Node.js
* Express.js
* MongoDB with Mongoose
* JWT Authentication

---

## 📁 Project Structure

```
backend/
 ├── controllers/
 ├── middleware/
 ├── models/
 ├── routes/
 ├── config/
 └── server.js

frontend/
 ├── components/
 ├── pages/
 ├── context/
 └── main.jsx
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend directory:

```
PORT=5000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

---

## ▶️ Setup Instructions

### Backend Setup

```bash
cd backend
npm install
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🎯 Learning Outcomes

* Implemented real-world role-based authentication
* Built scalable APIs with protected routes
* Designed dashboards for different user roles
* Handled complex user interactions like likes, saves, and comments

---

## 🔮 Future Enhancements

* Video streaming optimization
* Advanced analytics for food partners
* Search and recommendation system
* Push notifications

---

## 📌 Note

This project was built to simulate a **real-world production-level application**, focusing on clean architecture, security, and scalability.

---

⭐ If you like this project, feel free to give it a star and explore the code!
