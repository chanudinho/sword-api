const { Task, User } = require('../../sequelize/models')

class TaskRepository {
    static async createTask(task) {
        const createdTask = await Task.create(task)

        return createdTask
    }

    static async findTasks(query, attributes) {
        const tasks = await Task.findAll({
            where: query,
            attributes,
            include: [{ model: User, attributes: ['id', 'name'], as: 'user' }]
        })

        return tasks
    }

    static async findById(id) {
        const task = await Task.findByPk(id)

        return task
    }

    static async destroyTask(id) {
        await Task.destroy({ where: { id } })

        return true
    }

    static async updateTask(task) {
        await task.save()
    }
}

module.exports = TaskRepository
