const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const bcrypt = require('bcrypt')
const app = require('../app')

const Helper = require('./test_helpers')
const Blog = require('../models/blog')
const User = require('../models/users')

const api = supertest(app)

console.log ("DEBUT TEST BLOGS")

describe('When there is initially some posts saved', () => {
	let token
	beforeEach(async () => {
		await User.deleteMany({})
		await Blog.deleteMany({})


		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'blogTest',name: "blogTest", passwordHash})

		await user.save()

		token = Helper.tokenGenerator(user)
	
		const blogObjects = Helper.initialBlogs
			.map(blog => new Blog (blog))
		const promiseArray = blogObjects.map(blog => blog.save())
		await Promise.all(promiseArray)

	})
	test('Blogs are returned as json', async () => {
  		await api
    		.get('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
    		.expect(200)
    		.expect('Content-Type', /application\/json/)
	})

	test('Verify that the blog list application returns the correct amount of blog posts in the JSON format', async () => {

		await api
			.get('/api/blogs')
			.set('Authorization', `Bearer ${token}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)
		assert.strictEqual(response.body.length, Helper.initialBlogs.length)
	})

	test('unique identifier property of the blog posts is named id, by default the database names the property _id.', async () => {
		const response = await api.get('/api/blogs').set('Authorization', `Bearer ${token}`)

		for (let blog of response.body) {
			if (!blog.hasOwnProperty('id')) {
			  throw new Error(`Blog post ${blog.title} does not have an id property`)
			}
		}
	})
 })

describe('Adding a new post with POST request', () => {
	let token;

	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'root',name: "SuperUser", passwordHash})

		await user.save()

		token = Helper.tokenGenerator(user)
	})

	test('Create a new blog post', async () => {
		const blog = Helper.initialBlogs[0]

		await api
			.post('/api/blogs')
			.set({Authorization: `Bearer ${token}`})
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const blogsAfterPost = await Helper.blogsInDb()
		assert.strictEqual(blogsAfterPost.length, 1)
		
		const checkForTitle = blogsAfterPost.some(blog => blog.title === 'React patterns')
		assert.strictEqual(checkForTitle, true)
	})

	test('that verifies that if the likes property is missing from the request', async () => {
		const newBlog = {
			title: "SANS LIKES",
			auhtor: "bbbbb",
			url: "lenouveaupost.com"
		}
		const responseCheck = await api
			.post('/api/blogs')
			.set({Authorization: `Bearer ${token}`})
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)		
		
		if (!('likes' in responseCheck.body)) {
			throw new Error(`Expected 'likes' property`)
		}
		
		const blogsAfterPost = await Helper.blogsInDb()
		assert.strictEqual(blogsAfterPost.length, 1)

		const checkForLikes = blogsAfterPost.filter(blog => blog.title === "SANS LIKES")
		assert.strictEqual(checkForLikes[0].likes, 0)
	})
	
	test('Title empty', async () => {
		const emptyTitle = {
			title: "",
			author: "aaaa",
			url: "aaaa.cim",
			likes: 0
		}
		await api
			.post('/api/blogs')
			.set({Authorization: `Bearer ${token}`})
			.send(emptyTitle)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		})

	test('Title missing', async () => {
		const noTitleBlog = {
			author: "aaaa",
			url: "aaaa.cim",
			likes: 0
		}
		await api
		.post('/api/blogs')
		.set({Authorization: `Bearer ${token}`})
		.send(noTitleBlog)
		.expect(400)
		.expect('Content-Type', /application\/json/)
			
	})

	test('URL missing', async () => {
		const noUrl = {
			title: "No url",
			author: "aaaa",
			likes: 0
		}
		await api
		.post('/api/blogs')
		.set({Authorization: `Bearer ${token}`})
		.send(noUrl)
		.expect(400)
		.expect('Content-Type', /application\/json/)
	})

	test('URL empty', async () => {
		const urlMissing = {
			title: "No url",
			url: "",
			author: "aaaa",
			likes: 0
		}
		
		await api
		.post('/api/blogs')
		.set({Authorization: `Bearer ${token}`})
		.send(urlMissing)
		.expect(400)
		.expect('Content-Type', /application\/json/)
	})
})

describe('testing delete blog', () => {
	let token
	let blog

	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'root',name: "SuperUser", passwordHash})

		await user.save()

		token = Helper.tokenGenerator(user)

		blog = Helper.initialBlogs[0]

		await api
			.post('/api/blogs')
			.set({Authorization: `Bearer ${token}`})
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const blogsAfterPost = await Helper.blogsInDb()
		assert.strictEqual(blogsAfterPost.length, 1)
		
		const checkForTitle = blogsAfterPost.some(blog => blog.title === 'React patterns')
		assert.strictEqual(checkForTitle, true)

	})

	test('succes with status 204 if id is valid'), async () => {
		const blogsAtStart = await Helper.blogsInDb()
		assert.strictEqual(blogsAtStart.length, 1)	

		await api
			.delete(`/api/blogs/${blog.id}`)
			.set({Authorization: `Bearer ${token}`})
			.expect(204)
		
		const blogsAtEnd = await Helper.blogsInDb()
		assert.strictEqual(blogsAtEnd.length, 0)
	}

	test('failed with a status 404 if blog doesn\'t exist', async () => {
		const blogNonExistingId = await Helper.nonExistingId()

		await api
			.delete(`/api/blogs/${blogNonExistingId}`)
			.set({Authorization: `Bearer ${token}`})
			.expect(404)
			.expect('Content-Type', /application\/json/)
	})
})

describe('Updating a blog', () => {
	let token
	let blog
	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'root',name: "SuperUser", passwordHash})

		await user.save()

		token = Helper.tokenGenerator(user)

		blog = Helper.initialBlogs[0]

		await api
			.post('/api/blogs')
			.set({Authorization: `Bearer ${token}`})
			.send(blog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const blogsAfterPost = await Helper.blogsInDb()
		assert.strictEqual(blogsAfterPost.length, 1)
		
		const checkForTitle = blogsAfterPost.some(blog => blog.title === 'React patterns')
		assert.strictEqual(checkForTitle, true)
	})

	test('UPDATE LIKE: succes with status 200 if it is succed', async () => {
		const blogsAtStart = await Helper.blogsInDb()
		assert.strictEqual(blogsAtStart.length, 1)	

		const updatedBlog = {...blogsAtStart[0], likes: blogsAtStart[0].likes + 1, id: blogsAtStart[0].id, user: blogsAtStart[0].user}
		
		await api
		.put(`/api/blogs/${updatedBlog.id}`)
		.set({Authorization: `Bearer ${token}`})
		.send(updatedBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/)
		
		const blogsAtEnd = await Helper.blogsInDb()
		assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
		
		const blogToCheck = await Blog.findById(updatedBlog.id)
		assert.strictEqual(blogToCheck.likes, updatedBlog.likes)
	})
})

after(async () => {
  await mongoose.connection.close()
})

console.log ("FIN TEST BLOGS")