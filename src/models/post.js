const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema(
	{
		creator: { type: mongoose.Schema.ObjectId, required: true, ref: 'User' },
		content: { type: String, required: true, maxLength: 200 },
		likes: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Post', PostSchema)
