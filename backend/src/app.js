// app.js
require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const helmet = require('helmet'); // optional but recommended

const userRoutes = require('../src/routes/auth.routes');
const foodRoutes = require('../src/routes/food.routes');
const foodPartnerRoutes = require('../src/routes/food-partner.routes');

const app = express();


app.set('trust proxy', 1);


app.use(helmet());


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || 'http://localhost:5173';

app.use(cors({
  origin: FRONTEND_ORIGIN,
  credentials: true,
}));


app.use(cookieParser());


app.get('/', (req, res) => {
  res.send("Hello Jee Kaise ho app log");
});


app.use('/api/auth', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);

module.exports = app;
