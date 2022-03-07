const Post = require('../models/post')
const { checkIfValidId } = require('../utils/auth')

const postRouter = require('express').Router()

postRouter.post('/new', async (req, res) => {
	const { content } = req.body
	const id = req.user?.id

	const trimmedContent = content.toString()?.trim()

	if (!trimmedContent) {
		return res.status(400).json({ error: 'Please send content' })
	}

	const newPost = new Post({ content: trimmedContent, creator: id })
	await newPost.save()

	return res.status(200).json({ message: 'ok' })
})

postRouter.post('/like/:postId', async (req, res) => {
	const { postId } = req.params
	const id = req.user?.id

	if (checkIfValidId(postId) === false) {
		return res.status(400).json({ error: 'Please send valid postId' })
	}

	const post = await Post.findById(postId).exec()
	if (!post) {
		return res.status(400).json({ error: 'Post does not exist' })
	}

	if (post.likes?.includes(id)) {
		return res.status(400).json({ error: 'Already liked' })
	}
	post.likes.push(id)
	await post.save()
	return res.status(200).json({ message: 'ok' })
})

module.exports = postRouter
