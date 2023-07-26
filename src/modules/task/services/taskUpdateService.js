const taskValidation = require('../taskValidation')
const taskRepository = require('../taskRepository')
const DefaultError = require('../../../lib/defaultError')
const rabbitMqLib = require('../../../lib/rabbitMq')

class taskUpdateService {
    static async validateUpdateService({ userId, title, summary, completedAt, taskId }) {
        try {
            await taskValidation.taskUpdateValidation({ userId, title, summary, completedAt, taskId })
        } catch (error) {
            throw new DefaultError(error.message, 400)
        }

        return true
    }

    static checkIfTaskExist(task) {
        if (!task) {
            throw new DefaultError('task not found', 404)
        }

        return true
    }

    static checkIfIsUserTask(task, userId) {
        if (userId !== task.user_id) {
            throw new DefaultError("You are trying to update a task that you don't own", 401)
        }

        return true
    }

    static checkIfCompleted(task) {
        if (task.completed_at) {
            throw new DefaultError('you cannot update a task that has already been completed', 400)
        }

        return true
    }

    static buildUpdateObject({ title, summary, completedAt }) {
        const task = {}

        if (title) task.title = title
        if (summary) task.summary = summary
        if (completedAt) task.completed_at = completedAt

        return task
    }

    static async sendToQueue(task) {
        if (task.completed_at) {
            await rabbitMqLib.sendData(task)
        }
    }

    static async updateTask(userId, { title, summary, completedAt, taskId }) {
        await this.validateUpdateService({ userId, title, summary, completedAt, taskId })

        const task = await taskRepository.findById(taskId)

        this.checkIfTaskExist(task)
        this.checkIfIsUserTask(task, userId)
        this.checkIfCompleted(task)

        const updateObject = this.buildUpdateObject({ title, summary, completedAt })

        Object.assign(task, updateObject)
        await taskRepository.updateTask(task)

        await this.sendToQueue(task)

        return task
    }
}

module.exports = taskUpdateService
