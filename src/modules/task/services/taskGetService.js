const taskValidation = require('../taskValidation')
const taskRepository = require('../taskRepository')
const DefaultError = require('../../../lib/defaultError')

class TaskGetService {
    static async validateGetService({ userId, title, taskId, notDisplaySummary }) {
        try {
            await taskValidation.taskFindValidation({ userId, title, taskId, notDisplaySummary })
        } catch (error) {
            throw new DefaultError(error.message, 400)
        }

        return true
    }

    static buildQuery({ userId, title, taskId }) {
        const query = {}

        if (userId) query.user_id = userId
        if (title) query.title = title
        if (taskId) query.id = taskId

        return query
    }

    static buildAttributes({ notDisplaySummary }) {
        const attributes = {}
        if (notDisplaySummary) {
            attributes.exclude = ['summary']
        }

        return attributes
    }

    static async validateIfTasksExist(tasks) {
        if (!tasks || tasks.length <= 0) {
            throw new DefaultError('There are no tasks for this user', 404)
        }

        return true
    }

    static async getTasks({ userId, title, taskId, notDisplaySummary }) {
        await this.validateGetService({ userId, title, taskId, notDisplaySummary })

        const query = this.buildQuery({ userId, title, taskId })
        const attributes = this.buildAttributes({ notDisplaySummary })

        const tasks = await taskRepository.findTasks(query, attributes)

        await this.validateIfTasksExist(tasks)

        return tasks
    }
}

module.exports = TaskGetService
