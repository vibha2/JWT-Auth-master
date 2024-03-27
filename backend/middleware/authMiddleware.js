const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require('../models/userModel');


exports.auth = async(req, res, next) => {
    try{
        console.log("hello");
        const token = req.cookies.jwt || req.header("Authorisation").replace("Bearer ","");
        console.log("token=> ", token);
        // if token is missing return response
        if(!token){
            return res.status(401).json({
                success: false,
                message: "token is missing",
            })
        }

        // verify token
        try{

            //Extract User Information from Token: If the token is successfully verified, the decoded payload of the token is extracted, which typically contains the user's unique identifier (userId).
            const decode = await jwt.verify(token, process.env.JWT_SECRET );
            console.log("decode => ", decode);

            //Fetch User from Database: The middleware function uses the extracted userId to find the corresponding user in the database using User.findById(). It selects all fields except the password field using .select('-password').

            // Attach User to Request Object: Once the user information is fetched from the database, it is attached to the req object so that subsequent middleware functions or route handlers can access it.
            
            req.user = await User.findById(decode.userId).select('-password');
            console.log("user in middleware auth => ", req.user);
            next();

        }catch (error) {
            console.error(error);
            res.status(403).json({
                success: false,
                message: "Not authorized, token failed"
            });
        }

    }catch(err){
        console.log("error=> ", err);
        return res.status(400).json({
            success: false,
            message: "Something went wrong while authentication",
        })
    }
}

exports.getUserProfile = async(req, res, next) => {
    try{
        const id = req.user._id;

        // check in db
        const user = await User.findById(id);

        if(!user)
        {
            return res.status(400).json({
                success: false,
                message: "User Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "This is Protected Route for Profile Page",
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })

        next();

    }catch(err){
        console.log("error=> ", err);
        return res.status(400).json({
            success: false,
            message: "Something went wrong while authenticatinf Profile route",
        })
    }
}