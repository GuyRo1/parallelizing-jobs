import rabbitMQ from 'amqplib'


export const connectToQueue = async () => {
    const connection = await rabbitMQ.connect('amqp://localhost:5672')
    return await connection.createChannel()
}