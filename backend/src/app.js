// create a server
const dotenv = require('dotenv') 
dotenv.config()
const express =  require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('../src/routes/auth.routes')
const foodRoutes = require('../src/routes/food.routes')
const foodPartnerRoutes = require('../src/routes/food-partner.routes')
const cors = require('cors');

const app = express()
app.use(express.json())
app.use(cookieParser())

app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))

app.get('/',(req, res) => {
    res.send("Hello Jee Kaise ho app log")
})

app.use('/api/auth',userRoutes)
app.use('/api/food',foodRoutes)
app.use('/api/food-partner',foodPartnerRoutes)

module.exports = app