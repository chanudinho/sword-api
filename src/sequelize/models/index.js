const Sequelize = require('sequelize')
const config = require('../../config/database')
const user = require('./user')

const sequelize = new Sequelize(config.database, config.username, config.password, {
    ...config,
    logging: false
})

const models = {
    User: user.init(sequelize)
}

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models))

const db = {
    ...models,
    sequelize
}

module.exports = db
