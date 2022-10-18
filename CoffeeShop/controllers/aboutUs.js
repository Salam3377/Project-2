// Import Dependencies
const express = require('express')
// // Create router
 const router = express.Router()




router.get('/', (req, res) => {
	// Nit: can remove unused `userId`
	const { username, userId, loggedIn } = req.session
	res.render('aboutUs', { username, loggedIn })
})

module.exports = router