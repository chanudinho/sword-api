const router = require('express').Router()
const userController = require('./userController')

router.post('/', userController.createUser)

module.exports = router
