const User = require('../models/userModel.js');
// import asyncHandler from 'express-async-handler';
const bcrypt = require("bcrypt");
const { generateToken } = require('../utils/generateToken.js');
require("dotenv").config();


exports.registerUser = async (req, res) => {
    try{

    const { firstName, lastName, email, password, confirmPassword } = req.body;

     //validation
     if(!firstName || !lastName || !email || !password || !confirmPassword){
        return res.status(403).json({
            success: false,
            message: "All Fields are required",
        });
    }

    //password match
    if (password !== confirmPassword) {
        return res.status(400).json({
          success: false,
          message:
            "Password and Confirm Password value does not match, please try again",
        });
    }

    //Check User already exists or not
    const userExists = await User.findOne({ email });
    if(userExists)
    {
        return res.status(400).json({
            success: false,
            message: "User already exists",
        });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    console.log("password=> ",password);

    const user = await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });

    console.log("signup user=> ",user);

    if(user)
    {
        const payload = {
            email: user.email,
            id: user._id,
        }
        generateToken(res, payload);

        console.log("user registered successfully");
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            success: true,
            message: "User registered Successfully",
        })
       
    }
    else {
        return res.status(400).json({
            success: false,
            message:"Invalid User data",
        });
        // throw new Error('Invalid user data');
    }

}
catch(error){
    console.log("error=> ",error);
    return res.status(400).json({
        success: false,
        message: "Unable to register the user"
    })

}



};



