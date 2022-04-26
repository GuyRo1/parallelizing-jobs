import connectToDb from './db.js';
import Data from './model.js';
import { connectToQueueAndGetChannels, sendTaskToTasksQueue } from './rabbitmq.js';

const documentsRangeQueue = 'dbRange'

const consumeIdBatchesAndSendTasksToQueue = async (rabbitMqChannels) => {
    try {
        console.log("waiting for messages");
        await rabbitMqChannels.getBatches.assertQueue(documentsRangeQueue)
        rabbitMqChannels.getBatches.consume(documentsRangeQueue, async message => {
            try {
                const { skip, limit } = JSON.parse(message.content.toString())
                console.log(skip,limit);
                const data = await Data.find().skip(skip).limit(limit)
                const tasks = data.map(item => item.value)
                await sendTaskToTasksQueue(rabbitMqChannels.sendTasks, tasks)
                rabbitMqChannels.getBatches.ack(message)
            } catch (error) {
                throw error
            }
        })
    } catch (err) {
        throw err
    }
}

const runProcess = async () => {
    try {
        await connectToDb()
        const { rabbitMqConnection, channels } =
            await connectToQueueAndGetChannels()
        await consumeIdBatchesAndSendTasksToQueue(channels)
    } catch (err) {
        throw err
    }
}

runProcess()
    .then()
    .catch(
        error => {
            console.error(error)
        })