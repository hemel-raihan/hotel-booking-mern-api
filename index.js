const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth.js')
const userRoute = require('./routes/users.js')
const hotelRoute = require('./routes/hotels.js')
const roomRoute = require('./routes/rooms.js')
const cookieParser = require('cookie-parser')
const app = express()

dotenv.config();
app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () =>{
    console.log('connected to the databasee')
})

app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/hotels', hotelRoute)
app.use('/api/rooms', roomRoute)

//error handler middleware
app.use((err, req, res, next)=>{
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

app.listen(5000, ()=>{
    console.log('connected to backend.')
})