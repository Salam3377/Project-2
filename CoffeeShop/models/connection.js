// make our .env variables available via process.env
require('dotenv').config()
// import mongoose
const mongoose = require('mongoose')

// connect to the database
mongoose.connect(process.env.DATABASE_URL, {
	useUnifiedTopology: true,
	useNewUrlParser: true,
})

// save the connection in a variable
const db = mongoose.connection

// create some notification
db.on('open', () => console.log('You are connected to mongo'))
db.on('close', () => console.log('You are disconnected from mongo'))
db.on('error', (error) => console.log(error))

// export the connection
module.exports = mongoose
// require("dotenv").config()
// const mongoose = require("mongoose")

// /////////////////////////////////////////////
// // Database Connection
// /////////////////////////////////////////////
// // Setup inputs for our connect function
// //this is where we will set up our inputs for our database connect
// const DATABASE_URL = process.env.DATABASE_URL
// const CONFIG = {
//   useNewUrlParser: true, // need these to connect and run mongoose
//   useUnifiedTopology: true,
// }

// // Establish Connection
// mongoose.connect(DATABASE_URL, CONFIG)

// // tell mongoose what to do with certain events
// // Events for when connection opens/disconnects/errors
// mongoose.connection
//   .on("open", () => console.log("Connected to Mongoose"))
//   .on("close", () => console.log("Disconnected from Mongoose"))
//   .on("error", (error) => console.log(error))


//   module.exports= mongoose
