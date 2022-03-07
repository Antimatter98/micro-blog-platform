const Post = require('../models/post')
const User = require('../models/user')

const feedRouter = require('express').Router()

feedRouter.get('/:page?', async (req, res) => {
	const id = req.user?.id
	const page = req.params?.page || 1
	const limit = req.query?.limit || 10
	const sort = req.query?.sort || 'createdAt'
	const order = req.query?.order || 'desc'

	const user = await User.findById(id).exec()
	let posts = await Post.aggregate()
		.match({ creator: { $in: user.following } })
		.skip((page - 1) * limit)
		.limit(limit)
		.addFields({
			noOfLikes: {
				$size: '$likes',
			},
		})
		.sort({ [sort]: order })
		.project({ _id: 0, __v: 0, likes: 0 })

	posts = await Post.populate(posts, { path: 'creator', select: 'name email' })

	return res.status(200).json({ posts })
})

module.exports = feedRouter
