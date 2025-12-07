const mongoose = require('mongoose')

function connectDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then( () => {console.log("Database Connected Successfully")})
    .catch( (error) => {console.log("Database Connection Issue ",error)})
}

module.exports = connectDB