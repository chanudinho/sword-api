const taskValidation = require('../taskValidation')
const taskRepository = require('../taskRepository')
const DefaultError = require('../../../lib/defaultError')

class TaskCreateService {
    static async validateCreateTask({ title, summary, userId }) {
        try {
            await taskValidation.taskCreateValidation({ title, summary, userId })
        } catch (error) {
            throw new DefaultError(error.message, 400)
        }

        return true
    }

    static async createTask({ userId, title, summary }) {
        await this.validateCreateTask({ userId, title, summary })

        const task = await taskRepository.createTask({ title, summary, user_id: userId })

        return task
    }
}

module.exports = TaskCreateService
