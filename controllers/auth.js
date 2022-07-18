const User = require("../models/User");
const bcrypt = require('bcrypt');
const createError = require("../utils/error");
const jwt = require('jsonwebtoken')

//register  
const register = async (req, res, next)=>{
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPass
        })
        await newUser.save()

        res.status(200).json('User has been created');
    }
    catch(err){
        next(err)
    }
}

//login
const login = async (req, res, next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        
        if(!user){
            return next(createError(404, 'User not Found'))
        }

        const validate = await bcrypt.compare(req.body.password, user.password)
        if(!validate)
        {
            return next(createError(404, 'User not Found'))
        }

        //jwt token genarate
        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET);
        
        const {password, ...others} = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json(others)
    }
    catch(err){
        next(err)
    }
}


module.exports = {
    register,
    login
}