const userModel = require('../model/user.model')
const foodpartner = require('../model/foodpartner.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const foodpartnerModel = require('../model/foodpartner.model')

const COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 7 days

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE
    // domain: '.onrender.com' // only add if you need cross-subdomain sharing
  };
}
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

        res.cookie("token",token , cookieOptions())

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
        console.log("Error in the register controller",error.message)
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
            id:user._id,
            role:'user'
        },process.env.JWT_SECRET)

        res.cookie("token",token, cookieOptions())

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
        res.clearCookie("token",cookieOptions())
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
        const {name , email, password, phone, address,contactName} = req.body;
        const isUserAlreadyExists = await foodpartnerModel.findOne({email})
        if(isUserAlreadyExists){
            return res.status(400).json({
                message:"Foodpartner already exist"
            })
        }
        const hashPassword =await bcrypt.hash(password,10);
        const user = await foodpartnerModel.create({
            name,
            email,
            password:hashPassword,
            phone ,
            address,
            contactName
        })

        const token = jwt.sign({
            id:user._id
        },process.env.JWT_SECRET)

        res.cookie("token",token,cookieOptions())

        await user.save();

        res.status(201).json({
            message:"FoodPartner registered Successfully",
            user:{
                id:user._id,
                email:user.email,
                name:user.name,
                address:user.address,
                phone:user.phone,
                contactName:user.contactName
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
            id:user._id,
            
        },process.env.JWT_SECRET)

        res.cookie("token",token,cookieOptions())

        res.status(200).json({
            message:"foodpartner login Successfully",
            user:{
                 id:user._id,
                email:user.email,
                name:user.name,
                address:user.address,
                phone:user.phone,
                contactName:user.contactName
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
        res.clearCookie("token",cookieOptions())
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

module.exports.checkAuthController = async (req , res) => {
    const token = req.cookies?.token
    if(!token){
        return res.status(401).json({
            authenticated: false
        })
    }

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        let role = null;
        let entity = await userModel.findById(decoded.id)
        if(entity){
            role = 'user'
        }else{
            role='foodPartner'
        }

        if(!role){
            return res.json({
                authenticated: false
            })
        }
        return res.json({
        authenticated: true,
        role,
        id: entity._id,
        });

    }catch(err){
        console.error('Error in /api/auth/check', err);
    return res.json({ authenticated: false });

    }
}



module.exports.profileUser = async (req, res) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - no token",
      });
    }

    // Decode the JWT
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(401).json({
        message: "Unauthorized - invalid token",
      });
    }

    const userId = decoded.id;


    // Fetch the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized - user not found",
      });
    }

    // Success
    return res.status(200).json({
      message: "User profile successfully",
      user
    });

  } catch (error) {
    console.log("Error in profileUser controller:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};




