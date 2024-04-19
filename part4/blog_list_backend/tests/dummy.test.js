const { test, describe, after} = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const listHelper = require('../utils/list_helper')

const helper = require('./test_helpers')


console.log ("DEBUT TEST DUMMY")

test('dummy returns one' , () => {
	const blogs = []
	
	const result = listHelper.dummy(blogs)
	assert.strictEqual(result, 1)
})

describe('total likes', () => {
	const listWithOneBlog = [
		{
			_id: '5a422aa71b54a676234d17f8',
			title: 'Go To Statement Considered Harmful',
			author: 'Edsger W. Dijkstra',
			url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
			likes: 5,
			__v: 0
		}
	]
	test('when list has only one blog, equals the likes of 5', () => {
		const result = listHelper.totalLikes(listWithOneBlog)
		assert.strictEqual(result, 5)
	})
})

describe('favorite Blog', () => {
	const listOfBlogs = [
		{
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12
		},
		{
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 6
		}
	]
	
	test('When Top blog is Edsger W. Dijkstra with 12 likes', () => {
		const result = listHelper.favoriteBlogs(listOfBlogs)
		assert.deepStrictEqual(result, {
			title: "Canonical string reduction",
			author: "Edsger W. Dijkstra",
			likes: 12
		})
	})
})

describe ('Most blog', () => {
	test('When The one who have the most blog', () => {
		const result = listHelper.mostBlogs(helper.initialBlogs)
		assert.deepStrictEqual(result, {
			author: 'Robert C. Martin',
			blog: 3
		})
	})
})

describe ('Most Likes ', () => {
	test('When The one who have more liked', () => {
		const result = listHelper.mostLikes(helper.initialBlogs)
		assert.deepStrictEqual(result, {
			author: "Edsger W. Dijkstra",
			likes: 17
		})
	})
})

after(async () => {
	await mongoose.connection.close()
  })
console.log ("FIN TEST DUMMY")