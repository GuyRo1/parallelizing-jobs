 

 import connectToDb from './db.js'
import Data from './model.js'

const generateMockData = async () => {

    const data =
        new Array(1000000).fill(0).map(() => ({ value: Math.ceil(Math.random() * 1000) }))
   

    await connectToDb()
    console.log("adding allot of data to DB please be patient");
    await Data.insertMany(data)
    console.log("added data to mongodb");
}



generateMockData()
    .then()
    .catch(console.error)

