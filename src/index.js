const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const helmet = require('helmet')

const authRouter = require('./controllers/auth')

const { PORT } = require('./config')
const connectToDb = require('./utils/db')

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(express.json())

connectToDb()

app.use('/auth', authRouter)

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`)
})
