const taskDestroyService = require('../../src/modules/task/services/taskDestroyService')
const { validTask } = require('../mocks/task.json')
const taskRepository = require('../../src/modules/task/taskRepository')

describe('Task Destroy Service', () => {
    it('should validate the data needed to delete a task', async () => {
        const taskId = 1
        const response = await taskDestroyService.validateDeleteTask(taskId)

        expect(response).toBe(true)
    })

    it('should not validate the data needed to delete a task without taskId', async () => {
        let errorMessage = ''

        try {
            await taskDestroyService.validateDeleteTask(null)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId is a required field',
            status: 400
        })
    })

    it('should not validate the data needed to delete a task with the taskId field equal to a string', async () => {
        let errorMessage = ''
        const taskId = 'invalid'

        try {
            await taskDestroyService.validateDeleteTask(taskId)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId needs to be a number',
            status: 400
        })
    })

    it('should not validate the data needed to delete a task with the taskId field different interger type', async () => {
        let errorMessage = ''
        const taskId = 1.2

        try {
            await taskDestroyService.validateDeleteTask(taskId)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId must be an integer',
            status: 400
        })
    })

    it('should pass if task is found successfully', async () => {
        const taskId = 1
        const task = Object.create(validTask)

        jest.spyOn(taskRepository, 'findById').mockResolvedValueOnce(task)

        const response = await taskDestroyService.checkIfTaskExist(taskId)

        expect(response).toBe(true)
    })

    it('should not pass if task not found', async () => {
        let errorMessage = ''
        const taskId = 1

        jest.spyOn(taskRepository, 'findById').mockResolvedValueOnce()

        try {
            await taskDestroyService.checkIfTaskExist(taskId)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'task not found',
            status: 404
        })
    })

    it('should delete a task', async () => {
        const taskId = 1

        jest.spyOn(taskDestroyService, 'validateDeleteTask').mockResolvedValueOnce(null)
        jest.spyOn(taskDestroyService, 'checkIfTaskExist').mockResolvedValueOnce()
        jest.spyOn(taskRepository, 'destroyTask').mockResolvedValueOnce()

        const response = await taskDestroyService.destroyTask(taskId)

        expect(response).toBe(true)
    })
})
