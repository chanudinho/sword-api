const amqlib = require('amqplib')
const rabbitMq = require('../../src/lib/rabbitMq')

describe('Task Create Service', () => {
    it('should open connection successfully', async () => {
        const mockChannel = {
            assertQueue: jest.fn()
        }
        const mockConnection = {
            createChannel: jest.fn().mockImplementation(async () => {
                return mockChannel
            })
        }
        jest.spyOn(amqlib, 'connect').mockImplementation(() => {
            return mockConnection
        })

        await rabbitMq.openConnection('1234')

        expect(amqlib.connect).toHaveBeenCalledWith(
            `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASSWORD}@${process.env.RABBITMQ_HOST}/`
        )
        expect(mockConnection.createChannel).toHaveBeenCalled()
        expect(mockChannel.assertQueue).toHaveBeenCalledWith(process.env.RABBITMQ_QUEUE_NAME, { durable: true })
    })

    it('should open send message with success', async () => {
        const mockClose = jest.fn()
        const mockSendToQueue = jest.fn()

        jest.spyOn(rabbitMq, 'openConnection').mockImplementation(() => {
            return {
                channel: {
                    sendToQueue: mockSendToQueue,
                    close: mockClose
                },
                connection: {
                    close: mockClose
                }
            }
        })

        const message = { title: 'hello' }

        await rabbitMq.sendData(message)

        expect(mockSendToQueue).toHaveBeenCalledWith(
            process.env.RABBITMQ_QUEUE_NAME,
            Buffer.from(JSON.stringify(message)),
            {
                persistent: true
            }
        )
    })
})
