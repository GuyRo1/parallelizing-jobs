import rabbitMQ from 'amqplib'


export const connectToQueueAndGetChannels = async () => {
    const rabbitMqConnection = await rabbitMQ.connect('amqp://localhost:5672')
    const getBatches = await rabbitMqConnection.createChannel()
    const sendTasks = await rabbitMqConnection.createChannel()
    return { rabbitMqConnection, channels: { sendTasks, getBatches } }
}

export const sendTaskToTasksQueue = async (channel, tasks) => {
    try {
        const tasksQueue = 'tasks'
        await channel.assertQueue(tasksQueue)
        for(let i =0;i<tasks.length;i++){
            channel.sendToQueue(tasksQueue, Buffer.from(
                tasks[i].toString()
            ))
                console.log(`sent task for ${tasks[i]}`);
        }
    } catch (err) {
        throw err
    }
}