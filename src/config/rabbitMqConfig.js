module.exports = {
    user: process.env.RABBITMQ_USER,
    password: process.env.RABBITMQ_PASSWORD,
    host: process.env.RABBITMQ_HOST,
    queueName: process.env.RABBITMQ_QUEUE_NAME
}
