const Sequelize = require('sequelize')

const { Model } = Sequelize

class UserModel extends Model {
    static init(sequelize) {
        return super.init(
            {
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.STRING,
                role: Sequelize.STRING,
                deleted_at: Sequelize.DATE
            },
            {
                sequelize,
                tableName: 'users'
            }
        )
    }
}

module.exports = UserModel
