require('dotenv').config()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/users')

loginRouter.post('/', async (request, response) => {
	const { username, password } = request.body

	const user = await User.findOne({ username })
	const passwordCorrect = user === null
		? false
		: await bcrypt.compare(password, user.passwordHash)
	
	if (!(user && passwordCorrect)){
		return response.status(401).json({
			error: 'invlaid username or password'
		})
	}

	const userForToken = {
		username: user.username,
		id: user._id
	}

	const token = jwt.sign(userForToken, process.env.SECRET, { expiresIn: '1h' })

	response
		.status(200)
		.send({ token, username: user.username, name: user.name, id: user._id })
})

module.exports =loginRouter