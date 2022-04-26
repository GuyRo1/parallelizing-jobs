import connectToDb from './db.js'
import Data from './model.js'

const generateMockData = async () => {

    

    await connectToDb()
    await Data.deleteMany()
    console.log("deleted data from mongodb");
}



generateMockData()
    .then()
    .catch(console.error)

