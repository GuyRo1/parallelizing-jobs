import Data from './model.js'
import connectToDb from './db.js'
import { connectToQueueAndGetChannel, sendMessageToBatchesQueue } from './rabbitmq.js';

const createBatchesAndSendToQueue = async (rabbitMQChannel) => {
    const dataCount = await Data.estimatedDocumentCount();
    const amount = 100
    const messages = new Array(Math.ceil(dataCount / amount)).fill(0)
        .map((item, index) =>
        (
            JSON.stringify({
                skip: amount * index,
                limit: amount
            })
        ))

    sendMessageToBatchesQueue(rabbitMQChannel, messages)
}

const runProcess = async () => {
    try {
        await connectToDb()
        const { rabbitMqConnection, rabbitMqChannel } =
            await connectToQueueAndGetChannel()
        await createBatchesAndSendToQueue(rabbitMqChannel)
        return rabbitMqConnection
    } catch (err) {
        throw err
    }
}

runProcess()
    .then()
    .catch(console.error)