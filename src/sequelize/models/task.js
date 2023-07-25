const Sequelize = require('sequelize')

const { Model } = Sequelize

class TaskModel extends Model {
    static init(sequelize) {
        return super.init(
            {
                title: Sequelize.DATE,
                summary: Sequelize.STRING,
                completed_at: Sequelize.DATE,
                user_id: Sequelize.INTEGER
            },
            {
                sequelize,
                tableName: 'tasks'
            }
        )
    }

    static associate(models) {
        this.userAssociation = this.belongsTo(models.User, {
            foreignKey: {
                name: 'user_id'
            },
            as: 'user'
        })
    }
}

module.exports = TaskModel
