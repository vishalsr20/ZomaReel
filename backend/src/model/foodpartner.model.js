const mongoose = require('mongoose')

const foodPartnerSchema = new mongoose.Schema({
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
        
    }

},{
    timestamps:true
})

module.exports = mongoose.model('foodpartner',foodPartnerSchema)