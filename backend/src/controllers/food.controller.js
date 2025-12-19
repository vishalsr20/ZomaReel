const foodModel = require('../model/fooditem.model')
const storageService = require('../services/storage.service')
const userModel = require('../model/user.model')
const {v4:uuid} = require('uuid')
const fooditemModel = require('../model/fooditem.model')
const foodpartnerModel = require('../model/foodpartner.model')
const LikeModel = require('../model/likes.models')
const SaveModel = require('../model/save.model')
const saveModel = require('../model/save.model')
const commentModel = require('../model/comments.mode')
// module.exports.createFood = async (req, res) => {

    
//     const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid())

//     const foodItem = await foodModel.create({
//         name: req.body.name,
//         description: req.body.description,
//         video: fileUploadResult.url,
//         foodPartner: req.foodPartner._id
//     })

//     res.status(201).json({
//         message: "food created successfully",
//         food: foodItem
//     })
// }

module.exports.createFood = async (req, res) => {
    try{
        const {name , description} = req.body;
        const foodPartner = req.foodPartner._id;
        const fileUploadResult = await storageService.uploadFile(req.file.buffer,uuid())
        
        const foodIten = await foodModel.create({
            name,
            description,
            video:fileUploadResult.url,
            foodPartner
        })
        res.status(201).json({
            message:"Food Created Successfully",
            food:foodIten
        })
    }catch(error){
            
            console.log("Error in the food item creation ")
            return res.status(500).json({
                message:error.message
            })
        
        }
}


module.exports.getFoodItems = async (req, res) => {
    try{
        const foodItems = await fooditemModel.find({})
        return res.status(201).json({
            message:"Food tems fetched successfully",
            foodItems
        })
    }catch(error){
          console.log("Error in the food item feed  creation ")
            return res.status(500).json({
                message:error.message
            })
    }
}

module.exports.getFoodItemsByPartner = async (req, res) => {
    try{
        const id = req.params;
        const foodPartner = await foodpartnerModel.findById(id)
        return res.send(foodPartner)

    }catch(error){
          console.log("Error in the food item feed  creation ")
            return res.status(500).json({
                message:error.message
            })
    }
}

module.exports.likeFood = async (req, res) => {
    try{
        const {foodId} = req.body
        const user = req.user;

        const isAlreadyLiked = await LikeModel.findOne({
            user:user._id,
            food:foodId
        })

        if(isAlreadyLiked){
            await LikeModel.deleteOne({
                user:user._id,
                food:foodId
            })

            await foodModel.findByIdAndUpdate(foodId,{
                $inc:{likeCount:-1}
            })

            await userModel.findByIdAndUpdate(user._id,{
                $inc:{likeCount:-1}
            })

            return res.status(200).json({
                message:"Video unlike successfully"
            })

        }
        const like = await LikeModel.create({
            user:user._id,
            food:foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc:{likeCount:1}
        })
        await userModel.findByIdAndUpdate(user._id,{
                $inc:{likeCount:1}
            })

        res.status(200).json({
            message:"Video like successfully",
            like
        })
      

    }catch(error){
        return res.status(500).json({
            message:error
        })
    }
}

module.exports.saveFood = async (req, res) => {
    const {foodId} = req.body;
    const user = req.user
    
    const isAlreadySaved = await SaveModel.findOne({
        user:user._id,
        food:foodId
    })

    if(isAlreadySaved){
        await SaveModel.deleteOne({
            user:user._id,
            food:foodId
        })

        await foodModel.findByIdAndUpdate(foodId,{
            $inc : {savesCount:-1}
        }) 
        await userModel.findByIdAndUpdate(user._id,{
            $inc:{saveCount:-1}
        })

        return res.status(200).json({
            message: "Food unsaved successfully"
        })
    }

    const save = await SaveModel.create({
            user:user._id,
            food:foodId
    })
    await foodModel.findByIdAndUpdate(foodId,{
            $inc : {savesCount:1}
        }) 
    await userModel.findByIdAndUpdate(user._id,{
            $inc:{saveCount:1}
        })    

     res.status(201).json({
        message: "Food saved successfully",
        save
    })   


}

module.exports.getSavedFood =async  (req, res) => {
    const user = req.user;

    const savedFoods = await saveModel.find({user:user._id}).populate('food')

    if (!savedFoods || savedFoods.length === 0) {
        return res.status(404).json({ message: "No saved foods found" });
    }

    res.status(200).json({
        message: "Saved foods retrieved successfully",
        savedFoods
    });
}

module.exports.comments = async (req , res) => {
    const {foodId, comments} = req.body;
    const userId = req.user;  
    console.log("userId",userId)
    console.log("User_id",userId._id)

    const newComment = await commentModel.create({
        userId,
        itemId:foodId,
        comments
    })

   
  
    await foodModel.findByIdAndUpdate(foodId,{
        $push:{comments:newComment._id}
    })

    await userModel.findByIdAndUpdate(userId._id,{
        $inc:{commentCount:1}
    })

    

    

    res.status(201).json({
        message:"Comment Added Successfully",
        newComment
    })
    
}

module.exports.getComments = async (req , res) => {
    const {itemId} = req.body;

    if (!itemId) {
      return res.status(400).json({ message: "foodId is required" });
    }


      const comments = await commentModel
            .find({ itemId: itemId })
            .populate("itemId", "name ")  
            .sort({ createdAt: -1 }); 
    return res.send({
        message:"Comments fetch successfully",
        comments
    })
}


module.exports.profileFood = async (req, res) => {

  try {
    const partner = req.foodPartner
    console.log("Partner",partner)

    if (!partner) {
      return res.status(401).json({
        message: "Unauthorized - no token",
      });
    }
    // Fetch the user
    const foodPartner = await foodpartnerModel.findById(partner._id);
    if (!foodPartner) {
      return res.status(401).json({
        message: "Unauthorized - user not found",
      });
    }

    const foodItem = await fooditemModel.find({foodPartner:partner._id});

    // Success
    return res.status(200).json({
      message: "User profile successfully",
      user:{
        partner,
        foodItem
      }
    });

  } catch (error) {
    console.log("Error in profileUser controller:", error);
    return res.status(500).json({
      message: error.message,
    });
  }
};


module.exports.getAllFoodItems = async (req, res) => {
    try{    
        const partnerId = req.foodPartner
        console.log("Partner Id",partnerId._id)
        
        if(!partnerId){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const foodItems = await foodModel.find({foodPartner:partnerId._id}).populate("foodPartner")

        res.status(200).json({
            foodItems
        })
    }catch(err){
        return res.status(500).json({
            message:err.message,
            status:false
        })
    }
}