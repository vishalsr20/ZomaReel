const mongoose = require('mongoose')
const { comments } = require('../controllers/food.controller')

const foodSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    video:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    foodPartner:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'foodpartner'
    },
    likeCount:{
        type:Number,
        default:0
    },
     savesCount: {
        type: Number,
        default: 0
    },
    comments:{
        type:[]

    }
},{
    timestamps:true
})

module.exports = mongoose.model("food",foodSchema)