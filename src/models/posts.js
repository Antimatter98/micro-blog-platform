const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
	{
		creator: { Type: mongoose.Schema.ObjectId, ref: 'User' },
		content: { Type: String, maxLength: 200 },
		likes: [{ Type: mongoose.Schema.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Post', PostSchema)
