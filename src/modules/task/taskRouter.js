const router = require('express').Router()
const taskController = require('./taskController')
const authentication = require('../../middlewares/authentication')

router.post('/', authentication('technician'), taskController.createTask)
router.get('/', authentication('manager'), taskController.getTasks)
router.get('/my', authentication(), taskController.getAllMyTasks)

module.exports = router
