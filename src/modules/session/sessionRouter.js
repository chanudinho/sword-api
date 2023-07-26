const router = require('express').Router()
const sessionController = require('./sessionController')

router.post('/', sessionController.autenticate)

module.exports = router
