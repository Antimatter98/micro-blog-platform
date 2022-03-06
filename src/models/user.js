const mongoose = require('mongoose')

const { generateHash } = require('../utils/auth')

const UserSchema = new mongoose.Schema(
	{
		name: { type: String, required: true, maxLength: 100 },
		email: { type: String, required: true, unique: true, maxLength: 50 },
		pwd: { type: String, required: true, set: pwd => generateHash(pwd) },
		followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
		following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', UserSchema)
