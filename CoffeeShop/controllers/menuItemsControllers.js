// Import Dependencies
const express = require('express')
const MenuItems = require('../models/menuItems')
// Nit: can remove usused Cart model
const Cart = require('../models/userCart')


// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
// router.use((req, res, next) => {
// 	// checking the loggedIn boolean of our session
// 	if (req.session.loggedIn) {
// 		// if they're logged in, go to the next thing(thats the controller)
// 		next()
// 	} else {
// 		// if they're not logged in, send them to the login page
// 		res.redirect('/auth/login')
// 	}
// })

// Routes

// index ALL
router.get('/', (req, res) => {
	MenuItems.find({})
		.then(items => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			//const userId = req.session.userId
			res.render('menuItems/index', { items, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	MenuItems.find({ owner: userId })
		.then(items => {
			res.render('menuItems/index', { items, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('menuItems/new', { username, userId, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	//req.body.ready = req.body.ready === 'on' ? true : false

	req.body.owner = req.session.userId
	MenuItems.create(req.body)
		.then(items => {
			// Nit: remove console.log
			console.log('this was returned from create', items)
			res.redirect('/menu')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// // edit route -> GET that takes us to the edit form view
// router.get('/:id/edit', (req, res) => {
// 	// we need to get the id
// 	const exampleId = req.params.id
// 	MenuItems.findById(exampleId)
// 		.then(example => {
// 			res.render('examples/edit', { example })
// 		})
// 		.catch((error) => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })

// update route
router.put('/:id', (req, res) => {
	const itemsId = req.params.id
	req.body.ready = req.body.ready === 'on' ? true : false

	MenuItems.findByIdAndUpdate(itemsId, req.body, { new: true })
		.then(items => {
			res.redirect(`/menu/${items.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const itemsId = req.params.id
	MenuItems.findById(itemsId)
		.then(items => {
            const {username, loggedIn, userId} = req.session
			res.render('menu/show', { items, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const itemsId = req.params.id
	MenuItems.findByIdAndRemove(itemsId)
	// Nit: can remove unused `items` here and just pass nothing () => res.redirect('/menu')
		.then(items => {
			res.redirect('/menu')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// Export the Router
module.exports = router
