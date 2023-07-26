const bcrypt = require('bcryptjs')
const { verify } = require('jsonwebtoken')
const userMock = require('../mocks/user.json')
const authenticateUserService = require('../../src/modules/session/services/authenticateUserService')
const userRepository = require('../../src/modules/user/userRepository')

describe('Autenticate User Service', () => {
    it('should validate if the user exists', async () => {
        const user = Object.create(userMock)

        const response = authenticateUserService.checkIfUserExist(user)

        expect(response).toBe(true)
    })

    it('should not validate if user does not exist', async () => {
        let errorMessage = ''

        try {
            authenticateUserService.checkIfUserExist(null)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'Incorrect email or password',
            status: 401
        })
    })

    it('should validate if the password is the same', async () => {
        const user = Object.create(userMock)
        user.password = await bcrypt.hash('123456', 8)

        const response = await authenticateUserService.checkPassword(user, '123456')

        expect(response).toBe(true)
    })

    it('should not validate if the password is different', async () => {
        let errorMessage = ''
        const user = Object.create(userMock)
        user.password = await bcrypt.hash('123456', 8)

        try {
            await authenticateUserService.checkPassword(user, '1234567')
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'Incorrect email or password',
            status: 401
        })
    })

    it('should successfully authenticate', async () => {
        const user = Object.create(userMock)
        user.id = 1

        jest.spyOn(userRepository, 'findByEmail').mockResolvedValueOnce(user)
        jest.spyOn(authenticateUserService, 'checkPassword').mockResolvedValueOnce(true)

        const { token } = await authenticateUserService.autenticate({ email: user.mail, password: user.password })

        const decoded = verify(token, process.env.JWT_SECRET)

        expect(decoded.id).toBe(1)
        expect(decoded.role).toBe('Manager')
    })
})
