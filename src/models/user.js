const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
	{
		name: { Type: String, maxlength: 100 },
		email: { Type: String, required: true, unique: true, maxlength: 50 },
		password: {
			hash: { Type: String },
			salt: { Type: String },
		},
		followers: [{ Type: mongoose.Schema.ObjectId, ref: 'User' }],
		following: [{ Type: mongoose.Schema.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('User', UserSchema)
