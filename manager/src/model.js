import mongoose from 'mongoose';

const  Schema  = mongoose.Schema;

const dataSchema = new Schema({value: Number,});

const Data = mongoose.model('Data', dataSchema)

export default Data