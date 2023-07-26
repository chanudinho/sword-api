require('dotenv').config({ path: 'env/.env' })
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const routes = require('./src/modules/router')
const appError = require('./src/middlewares/appError')

const port = process.env.PORT || 3000

const app = express()
app.use(cors())

app.use(express.json())
app.use(routes)
app.use(appError)

app.listen(port, () => console.log(`Server listening on port ${port}`))
