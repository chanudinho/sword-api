const router = require('express').Router()
const userRouter = require('./user/userRouter')
const sessionRouter = require('./session/sessionRouter')

router.use('/user', userRouter)
router.use('/auth', sessionRouter)

module.exports = router
