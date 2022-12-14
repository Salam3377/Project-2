////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const ExampleRouter = require('./controllers/example')
const menuItemsRouter = require('./controllers/menuItemsControllers')
const userCartRouter = require('./controllers/userCartControllers')
const UserRouter = require('./controllers/user')
const User = require("./models/user")
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js



//////////////
//Creating some vars for pages without schema
///////////
const aboutUs = require('./controllers/aboutUs')
const contactUs = require('./controllers/contactUs')




//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/examples', ExampleRouter)
app.use('/menu', menuItemsRouter)
app.use('/cart', userCartRouter)

//extra web pages
app.use('/aboutUs', aboutUs)
app.use('/contactUs',contactUs)


app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})