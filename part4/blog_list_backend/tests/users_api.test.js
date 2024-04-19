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

console.log ("DEBUT TEST USER")

describe('When there is initialy one user in db', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('sekret', 10)
		const user = new User({username: 'userTest',name: "UserTester", passwordHash})

		await user.save()
	})

	test('creation succeeds with a fresh username', async () => {
		const userAtStart = await Helper.usersInDb()

		const newUser = {
			username: 'jdassin',
			name: 'Joe Dassin',
			password: 'tabatacash',
		}

		await api
			.post(`/api/users`)
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await Helper.usersInDb()
		assert.strictEqual(usersAtEnd.length, userAtStart.length + 1)

		const usernames = usersAtEnd.map(u => u.username)
		assert(usernames.includes(newUser.username))
	})
	
	test("When User already exist id db status 400", async () => {
		const userAtStart = await Helper.usersInDb()

		const duplicatedUser = {...userAtStart[0]}

		await api
			.post(`/api/users`)
			.send(duplicatedUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
		const userAtEnd = await Helper.usersInDb()
		assert.strictEqual(userAtEnd.length, userAtStart.length)

	})
})

describe('When you add a new User', () => {
	beforeEach(async () => {
		await Blog.deleteMany({})
		await User.deleteMany({})
	})

	test('name is missing status 400 expected', async () => {
		const userAtStart = await Helper.usersInDb()

		const newUser = {
			username: 'jdassin',			
			password: 'tabatacash',
		}

		await api
			.post(`/api/users`)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
			const usersAtEnd = await Helper.usersInDb()
			assert.strictEqual(usersAtEnd.length, userAtStart.length)
	})

	test('name is empty status 400 expected', async () => {
		const userAtStart = await Helper.usersInDb()

		const newUser = {
			name:"",
			username: 'jdassin',			
			password: 'tabatacash',
		}

		await api
			.post(`/api/users`)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
			const usersAtEnd = await Helper.usersInDb()
			assert.strictEqual(usersAtEnd.length, userAtStart.length)
	})

	test('Username is empty status 400 expected', async () => {
		const userAtStart = await Helper.usersInDb()

		const newUser = {
			name:"Joe dassin",
			username: '',			
			password: 'tabatacash',
		}

		await api
			.post(`/api/users`)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
			const usersAtEnd = await Helper.usersInDb()
			assert.strictEqual(usersAtEnd.length, userAtStart.length)
	})

	test('Password is empty status 400 expected', async () => {
		const userAtStart = await Helper.usersInDb()

		console.log("Start: ", userAtStart)
		
		const newUser = {
			name:"Joe dassin",
			username: 'jdassin',			
			password: '',
		}
		
		await api
		.post(`/api/users`)
		.send(newUser)
		.expect(400)
		.expect('Content-Type', /application\/json/)
		
		const usersAtEnd = await Helper.usersInDb()
		console.log("END: ", usersAtEnd)
			assert.strictEqual(usersAtEnd.length, userAtStart.length)
	})

	test('Password is missing status 400 expected', async () => {
		const userAtStart = await Helper.usersInDb()

		const newUser = {
			name:"Joe dassin",
			username: 'jdassin',			
		}

		await api
			.post(`/api/users`)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
			const usersAtEnd = await Helper.usersInDb()
			assert.strictEqual(usersAtEnd.length, userAtStart.length)
	})

	test('username is missing status 400 expected', async () => {
		const userAtStart = await Helper.usersInDb()

		const newUser = {
			name:"Joe dassin",
			password: "test"		
		}

		await api
			.post(`/api/users`)
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)
		
			const usersAtEnd = await Helper.usersInDb()
			assert.strictEqual(usersAtEnd.length, userAtStart.length)
	})

	after(async () => {
	await mongoose.connection.close()
	})
})