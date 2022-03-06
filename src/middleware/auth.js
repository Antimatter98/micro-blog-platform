const jwt = require('express-jwt')

const checkJwt = jwt({
	secret: process.env.JWT_SECRET,
	algorithms: ['HS256'],
})

module.exports = {
	checkJwt,
}
