
const dummy = (blogs) => {
	return (1)
}


const totalLikes = (blogs) => {
	const blogLength = blogs.length
	
	if (blogLength === 0){
		return (0)
	} else if (blogLength === 1) {
		return (blogs[0].likes)
	} else {
		const total = blogs.reduce((sum, blog) => {
			return sum + blog.likes
		}, 0)
		return total
	}
}

const favoriteBlogs = (blogs) => {
	const blogLength = blogs.length
	let favoriteBlog = [
		{
			title: "test",
			author: "test",
			likes: 0
		}
	]
	
	if (blogLength === 0){
		return NaN
	} else {
		blogs.forEach( blog => {
			if (blog.likes > favoriteBlog[0].likes) {
				favoriteBlog[0].title = blog.title
				favoriteBlog[0].author = blog.author
				favoriteBlog[0].likes = blog.likes
			}
		})
		return favoriteBlog[0]
	}
}

const mostBlogs = (blogs) => {
	if (blogs.length === 0){
		return NaN
	} else {
		let authorsList = Object.values(blogs.reduce((key, { author }) => {
			key[author] = key[author] || { author, blog: 0}
			key[author].blog++
			return key
		}, {}))

		let result = authorsList.filter(author => {
			return author.blog === Math.max(...authorsList.map(author => author.blog))
		})
		return result[0]
	}	
}

const mostLikes = (blogs) => {
	if (blogs.length === 0){
		return NaN
	} else {
		let authorsList = Object.values(blogs.reduce((key, { author, likes }) => {
			key[author] = key[author] || { author, likes: 0}
			key[author].likes += likes
			return key
		}, {}))
		
		let result = authorsList.filter(author => {
			return author.likes === Math.max(...authorsList.map(author => author.likes))
		})
		return result[0]	
	}	
}

module.exports = {
	dummy,
	totalLikes,
	favoriteBlogs,
	mostBlogs,
	mostLikes
}