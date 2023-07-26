const { sign } = require('jsonwebtoken')

const authConfig = require('../../../config/auth')
const DefaultError = require('../../../lib/defaultError')
const userRepository = require('../../user/userRepository')
const cryptoLib = require('../../../lib/crypto')

class AuthenticateUserService {
    static checkIfUserExist(user) {
        if (user) {
            return true
        }
        throw new DefaultError('Incorrect email or password', 401)
    }

    static async checkPassword(user, password) {
        const passwordMatched = await cryptoLib.compareData(password, user.password)

        if (passwordMatched) return true

        throw new DefaultError('Incorrect email or password', 401)
    }

    static async autenticate({ email, password }) {
        const user = await userRepository.findByEmail(email)

        this.checkIfUserExist(user)

        await this.checkPassword(user, password)

        delete user.dataValues?.password

        const { secret, expiresIn } = authConfig.jwt

        const token = sign(
            {
                id: user.id,
                role: user.role
            },
            secret,
            {
                expiresIn
            }
        )

        return { user, token }
    }
}

module.exports = AuthenticateUserService
