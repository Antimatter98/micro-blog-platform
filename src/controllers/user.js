const userRouter = require('express').Router()
const User = require('../models/user')
const { checkIfValidId } = require('../utils/auth')

userRouter.post('/follow/:userId', async (req, res) => {
	const { userId } = req.params
	const id = req.user?.id

	if (checkIfValidId(userId) === false) {
		return res.status(400).json({ error: 'Please send valid userId' })
	}

	const user = await User.findById(userId).exec()
	if (!user) {
		return res.status(400).json({ error: 'User does not exist' })
	}

	const currentUser = await User.findById(id).exec()
	if (user.followers?.includes(id) && currentUser.following?.includes(userId)) {
		return res.status(400).json({ error: `You are already following ${userId}` })
	}

	user.followers.push(id)
	currentUser.following.push(userId)

	await user.save()
	await currentUser.save()
	return res.status(200).json({ message: 'ok' })
})

module.exports = userRouter
