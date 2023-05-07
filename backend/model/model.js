const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userModel = new Schema({
    title:{
        type:String,
        required:true
    },
    details:{
        type:String,
        required:true
    },
    marked:{
        type:String,
        required:true,
        default:'Task Pending'
    },
    color:{
        type:String,
        required:true,
        default:'yellow'
    },
    color_card:{
        type:String,
        required:true,
        default:'purple.400'
    }
}, {timestamps:true})


module.exports = mongoose.model('TODO_LIST' , userModel)