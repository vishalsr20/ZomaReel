const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    itemId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"food",
        required:true
    },
    comments:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


module.exports = mongoose.model("comment",commentSchema)