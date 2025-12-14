const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../model/foodpartner.model');
const userModel = require('../model/user.model');

// helper to get token from cookie or Authorization header
function getToken(req) {
  if (req.cookies?.token) return req.cookies.token;

  // optional: support Bearer token
  const auth = req.headers.authorization;
  if (auth) {
    const [type, value] = auth.split(' ');
    if (type === 'Bearer' && value) return value;
  }

  return null;
}

// ---------------- USER MIDDLEWARE ----------------

module.exports.authUserMiddleware = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userModel.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.log("Error in authUserMiddleware:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};


// ---------------- FOOD PARTNER MIDDLEWARE ----------------

module.exports.authFoodPartnerMiddleware = async (req, res, next) => {
  try {
    const token = getToken(req);
    if (!token) {
      return res.status(401).json({ message: "Please login first" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const partner = await foodPartnerModel.findById(decoded.id);

    if (!partner) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.foodPartner = partner;
    next();
  } catch (err) {
    console.log("Error in authFoodPartnerMiddleware:", err);
    return res.status(401).json({ message: "Unauthorized" });
  }
};


// module.exports.requireAuth = (roles = []) => async (req, res, next) => {
//   try {
//     const token = getToken(req);
//     if (!token) {
//       return res.status(401).json({ message: 'Please login first' });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Role check
//     if (roles.length && !roles.includes(decoded.role)) {
//       return res.status(403).json({ message: 'Forbidden' });
//     }

//     req.auth = decoded; // { id, role }

//     if (decoded.role === 'user') {
//       req.user = await userModel.findById(decoded.id);
//     } 
//     else if (decoded.role === 'food-partner') {
//       req.foodPartner = await foodPartnerModel.findById(decoded.id);
//     }

//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
// };

