const taskCreateService = require('./services/taskCreateService')
const taskGetService = require('./services/taskGetService')
const taskDestroyService = require('./services/taskDestroyService')
const taskUpdateService = require('./services/taskUpdateService')

class TaskController {
    static async createTask(req, res) {
        const userId = req.user.id
        const { title, summary } = req.body

        const task = await taskCreateService.createTask({ userId, title, summary })

        res.status(201).json(task)
    }

    static async getAllMyTasks(req, res) {
        const userId = req.user.id
        const { title, taskId } = req.query

        const tasks = await taskGetService.getTasks({ userId, title, taskId })

        return res.status(200).json(tasks)
    }

    static async getTasks(req, res) {
        const { title, taskId, userId } = req.query
        const notDisplaySummary = true

        const tasks = await taskGetService.getTasks({ userId, title, taskId, notDisplaySummary })

        return res.status(200).json(tasks)
    }

    static async destroyTask(req, res) {
        const { taskId } = req.params

        await taskDestroyService.destroyTask(taskId)

        return res.status(204).json()
    }

    static async updateTask(req, res) {
        const userId = req.user.id
        const { taskId } = req.params
        const { title, summary, completedAt } = req.body

        const task = await taskUpdateService.updateTask(userId, { title, summary, completedAt, taskId })

        return res.status(200).json(task)
    }
}

module.exports = TaskController
