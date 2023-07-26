const userCreateService = require('../../src/modules/user/services/userCreateService')
const userMock = require('../mocks/user.json')
const userRepository = require('../../src/modules/user/userRepository')

describe('Create User Service', () => {
    it('should validate the user', async () => {
        const user = Object.create(userMock)
        const response = await userCreateService.validateCreateUser(user)

        expect(response).toBe(true)
    })

    it('should not validate user without name', async () => {
        let errorMessage = ''

        const user = Object.create(userMock)
        user.name = null

        try {
            await userCreateService.validateCreateUser(user)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'name is a required field',
            status: 400
        })
    })

    it('should not validate user without email', async () => {
        let errorMessage = ''

        const user = Object.create(userMock)
        user.email = null

        try {
            await userCreateService.validateCreateUser(user)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'email is a required field',
            status: 400
        })
    })

    it('should not validate when the e-mail field is not email', async () => {
        let errorMessage = ''

        const user = Object.create(userMock)
        user.email = 'invalid email'

        try {
            await userCreateService.validateCreateUser(user)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'email must be a valid email',
            status: 400
        })
    })

    it('should not validate user without role', async () => {
        let errorMessage = ''

        const user = Object.create(userMock)
        user.role = null

        try {
            await userCreateService.validateCreateUser(user)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'role is a required field',
            status: 400
        })
    })

    it('should not validate user other than manager and technician', async () => {
        let errorMessage = ''

        const user = Object.create(userMock)
        user.role = 'invalid'

        try {
            await userCreateService.validateCreateUser({
                name: 'antonio',
                password: '123456',
                email: 'antonio@gmail.com',
                role: 'invalid'
            })
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'role must be one of the following values: manager, technician',
            status: 400
        })
    })

    it('should pass if email does not exist in the database', async () => {
        jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(null)

        const response = await userCreateService.checkIfEmailIsUser('antonio@gmail.com')

        expect(response).toBe(true)
    })

    it('should not pass if email does exist in the database', async () => {
        let errorMessage = ''

        const user = Object.create(userMock)

        jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user)

        try {
            await userCreateService.checkIfEmailIsUser(user.email)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'The email has already been registered',
            status: 400
        })
    })

    it('should create a user', async () => {
        const user = Object.create(userMock)

        jest.spyOn(userCreateService, 'validateCreateUser').mockResolvedValueOnce(null)
        jest.spyOn(userCreateService, 'checkIfEmailIsUser').mockResolvedValueOnce(null)
        jest.spyOn(userRepository, 'createUser').mockResolvedValueOnce({ dataValues: user })

        const response = await userCreateService.createUser(user)

        expect(response).toMatchObject({
            dataValues: {
                name: 'antonio',
                email: 'antonio@gmail.com',
                role: 'Manager'
            }
        })
    })
})
