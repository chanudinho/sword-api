const { User } = require('../../sequelize/models')

class UserRepository {
    static async createUser(user) {
        const createdUser = await User.create(user)

        return createdUser
    }

    static async findByEmail(email) {
        const user = await User.findOne({ where: { email } })

        return user
    }
}

module.exports = UserRepository
