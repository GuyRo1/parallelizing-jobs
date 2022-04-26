import mongoose from 'mongoose'

const connectToDb = async () => {
    try {
        const mongoDbUrl = 'mongodb://root:abc12abc12@localhost:27017/data?authSource=admin'
        await mongoose.connect(mongoDbUrl)
        console.log("connection opened");
    } catch (err) {
        console.log(err);
        throw err
    }
}

export default connectToDb
