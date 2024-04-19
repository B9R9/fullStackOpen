const Blog = require('../models/blog')
const User = require('../models/users')
const jwt = require('jsonwebtoken')

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0
	},
	{
		_id: '5a422b3a1b54a676234d17f9',
		title: 'Canonical string reduction',
		author: 'Edsger W. Dijkstra',
		url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
		likes: 12,
		__v: 0
	},
	{
		_id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
		likes: 10,
		__v: 0
	},
	{
		_id: '5a422ba71b54a676234d17fb',
		title: 'TDD harms architecture',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
		likes: 0,
		__v: 0
	},
	{
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0
	}
]

const initialUsers = [
	{
		_id: '5a422bc61b54a676234d17fc',
		name: "Jean Citrouille",
		username: "jcitrouille",
		password: "qwerty"
	},
	{
		_id: '5a422bc61b54a676234d17fd',
		name: "Ben frankil",
		username: "bfrnaklin",
		password: "okokokokokok"
	},
	{
		_id: '5a422bc61b54a676234d17fe',
		name: "jacques chirac",
		username: "jchirac",
		password: "asdfghhjk"
	},
	{
		_id: '5a422bc61b54a676234d17ff',
		name: "hector duchony",
		username: "hduchony",
		password: "zxcvbnm"
	},
]

const userTest = { name: "test test", username: "ttest", password: "qwerty" }
const loginTest = { username: "ttest", password: "qwerty" }

const oneBlog = {
	_id: '5a422bc61b54a676234d17fw',
	title: 'One blog',
	author: 'Test test',
	url: 'test.com',
	likes: 4,
	__v: 0
}

const nonExistingId = async () => {
	const blog = new Blog ({
		title: 'willremovethissoon'
	})
	await blog.save()
	await blog.deleteOne()
	return blog._id.toString()
}

const blogsInDb = async () => {
	const blogs = await Blog.find({})
	return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
	const users = await User.find({})
	return users.map(user => user.toJSON())
}

const tokenGenerator = (user) => {
	const useForToken = {
		username: user.username,
		id: user._id
	}
	const token = jwt.sign(useForToken, process.env.SECRET)
	return token
}

module.exports = {
	initialBlogs,
	nonExistingId,
	blogsInDb,
	initialUsers,
	userTest,
	loginTest,
	usersInDb,
	oneBlog,
	tokenGenerator
}