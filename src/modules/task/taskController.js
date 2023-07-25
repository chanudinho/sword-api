const taskCreateService = require('./services/taskCreateService')
const taskGetService = require('./services/taskGetService')

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
}

module.exports = TaskController
