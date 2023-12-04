const mongoose = require('mongoose')
const colors = require("colors");

const connectToDb = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log(`Error occurred while connecting to mongoDB: ${err}`.red.bold)
    }
}

module.exports = connectToDb