const mongoose=require('mongoose')
const Schema=mongoose.Schema
const userSchema=new Schema({
    customerName:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true

    },
    gender:{
        type:String,
        enum:['male','female','transgender']

    },
    preferredCategory:{
        type:String
    }

},{timestamps:true})
const User=mongoose.model('User',userSchema)
module.exports=User