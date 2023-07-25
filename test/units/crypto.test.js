const bcrypt = require('bcryptjs')
const crypto = require('../../src/lib/crypto')

describe('Crypto Lib', () => {
    it('should validate if the field exists', async () => {
        const response = crypto.validateIfFieldExist('1234')

        expect(response).toBe(true)
    })

    it('must not validate if the field does not exist', async () => {
        let errorMessage = ''

        try {
            crypto.validateIfFieldExist(null)
        } catch (error) {
            errorMessage = error
        }

        expect(errorMessage).toMatchObject({
            message: 'the field must always exist in the encryption module',
            status: 500
        })
    })

    it('should validate if the password is the same', async () => {
        const response = await crypto.encrypt('123456')

        expect(response).toMatch('$2a$08$')
    })

    it('should return true if the data is equal', async () => {
        const data = await bcrypt.hash('123456', 8)
        const response = await crypto.compareData('123456', data)

        expect(response).toBe(true)
    })

    it('should return false if data is different', async () => {
        const data = await bcrypt.hash('1234567', 8)
        const response = await crypto.compareData('123456', data)

        expect(response).toBe(false)
    })
})
