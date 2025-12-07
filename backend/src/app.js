// create a server
const dotenv = require('dotenv') 
dotenv.config()

const express =  require('express')
const cookieParser = require('cookie-parser')
const userRoutes = require('../src/routes/auth.routes')

const app = express()
app.use(express.json())
app.use(cookieParser())


app.use('/api/auth',userRoutes)

module.exports = app