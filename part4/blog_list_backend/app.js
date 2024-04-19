
const config = require('./utils/config')


const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
// const morgan = require('morgan')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const blogRouter = require('./controllers/blog')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')

mongoose.set('strictQuery', false)

const url = config.mongoUrl
logger.info('Connected to', url)

mongoose.connect(url)
.then(() => {
	logger.info('connected to MongoDB')
})
.catch((error) => (
	logger.info('Error connecting to MongoDB: ', error)
) )

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use(middleware.requestLogger)

// app.use(morgan('tiny'))
// app.use(morgan('********\n:method :url :status :res[content-length] - :response-time ms :body\n*********'))
app.use(middleware.tokenExtrator)

app.use('/api/blogs', middleware.useExtractor, blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)

module.exports = app