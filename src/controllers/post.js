const Post = require('../models/post')

const postRouter = require('express').Router()

postRouter.post('/new', async (req, res) => {
	const { content } = req.body

	if (!content) {
		return res.status(400).json({ error: 'Please send content' })
	}

	const newPost = new Post({ content, creator: req.user?.id })
	await newPost.save()

	return res.status(200).json({ message: 'ok' })
})

module.exports = postRouter
