const jwt = require('express-jwt')

const checkJwt = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
})

const checkJWTError = (err, _req, res, next) => {
	if (err.name === 'UnauthorizedError') {
		res.status(err.status).send({ message: 'Invalid token' })
		return
	}
	next()
}

const checkAuth = [checkJwt, checkJWTError]

module.exports = {
	checkAuth,
}
