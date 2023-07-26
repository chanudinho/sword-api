const DefaultError = require('../../src/lib/defaultError')

describe('Default Error Lib', () => {
    it('should be from the DefaultError instance, and returns the data passed', async () => {
        const message = 'test'
        const status = 404
        const defaultErrorObject = new DefaultError(message, status)

        expect(defaultErrorObject).toBeInstanceOf(DefaultError)
        expect(defaultErrorObject).toMatchObject({
            message,
            status
        })
    })

    it('should be returns the default values', async () => {
        const defaultErrorObject = new DefaultError()

        expect(defaultErrorObject).toMatchObject({
            message: 'unknown error, please contact dev team',
            status: 400
        })
    })
})
