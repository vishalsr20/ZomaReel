const userModel = require('../model/user.model')
const foodpartner = require('../model/foodpartner.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const foodpartnerModel = require('../model/foodpartner.model')
module.exports.registerUser = async (req, res) => {
    try{
        const {fullName , email, password} = req.body;
        const isUserAlreadyExists = await userModel.findOne({email})
        if(isUserAlreadyExists){
            return res.status(400).json({
                message:"User already exist"
            })
        }
        const hashPassword =await bcrypt.hash(password,10);
        const user = await userModel.create({
            fullName,
            email,
            password:hashPassword
        })

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        await user.save();

        res.status(201).json({
            message:"User registered Successfully",
            user:{
                id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        })


    }catch(error){
        console.log("Error in the register controller")
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports.loginUser = async (req, res) => {
    try{
        const {email , password} = req.body;
        const user = await userModel.findOne({email})

        if(!user){
            return res.status(403).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(403).json({
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(200).json({
            message:"User login Successfully",
            user:{
                id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        })

        
    }catch(error){
        console.log("Error in the login controller")
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports.logoutUser = async (req, res) => {
    try{
        res.clearCookie("token")
        res.status(200).json({
            message:"User logout successfully"
        })
    }catch(error){
        console.log("Error in the logout controller")
        return res.status(500).json({
            message:error.message
        })
    }
}


/// food partner

module.exports.registeredFoodPartner = async (req, res) => {
    try{
        const {fullName , email, password} = req.body;
        const isUserAlreadyExists = await foodpartnerModel.findOne({email})
        if(isUserAlreadyExists){
            return res.status(400).json({
                message:"Foodpartner already exist"
            })
        }
        const hashPassword =await bcrypt.hash(password,10);
        const user = await foodpartnerModel.create({
            fullName,
            email,
            password:hashPassword
        })

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        await user.save();

        res.status(201).json({
            message:"FoodPartner registered Successfully",
            user:{
                id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        })


    }catch(error){
        console.log("Error in the foodpartner registration controller")
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports.foodpartnerLogin = async (req, res) => {
    try{
        const {email , password} = req.body;
        const user = await foodpartnerModel.findOne({email})

        if(!user){
            return res.status(403).json({
                message:"Invalid email or password"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password,user.password);

        if(!isPasswordMatch){
            return res.status(403).json({
                message:"Invalid email or password"
            })
        }

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token)

        res.status(200).json({
            message:"foodpartner login Successfully",
            user:{
                id:user._id,
                email:user.email,
                fullName:user.fullName
            }
        })

        
    }catch(error){
        console.log("Error in the login foodpartne controller")
        return res.status(500).json({
            message:error.message
        })
    }
}

module.exports.foodpartnerLogout = async (req, res) => {
    try{
        res.clearCookie("token")
        res.status(200).json({
            message:" foodpartner logout successfully"
        })
    }catch(error){
        console.log("Error in the logout foodpartner controller")
        return res.status(500).json({
            message:error.message
        })
    }
}