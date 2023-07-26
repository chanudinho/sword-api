const taskValidation = require('../taskValidation')
const taskRepository = require('../taskRepository')
const DefaultError = require('../../../lib/defaultError')

class TaskDestroyService {
    static async validateDeleteTask(taskId) {
        try {
            await taskValidation.deleteTaskValidation({ taskId })
        } catch (error) {
            throw new DefaultError(error.message, 400)
        }

        return true
    }

    static async checkIfTaskExist(taskId) {
        const task = await taskRepository.findById(taskId)

        if (!task) {
            throw new DefaultError('task not found', 404)
        }

        return true
    }

    static async destroyTask(taskId) {
        await this.validateDeleteTask(taskId)
        await this.checkIfTaskExist(taskId)

        await taskRepository.destroyTask(taskId)

        return true
    }
}

module.exports = TaskDestroyService
