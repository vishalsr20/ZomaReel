const express = require('express')
const foodPartnerModel = require('../model/foodpartner.model')
const foodModel = require('../model/fooditem.model')
const fooditemModel = require('../model/fooditem.model')
const jwt = require('jsonwebtoken')
module.exports.getFoodItemsByPartner = async  (req , res)=> {
    const foodPartnerId = req.params.id
    // console.log("ID : ",foodPartnerId)

   try{
     const foodPartner = await foodPartnerModel.findById(foodPartnerId)
     const foodItemsByFoodPartner = await foodModel.find({
        foodPartner:foodPartnerId
     })
    if(!foodPartner){
        return res.status(404).json({
            message:'Food partner not found'
        })
    }

    res.status(201).json({
        message:"Food Partner found",
        foodPartner:{
            ...foodPartner.toObject(),
            foodItems:foodItemsByFoodPartner
        }
    })
   }catch(error){
    return res.status(500).json({
        message:error.message
    })
   }
}


