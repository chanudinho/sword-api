const amqlib = require('amqplib')
const { user, password, host, queueName } = require('../config/rabbitMqConfig')

class RabbitMqLib {
    static async openConnection() {
        const url = `amqp://${user}:${password}@${host}/`
        const connection = await amqlib.connect(url)
        const channel = await connection.createChannel()
        await channel.assertQueue(queueName, {
            durable: true
        })
        return { channel, connection }
    }

    static async sendData(message) {
        const { channel, connection } = await this.openConnection()
        try {
            channel.sendToQueue(queueName, Buffer.from(JSON.stringify(message)), {
                persistent: true
            })
            await channel.close()
            await connection.close()
        } catch (err) {
            console.log(`Error while uploading data | ${err.message}`)
        }

        return true
    }
}

module.exports = RabbitMqLib
