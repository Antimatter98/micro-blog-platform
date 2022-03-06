const jsonwebtoken = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateAuthToken = data => {
	return jsonwebtoken.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' })
}

const generateHash = pwd => {
	const saltRounds = 5
	const salt = bcrypt.genSaltSync(saltRounds)

	return bcrypt.hashSync(pwd.toString(), salt)
}

const checkValidPwd = function (pwd, hash) {
	return bcrypt.compareSync(pwd, hash)
}

module.exports = {
	generateAuthToken,
	generateHash,
	checkValidPwd,
}
