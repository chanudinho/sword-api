const userValidation = require('../userValidation')
const userRepository = require('../userRepository')
const DefaultError = require('../../../lib/defaultError')
const crypto = require('../../../lib/crypto')

class UserCreateService {
    static async validateCreateUser({ name, email, password, role }) {
        const roleNormalized = role ? role.toLowerCase() : null

        try {
            await userValidation.userCreateValidation({ name, email, password, role: roleNormalized })
        } catch (error) {
            throw new DefaultError(error.message, 400)
        }

        return true
    }

    static async checkIfEmailIsUser(email) {
        const user = await userRepository.findByEmail(email)

        if (user) {
            throw new DefaultError('The email has already been registered', 400)
        }

        return true
    }

    static async createUser({ name, email, password, role }) {
        await this.validateCreateUser({ name, email, password, role })

        await this.checkIfEmailIsUser(email)

        const hashedPassword = await crypto.encrypt(password)

        const newUser = await userRepository.createUser({ name, email, password: hashedPassword, role })

        delete newUser.dataValues?.password

        return newUser
    }
}

module.exports = UserCreateService
