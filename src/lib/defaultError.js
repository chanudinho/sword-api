class DefaultError {
    constructor(message = 'unknown error, please contact dev team', status = 400) {
        this.message = message
        this.status = status
    }
}

module.exports = DefaultError
