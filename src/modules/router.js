const router = require('express').Router()
const userRouter = require('./user/userRouter')
const sessionRouter = require('./session/sessionRouter')
const taskRouter = require('./task/taskRouter')

router.use('/user', userRouter)
router.use('/auth', sessionRouter)
router.use('/task', taskRouter)

module.exports = router
