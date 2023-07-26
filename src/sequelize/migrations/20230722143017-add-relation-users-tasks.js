module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('tasks', 'user_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'users',
                key: 'id'
            },
            allowNull: false,
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        })
    },
    down: async queryInterface => {
        await queryInterface.removeColumn('tasks', 'user_id')
    }
}
