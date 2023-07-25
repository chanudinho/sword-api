const router = require('express').Router()
const taskController = require('./taskController')
const authentication = require('../../middlewares/authentication')

router.post('/', authentication('technician'), taskController.createTask)

module.exports = router
