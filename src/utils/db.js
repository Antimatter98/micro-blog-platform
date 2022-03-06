const mongoose = require('mongoose')

const { MONGO_URI } = require('../config')

const dbOps = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	autoIndex: false,
}

const connectToDb = async () => {
	try {
		await mongoose.connect(MONGO_URI, dbOps)
		console.log('Connected to MongoDB')
	} catch (error) {
		console.error(error)
		console.log('Shutting down...')
		process.exit(1)
	}
}

module.exports = connectToDb
