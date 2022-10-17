// Import Dependencies
////////////////////////////////////////
const express = require("express")
const MenuItems = require("../models/menuItems")
const Cart = require('../models/userCart')

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////

//show all
router.get('/', (req,res) => {
    Cart.find({})
		.then(items => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			//const userId = req.session.userId
			res.render('cart/index', { items, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


//show mine
router.get('/mine', (req, res) => {
    const { username, userId, loggedIn } = req.session
	Cart.find({ owner: userId })
		.then(items => {
			res.render('cart/index', { items, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('cart/new', { username, loggedIn })
})

//create
router.post('/', (req,res) => {
	req.body.toStay = req.body.toStay === 'on' ? true : false
    req.body.owner = req.session.userId
	Cart.create(req.body)
		.then(cart => {
			console.log('this was returned from create', cart)
			res.redirect('/cart')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})
//show needs work here
// router.get('/:id', (req, res) => {
// 	// we need to get the id
// 	const itemId = req.params.id
// 	MenuItems.findById(itemId)
// 		.then(item => {
// 			item.items.push(req.body)
// 			res.render('examples/edit', { example })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

router.get('/:id', (req, res) => {
	const itemId = req.params.id
	Cart.findById(itemId)
		.then(item => {
            const {username, loggedIn, userId} = req.session
			res.render('cart/show', { item, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

//Delete
router.delete('/:id', (req, res) => {
	const Id = req.params.id
	Cart.findByIdAndRemove(Id)
		.then(item => {
			res.redirect('/cart/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


module.exports = router