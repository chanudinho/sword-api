const taskGetService = require('../../src/modules/task/services/taskGetService')
const queryGetTask = require('../mocks/query-get-task.json')
const { validTask } = require('../mocks/task.json')
const taskRepository = require('../../src/modules/task/taskRepository')

describe('Task Get Service', () => {
    it('should validate the data needed to delete a task', async () => {
        const taskQuery = Object.create(queryGetTask)

        const response = await taskGetService.validateGetService(taskQuery)

        expect(response).toBe(true)
    })

    it('should not validate the data needed to get a task with the userId field equal to a string', async () => {
        let errorMessage = ''
        const taskQuery = Object.create(queryGetTask)

        taskQuery.userId = 'invalid'

        try {
            await taskGetService.validateGetService(taskQuery)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'userId needs to be a number',
            status: 400
        })
    })

    it('should not validate the data needed to get a task with the userId field different interger type', async () => {
        let errorMessage = ''
        const taskQuery = Object.create(queryGetTask)

        taskQuery.userId = 1.2

        try {
            await taskGetService.validateGetService(taskQuery)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'userId must be an integer',
            status: 400
        })
    })

    it('should not validate the data needed to get a task with the taskId field equal to a string', async () => {
        let errorMessage = ''
        const taskQuery = Object.create(queryGetTask)

        taskQuery.taskId = 'invalid'

        try {
            await taskGetService.validateGetService(taskQuery)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId needs to be a number',
            status: 400
        })
    })

    it('should not validate the data needed to get a task with the taskId field different interger type', async () => {
        let errorMessage = ''
        const taskQuery = Object.create(queryGetTask)

        taskQuery.taskId = 1.2

        try {
            await taskGetService.validateGetService(taskQuery)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'taskId must be an integer',
            status: 400
        })
    })

    it('should not validate the data needed to get a task with the notDisplaySummary field equal to a string', async () => {
        let errorMessage = ''
        const taskQuery = Object.create(queryGetTask)

        taskQuery.notDisplaySummary = 'invalid'

        try {
            await taskGetService.validateGetService(taskQuery)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'notDisplaySummary needs to be a boolean',
            status: 400
        })
    })

    it('given input, it should only return existing values', async () => {
        const taskQuery = Object.create(queryGetTask)

        taskQuery.taskId = null

        const response = await taskGetService.buildQuery(taskQuery)

        expect(response).toMatchObject({
            user_id: 1,
            title: 'my new job'
        })
    })

    it('given input, it should only return existing attributes', async () => {
        const taskQuery = Object.create(queryGetTask)

        const response = await taskGetService.buildAttributes(taskQuery)

        expect(response).toMatchObject({
            exclude: ['summary']
        })
    })

    it('should pass if there is a task', async () => {
        const tasks = [validTask]

        const response = await taskGetService.validateIfTasksExist(tasks)

        expect(response).toBe(true)
    })

    it('should not pass if there is no task', async () => {
        let errorMessage = ''

        try {
            await taskGetService.validateIfTasksExist(null)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'There are no tasks for this user',
            status: 404
        })
    })

    it('should be able to get the tasks', async () => {
        const taskQuery = Object.create(queryGetTask)
        const task = {
            user_id: 1,
            title: 'my new job',
            id: 2,
            user: {
                id: 1,
                name: 'antonio'
            }
        }

        jest.spyOn(taskRepository, 'findTasks').mockResolvedValueOnce([task])

        const tasks = await taskGetService.getTasks(taskQuery)

        expect(tasks).toMatchObject([
            {
                title: taskQuery.title,
                user_id: taskQuery.userId,
                id: taskQuery.taskId,
                user: {
                    id: 1,
                    name: 'antonio'
                }
            }
        ])
    })
})
