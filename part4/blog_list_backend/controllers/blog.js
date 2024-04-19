const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require ('../models/blog')
const User = require('../models/users')

blogRouter.get('/', async (request, response,  next) => {
	try {
	  const blogs = await Blog.find({}).populate('user', { username: 1 })
	  response.json(blogs)
	} catch (error){ return next(error) }
})

blogRouter.post('/', async (request, response, next) => {
	const body = request.body
	const user = request.user

	if (!body.title || !body.url || body.title.trim() === '' || body.url.trim() === '') {
		return response.status(400).json({ error: 'Missing Title, url or author property'})
	} else {
	
		const blog = new Blog({
			title: body.title,
			author: body.author,
			url: body.url,
			likes: body.likes,
			user: user._id
		})
		try {
		  const savedBlog = await blog.save()
		  user.blogs = user.blogs.concat(savedBlog._id)
		  await user.save()
		  response.status(201).json(savedBlog)
		} catch (error) { return next(error) }
	}
})

blogRouter.delete('/:id', async (request, response, next) => {
	const id = request.params.id
	const isBlogExist = await Blog.findById(id)
	if (!isBlogExist) {
		return response.status(404).json({ error: 'Blog not found' })
	}

	const user = request.user
	if (isBlogExist.user.toString() !== user.id.toString()) {
		return response.status(403).json({  error: 'Unauthorized: You do not have permission to delete this blog' })
	}

	await Blog.findByIdAndDelete(id)
	const deletedBlog = await Blog.findById(id)
	if (!deletedBlog){
		response.status(204).end()
	} else {
		response.status(500).json({ error: 'Blog deletion failed'})
	}
})

blogRouter.put('/:id', async (request, response) => {
	const id = request.params.id
	const body = request.body
	
	const isBlogExist = await Blog.findById(id)
	if (!isBlogExist) {
		return response.status(404).json({ error: 'Blog not found' })
	}

	const updatedBlog = {
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes
	}

	const newVersionBlog = await Blog.findByIdAndUpdate(id, updatedBlog, {new: true, runValidators: true, context: 'Query'})
	if (!newVersionBlog) {
		response.status(500).json({ error: 'Blog updated not found'})
	} else {
			response.json(newVersionBlog)
		}
})

module.exports = blogRouter