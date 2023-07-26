const taskUpdateService = require('../../src/modules/task/services/taskUpdateService')
const { validUptateTask, taskWithBigTitle, taskWithBigSummary, validTask } = require('../mocks/task.json')
const taskRepository = require('../../src/modules/task/taskRepository')
const rabbitMq = require('../../src/lib/rabbitMq')

describe('Task Update Service', () => {
    it('should validate the data needed to update a task', async () => {
        const taskToupdate = Object.create(validUptateTask)

        const response = await taskUpdateService.validateUpdateService(taskToupdate)

        expect(response).toBe(true)
    })

    it('should not validate the data needed to update a task with empty userId field', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.userId = null

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'userId is a required field',
            status: 400
        })
    })

    it('should not validate the data needed to update a task with the userId field equal to a string', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.userId = 'invalid'

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'userId needs to be a number',
            status: 400
        })
    })

    it('should not validate the data needed to update a task with the userId field different interger type', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.userId = 1.2

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'userId must be an integer',
            status: 400
        })
    })

    it('should not validate the data needed to update a task with empty taskId field', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.taskId = null

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId is a required field',
            status: 400
        })
    })

    it('should not validate the data needed to update a task with the taskId field equal to a string', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.taskId = 'invalid'

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId needs to be a number',
            status: 400
        })
    })

    it('should not validate the data needed to update a task with the taskId field different interger type', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.taskId = 1.2

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId must be an integer',
            status: 400
        })
    })

    it('should not validate user with title equal to null', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.title = null

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'title cannot be null',
            status: 400
        })
    })

    it('should not validate user with title greater than 255 characters', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(taskWithBigTitle)
        taskToupdate.taskId = 2

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'title must be at most 255 characters',
            status: 400
        })
    })

    it('should not validate user with summary equal to null', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(validUptateTask)

        taskToupdate.summary = null

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'summary cannot be null',
            status: 400
        })
    })

    it('should not validate user with summary greater than 2500 characters', async () => {
        let errorMessage = ''
        const taskToupdate = Object.create(taskWithBigSummary)
        taskToupdate.taskId = 2

        try {
            await taskUpdateService.validateUpdateService(taskToupdate)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'summary must be at most 2500 characters',
            status: 400
        })
    })

    it('should pass if the task exists', async () => {
        const task = Object.create(validTask)

        const response = taskUpdateService.checkIfTaskExist(task)

        expect(response).toBe(true)
    })

    it('should not pass without task', async () => {
        let errorMessage = ''

        try {
            taskUpdateService.checkIfTaskExist(null)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'task not found',
            status: 404
        })
    })

    it('should pass if the user id of the task is the same as the id of the user that is using the system', async () => {
        const task = {
            user_id: 1
        }

        const response = taskUpdateService.checkIfIsUserTask(task, 1)

        expect(response).toBe(true)
    })

    it('should not pass if the user id of the task is different as the id of the user that is using the system', async () => {
        let errorMessage = ''
        const task = { user_id: 2 }

        try {
            taskUpdateService.checkIfIsUserTask(task, 1)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: "You are trying to update a task that you don't own",
            status: 401
        })
    })

    it('given input, it should only return existing attributes', async () => {
        const taskToupdate = Object.create(validUptateTask)
        taskToupdate.completedAt = null

        const task = taskUpdateService.buildUpdateObject(taskToupdate)

        expect(task).toMatchObject({
            title: taskToupdate.title,
            summary: taskToupdate.summary
        })
    })

    it('should pass if the task has not yet been completed', async () => {
        const task = Object.create(validTask)

        const response = taskUpdateService.checkIfCompleted(task)

        expect(response).toBe(true)
    })

    it('should not pass if the task has not yet been completed', async () => {
        let errorMessage = ''
        const task = Object.create(validTask)
        task.completed_at = new Date()

        try {
            taskUpdateService.checkIfCompleted(task)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'you cannot update a task that has already been completed',
            status: 400
        })
    })

    it('given input, it should return a task updated', async () => {
        const taskToupdate = Object.create(validUptateTask)
        const task = Object.create(validTask)
        task.user_id = 1

        jest.spyOn(taskRepository, 'findById').mockResolvedValueOnce(task)
        jest.spyOn(taskRepository, 'updateTask').mockResolvedValueOnce(taskToupdate)
        jest.spyOn(rabbitMq, 'sendData').mockResolvedValue(true)

        const taskUpdated = await taskUpdateService.updateTask(taskToupdate.userId, taskToupdate)

        expect(taskUpdated).toMatchObject({
            title: taskToupdate.title,
            summary: taskToupdate.summary,
            completed_at: taskToupdate.completedAt
        })
    })
})
