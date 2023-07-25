const { verify } = require('jsonwebtoken')
const DefaultError = require('../lib/defaultError')
const authConfig = require('../config/auth')

const ensureAuthenticated = role => {
    return (req, res, next) => {
        const authHeader = req.headers.authorization

        if (!authHeader) {
            throw new DefaultError('JWT token is missing', 401)
        }

        const [, token] = authHeader.split(' ')

        try {
            const decoded = verify(token, authConfig.jwt.secret)

            if (role && role !== decoded.role) {
                throw new DefaultError(
                    `your job role is ${decoded.role} but for this route you need the ${role} job role`
                )
            }

            req.user = {
                id: decoded.id,
                role: decoded.role
            }

            return next()
        } catch (error) {
            throw new DefaultError(error.message || 'Invalid JWT token', 401)
        }
    }
}

module.exports = ensureAuthenticated
