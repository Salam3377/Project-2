// make our .env variables available via process.env
require('dotenv').config()
// import mongoose
const mongoose = require('mongoose')

//here we will set our inputs for database connect function
const DATABASE_URL = process.env.DATABASE_URL
const DEPLOYED_URL = process.env.DEPLOYED_URL

// connect to the database
mongoose.connect(process.env.DEPLOYED_URL, {
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

