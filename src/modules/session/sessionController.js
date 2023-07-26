const AuthenticateUserService = require('./services/authenticateUserService')

class SessionController {
    static async autenticate(req, res) {
        const { email, password } = req.body

        const { user, token } = await AuthenticateUserService.autenticate({ email, password })

        res.json({ user, token })
    }
}

module.exports = SessionController
