// eslint-disable-next-line no-unused-vars
const appErrorMiddleware = (err, request, response, next) => {
    console.log(err.message || err)

    const statusCode = err.status || 500

    return response.status(statusCode).json({
        message: err.message || 'Internal server error'
    })
}

module.exports = appErrorMiddleware
