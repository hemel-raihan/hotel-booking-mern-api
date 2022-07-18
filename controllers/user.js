const User = require("../models/User");

//update  
const updateUser = async (req, res, next)=>{
    try{
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedUser);
    }
    catch(err){
        next(err)
    }
}

//delete  
const deleteUser = async (req, res, next)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('User has been deleted');
    }
    catch(err){
        next(err)
    }
}

//hotel details  
const userDetails = async (req, res, next)=>{
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user);
    }
    catch(err){
        next(err)
    }
}

//all details  
const allUsers = async (req, res, next)=>{
    try{
        const users = await User.find()
        res.status(200).json(users);
    }
    catch(err){
        next(err)
    }
}

module.exports = {
    updateUser,
    deleteUser,
    userDetails,
    allUsers
}