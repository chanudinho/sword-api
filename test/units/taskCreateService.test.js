const taskCreateService = require('../../src/modules/task/services/taskCreateService')
const { taskWithBigSummary, validTask, taskWithBigTitle } = require('../mocks/task.json')
const taskRepository = require('../../src/modules/task/taskRepository')

describe('Task Create Service', () => {
    it('should validate the data needed to create a task', async () => {
        const task = Object.create(validTask)

        const response = await taskCreateService.validateCreateTask(task)

        expect(response).toBe(true)
    })

    it('should not validate user without title', async () => {
        let errorMessage = ''
        const task = Object.create(validTask)

        task.title = null

        try {
            await taskCreateService.validateCreateTask(task)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'title is a required field',
            status: 400
        })
    })

    it('should not validate user with title greater than 255 characters', async () => {
        let errorMessage = ''
        const task = Object.create(taskWithBigTitle)

        try {
            await taskCreateService.validateCreateTask(task)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'title must be at most 255 characters',
            status: 400
        })
    })

    it('should not validate user without summary', async () => {
        let errorMessage = ''
        const task = Object.create(validTask)

        task.summary = null

        try {
            await taskCreateService.validateCreateTask(task)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'summary is a required field',
            status: 400
        })
    })

    it('should not validate user with summary greater than 2500 characters', async () => {
        let errorMessage = ''
        const task = Object.create(taskWithBigSummary)

        try {
            await taskCreateService.validateCreateTask(task)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'summary must be at most 2500 characters',
            status: 400
        })
    })

    it('should not validate user without user id', async () => {
        let errorMessage = ''
        const task = Object.create(validTask)

        task.userId = null

        try {
            await taskCreateService.validateCreateTask(task)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'userId is a required field',
            status: 400
        })
    })

    it('should be create a task', async () => {
        const task = Object.create(validTask)

        jest.spyOn(taskCreateService, 'validateCreateTask').mockResolvedValueOnce(null)
        jest.spyOn(taskRepository, 'createTask').mockResolvedValueOnce({ dataValues: task })

        const response = await taskCreateService.createTask(task)

        expect(response).toMatchObject({ dataValues: task })
    })
})
