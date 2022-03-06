const User = require('../models/user')
const { generateAuthToken, checkValidPwd } = require('../utils/auth')

const authRouter = require('express').Router()

authRouter.post('/signup', async (req, res) => {
	const { name, email, pwd } = req.body

	if (!name || !email || !pwd) {
		return res.status(400).json({ error: 'Please send name, email and password' })
	}

	const userWithEmail = await User.findOne({ email }).exec()
	if (!userWithEmail) {
		const newUser = new User({ name, email, pwd })
		const savedUser = await newUser.save()
		const token = generateAuthToken({ id: savedUser._id })
		return res.status(200).json({ token })
	} else {
		return res.status(400).json({ error: 'user exists already' })
	}
})

authRouter.post('/login', async (req, res) => {
	const { email, pwd } = req.body

	if (!email || !pwd) {
		return res.status(400).json({ error: 'Please send email and password' })
	}

	const user = await User.findOne({ email }).exec()
	if (!user) {
		return res.status(400).json({ error: 'User does not exist' })
	} else {
		const isValidPwd = checkValidPwd(pwd, user.pwd)
		if (!isValidPwd) {
			return res.status(400).json({ error: 'Invalid password' })
		} else {
			const token = generateAuthToken({ id: user._id })
			return res.status(200).json({ token })
		}
	}
})

module.exports = authRouter
