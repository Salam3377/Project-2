// Import Dependencies
const express = require('express')
// // Create router
 const router = express.Router()




router.get('/', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('contactUs', { username, loggedIn })
})

module.exports = router