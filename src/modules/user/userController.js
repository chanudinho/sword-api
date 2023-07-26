const userCreateService = require('./services/userCreateService')

class UserController {
    static async createUser(req, res) {
        const { name, email, password, role } = req.body

        const user = await userCreateService.createUser({ name, email, password, role })

        res.status(201).json(user)
    }
}

module.exports = UserController
