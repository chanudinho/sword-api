const router = require('express').Router()
const userRouter = require('./user/userRouter')

router.use('/user', userRouter)

module.exports = router
