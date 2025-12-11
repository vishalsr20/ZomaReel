const foodPartnerModel = require('../model/foodpartner.model')
const jwt = require('jsonwebtoken')
const userModel = require('../model/user.model')

module.exports.authFoodPartnerMiddleware = async (req, res, next) => {

    const token =  req.cookies.token 

    if(!token){
        return res.status(401).json({
            message:"please login first"
        })
    }

    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const foodPartner = await foodPartnerModel.findById(decoded.id);
        if(!foodPartner){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        req.foodPartner = foodPartner
        next();

    }catch(error){
        console.log("Error in the food-partner auth")
        return res.status(500).json({
            message:"Unauthorized"
        })
    }
}

module.exports.authUserMiddleware = async (req, res,next) => {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"Please login first"
        })
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        const user = await userModel.findById(decoded.id);
        if(!user){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }
        req.user = user;
        next()

    }catch(error){
        
        console.log("Error in the user auth")
        return res.status(500).json({
            message:error.message
        })
    
    }
}

