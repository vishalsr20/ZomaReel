// app.js
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const userRoutes = require('../src/routes/auth.routes');
const foodRoutes = require('../src/routes/food.routes');
const foodPartnerRoutes = require('../src/routes/food-partner.routes');

// helper middlewares (create these files as shown earlier)
const attachCookieHelpers = require('./middleware/cookieHelpers');     // res.setAuthCookie / res.clearAuthCookie
const normalizeToken = require('./middleware/normalizeToken');         // copy Bearer -> req.cookies.token (fallback)

const app = express();

// Trust the first proxy (Render, Heroku, etc.) so secure cookies work
app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

// CORS - allow your frontend origin and allow cookies
app.use(cors({
  origin: "https://zomareel-com.onrender.com", // must exactly match your frontend URL
  credentials: true,
}));

// Attach helpers & normalize token BEFORE routes so controllers and auth middleware work consistently
app.use(attachCookieHelpers);
app.use(normalizeToken);

// health
app.get('/', (req, res) => {
  res.send("Hello Jee Kaise ho app log");
});

// Routes
app.use('/api/auth', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;
