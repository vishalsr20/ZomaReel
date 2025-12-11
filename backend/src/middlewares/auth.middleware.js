// const foodPartnerModel = require('../model/foodpartner.model')
// const jwt = require('jsonwebtoken')
// const userModel = require('../model/user.model')

// module.exports.authFoodPartnerMiddleware = async (req, res, next) => {

//     const token =  req.cookies.token 

//     if(!token){
//         return res.status(401).json({
//             message:"please login first"
//         })
//     }

//     try{
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const foodPartner = await foodPartnerModel.findById(decoded.id);
//         if(!foodPartner){
//             return res.status(401).json({
//                 message:"Unauthorized"
//             })
//         }
//         req.foodPartner = foodPartner
//         next();

//     }catch(error){
//         console.log("Error in the food-partner auth")
//         return res.status(500).json({
//             message:"Unauthorized"
//         })
//     }
// }

// module.exports.authUserMiddleware = async (req, res,next) => {
//     const token = req.cookies.token;
//     if(!token){
//         return res.status(401).json({
//             message:"Please login first"
//         })
//     }
//     try{
//         const decoded = jwt.verify(token,process.env.JWT_SECRET)
//         const user = await userModel.findById(decoded.id);
//         if(!user){
//             return res.status(401).json({
//                 message:"Unauthorized"
//             })
//         }
//         req.user = user;
//         next()

//     }catch(error){
        
//         console.log("Error in the user auth")
//         return res.status(500).json({
//             message:error.message
//         })
    
//     }
// }


// backend/src/middleware/auth.middleware.js
const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');
const foodPartnerModel = require('../model/foodpartner.model');

function getTokenFromRequest(req) {
  // Prefer cookie
  if (req.cookies && req.cookies.token) return req.cookies.token;

  // Fallback to Authorization header: "Bearer <token>"
  const authHeader = req.headers?.authorization;
  if (authHeader && typeof authHeader === 'string' && authHeader.startsWith('Bearer ')) {
    return authHeader.split(' ')[1];
  }

  return null;
}

function verifyToken(token) {
  // jwt.verify will throw for invalid/expired tokens; caller should handle
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports.authFoodPartnerMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: 'Please login first' });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      // common JWT errors: TokenExpiredError, JsonWebTokenError
      console.error('FoodPartner auth: token verify failed', err.name, err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const foodPartner = await foodPartnerModel.findById(decoded.id);
    if (!foodPartner) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.foodPartner = foodPartner;
    return next();
  } catch (err) {
    console.error('Unexpected error in authFoodPartnerMiddleware', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports.authUserMiddleware = async (req, res, next) => {
  try {
    const token = getTokenFromRequest(req);
    if (!token) {
      return res.status(401).json({ message: 'Please login first' });
    }

    let decoded;
    try {
      decoded = verifyToken(token);
    } catch (err) {
      console.error('User auth: token verify failed', err.name, err.message);
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = user;
    return next();
  } catch (err) {
    console.error('Unexpected error in authUserMiddleware', err);
    return res.status(401).json({ message: 'Unauthorized' });
  }
};


