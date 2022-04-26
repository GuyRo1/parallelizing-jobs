import { connectToQueue } from './rabbitmq.js'

const queueName = 'tasks'

const performTasks = async (channel) => {

    const ok = await channel.assertQueue(queueName)
    channel.consume(queueName, msg => {
        if (msg !== null) {
            console.log(msg.content.toString());
            channel.ack(msg)
        }
    })
}



const runProcess = async () => {
    const channel = await connectToQueue()
    await performTasks(channel)
}

runProcess().then().catch(error => { console.error(error) })