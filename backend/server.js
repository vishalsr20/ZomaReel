// server start karna 
const app = require('./src/app')
const connectDB = require('./src/db/db')

connectDB()

app.listen(3000, () => {
    console.log("Server is Startred on the port no: 3000")
})