const User = require('../models/userModel.js');
// import asyncHandler from 'express-async-handler';
const bcrypt = require("bcrypt");
const OTP = require("../models/OTP.js");
const otpGenerator = require("otp-generator");
const { generateToken } = require('../utils/generateToken.js');
require("dotenv").config();


exports.registerUser = async (req, res) => {
    try{
    const { firstName, lastName, email, password, confirmPassword, otp } = req.body;

     //validation
     if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
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

    //otp verify
    const recentOtp = await OTP.find({email}).sort({createdAt:-1}).limit(1);
    console.log("recentOtp=> ",recentOtp);

    if(recentOtp.length === 0)
    {
        //OTP not found
        return res.status(400).json({
            succes:false,
            message:"OTP not found",
        });
    } else if(otp !== recentOtp[0].otp){

        //Invalid OTP
        return res.status(400).json({
            succes:false,
            message:"Invlid OTP",
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
        accountType: "Member",
    });

    console.log("signup user=> ",user);

    if(user)
    {
        // const payload = {
        //     email: user.email,
        //     id: user._id,
        // }
        generateToken(res, user._id);

        console.log("user registered successfully");
        return res.status(201).json({
            // _id: user._id,
            // firstname: user.firstName,
            // lastName: user.lastName,
            // email: user.email,
            // password: user.password,
            // accountType: user.accountType,
            success: true,
            message: "User registered Successfully",
            user
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

exports.loginUser = async(req, res) => {
    try{

        const { email, password } = req.body;

        // Validation
        if(!email || !password)
        {
            return res.status(403).json({
                success: false,
                message: "Please fill required fields"
            });
        }

        //check user exists in Db or not
        const user = await User.findOne({ email });
        console.log("user in db=> ",user);

        if(!user)
        {
            return res.status(402).json({
                success: false,
                message: "User not exists, Please Signup first"
            });
        }

        if(user && await bcrypt.compare(password, user.password))
        {
            // const payload = {
            //     email: user.email,
            //     id: user._id,
            // }
            
            generateToken(res, user._id);

            console.log("Logged in Successfully");

            return res.status(200).json({
                success: true,
                message: "Logged in Successfully",
                user
                // _id: user._id,
                // firstName: user.firstName,
                // lastName: user.lastName,
                // email: user.email,
                // accountType: user.accountType
            });
        }

    }
    catch(error)
    {
        console.log("error=> ",error);
        return res.status(400).json({
            success: false,
            message: "Unable to login the user"
        })
    }
}

exports.logoutUser = async(req, res) => {
    res.cookie('jwt', '', {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
};



//sendOTP
exports.sendOTP = async (req, res) => {
    try{
    
        //fetch email from req body
        const { email } = req.body;

        console.log("email=> ",email);

        //check if user already exists
        const checkUserPresent = await User.findOne({email});

         //if user already exit, then return a response
         if(checkUserPresent)
         {
             return res.status(401).json({
                 succes:false,
                 message:'User already registered',
             })
         }

        //generate otp
        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });

        //it includes only number
        console.log("OTP generated: ", otp);

        //check uniques otp or not
        let result = await OTP.findOne({otp: otp});

        //if not uniques, then generate otp again
        while(result) {
            otp =  otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            // result = await OTP.findOne({otp: otp});
        }

        //now we've generated unique otp, now insert into db

        const otpPayload = {email, otp};

        //create an entry for DB
        const otpBody = await OTP.create(otpPayload);
        console.log("otpBody=> ", otpBody);

        //return response successful
        res.status(200).json({
            success:true,
            message:'OTP sent Succefully',
            otp,
        });


}
catch(error){
    console.log("error=> ",error);
    return res.status(400).json({
        success: false,
        message: "Unable to send OTP to the user"
    })

}



};


  



