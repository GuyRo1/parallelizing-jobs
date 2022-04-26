import mongoose from 'mongoose';
const { Schema } = mongoose;

const dataSchema = new Schema({
  value:  Number, 
});

const Data = mongoose.model('Data',dataSchema)

export default Data