const jwt = require('jsonwebtoken')
const User = require('../models/users')

const errorHandler = (error, request, response, next) => {
	if (error.name === 'CastError') {
	  return response.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
	  return response.status(400).json({ error: error.message })
	} else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
	  return response.status(400).json({ error: 'expected `username` to be unique' })
	} else if (error.name ===  'JsonWebTokenError') {
	  return response.status(401).json({ error: 'token invalid' })
	} else if (error.name ===  'TokenExpiredError') {
	  return response.status(401).json({ error: 'token expired' })
	}  
	next(error)
  }

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

const useExtractor = async (request, response, next) => {
	const decodedToken = jwt.verify(request.token, process.env.SECRET)
	if (!decodedToken || !decodedToken.id) {
		return response.status(401).json({ error: 'Error: token missing or invalid' })	
	}
	const user = await User.findById(decodedToken.id)
	if (!user) {
		return response.status(401).json({ error: 'User not Found'})
	}
	request.user = user
	next()
}

const tokenExtrator = (request, response, next) => {
	const authorization = request.get('authorization')
	if (authorization && authorization.startsWith('Bearer ')) {
		const token = authorization.substring(7)
		request.token = token
	}
	next()
}	

const requestLogger = (err, request, response, next) => {
	console.log('---------')
	console.log('Method:', request.method)
	console.log('Path:', request.path)
	console.log('body:', request.body)
	console.log('---')
	console.error(err.message)
	console.log('---------')
	next()
  }

module.exports = {
	unknownEndpoint,
	errorHandler,
	tokenExtrator,
	useExtractor,
	requestLogger
}