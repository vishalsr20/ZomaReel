const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        
    },likeCount:{
        type:Number,
        default:0
    },
    saveCount:{
        type:Number,
        default:0
    },
    commentCount:{
        type:Number,
        default:0
    }

},{
    timestamps:true
})

module.exports = mongoose.model('user',userSchema)