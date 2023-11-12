const mongoose = require('mongoose')
const configureDB=async()=>{
    try{
        const url=process.env.DB_URL||'mongodb://127.0.0.1:27017'
        const dbName=process.env.DB_NAME||'user_creds'
        const db=await mongoose.connect(`${url}/${dbName}` )
        console.log('connected to db')
    }
    catch(error){
        console.log('error connecting to db')
    }
}
module.exports= configureDB
