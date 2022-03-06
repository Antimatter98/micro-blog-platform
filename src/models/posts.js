const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
	{
		creator: { type: mongoose.Schema.ObjectId, ref: 'User' },
		content: { type: String, maxLength: 200 },
		likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Post', PostSchema)
