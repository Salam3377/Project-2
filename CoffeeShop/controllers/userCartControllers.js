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
		.then(carts => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			//const userId = req.session.userId
			res.render('cart/index', { carts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


//show mine
router.get('/mine', (req, res) => {
    const { username, userId, loggedIn } = req.session
	Cart.find({ owner: userId })
		.then(carts => {
			res.render('cart/index', { carts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})
//router to .NEW page
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('cart/new', { username, loggedIn })
})

//create
router.post('/', (req,res) => {
	req.body.toStay = req.body.toStay === 'on' ? true : false
    req.body.owner = req.session.userId
	Cart.create(req.body)
		.then(carts => {
			console.log('this was returned from create', carts)
			res.redirect('/cart')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})
//router get to SHOW page of elem
router.get('/:id', (req, res) => {
	const itemId = req.params.id
	Cart.findById(itemId)
		.then(carts => {
            const {username, loggedIn, userId} = req.session
			res.render('cart/show', { carts, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

//get update page-------------------------------------------------------------
router.get('/toCart/:id', (req, res) => {
	const itemId = req.body.id
	Cart.findById(itemId)
		.then(carts => {
            const {username, loggedIn, userId} = req.session
			res.render('cart/update', { carts, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

//not complete
router.get('/add/:cartId', (req, res) => {
	const cartId = req.params.cartId
	req.body.toStay = req.body.toStay === 'on' ? true : false
	console.log("in put at cartId req.body is", req.body)
// 	// i need to get the item Id from the req body somehow attach item id
// 	//i e liquid button that makes this req
	MenuItems.findById(cartId)
		.then(items => {
			console.log(' check info', items);
			Cart.findOne()
				.then(carts => {
				if(req.session.userId == carts.owner) {
					return carts
				}
			})
				.then(carts => {
						console.log('here is: ', carts)
						carts.items.push(items) // after push in that ID that i got from the req body
						carts.save()
					})
		// .then(carts => {
		// 	res.redirect('/menu/') // change this line
		// })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

//Delete
router.delete('/:id', (req, res) => {
	const Id = req.params.id
	Cart.findByIdAndRemove(Id)
		.then(carts => {
			res.redirect('/cart/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


module.exports = router