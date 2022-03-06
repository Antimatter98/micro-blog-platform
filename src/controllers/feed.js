const Post = require('../models/post')
const User = require('../models/user')

const feedRouter = require('express').Router()

feedRouter.get('/', async (req, res) => {
	const id = req.user?.id

	const user = await User.findById(id).exec()
	const posts = await Post.find({}, '-_id').populate('creator', 'name email').exec()
	// show posts from people you follow
	const postsFromFollowing = posts.filter(post => user.following?.includes(post.creator?._id))

	return res.status(200).json({ posts: postsFromFollowing })
})

module.exports = feedRouter
