import rabbitMQ from 'amqplib'


export const connectToQueueAndGetChannel = async () => {
    try {
        const rabbitMqConnection = await rabbitMQ.connect('amqp://localhost:5672')
        const rabbitMqChannel = await rabbitMqConnection.createChannel()
        return { rabbitMqConnection, rabbitMqChannel }
    } catch (err) {
        throw err
    }
}

export const sendMessageToBatchesQueue = async (channel, messages) => {
    try {
        const batchesQueue = 'dbRange'
        await channel.assertQueue('mongoDbBatches')
        for (let i = 0; i < messages.length; i++) {
            channel.sendToQueue(batchesQueue, Buffer.from(
                messages[i]
            ))
            console.log(`sent message:${messages[i]} to queue:${batchesQueue}`);
        }
    } catch (err) {
        throw err
    }
}