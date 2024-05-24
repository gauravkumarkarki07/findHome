import userModel from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const SignUp=async(req,res)=>{
    const{username,email,password}=req.body;
    try {
        const validUser=await userModel.findOne({
            $or:[
                {email:email},
                {username:username}
            ]
        })
        if(validUser){
            res.status(400).json({
                message:"User already exists"
            })
            return
        }
        const hashedPassword=bcryptjs.hashSync(password,10);
        const newUser=new userModel({
            username:username,
            email:email,
            password:hashedPassword,
        })
        await newUser.save();
        res.status(200).json({
            message:`${username} user created successfully`
        })
    } 
    catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const Login=async(req,res)=>{
    const{usernameOrEmail,password}=req.body;
    try {
        const validUser=await userModel.findOne({
            $or:[
                {email:usernameOrEmail},
                {username:usernameOrEmail}
            ]
        })
        if(!validUser){
            res.status(400).json({
                message:"Username or Email doesn't exists"
            })
            return
        }

        const validPassword=bcryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            res.status(400).json({
                message:"Incorrect Password"
            })
            return
        }
        const{password:pass,...userDetails}=validUser._doc;
        const token=jwt.sign({id:validUser._id},process.env.jwt_secret_key);
        res.cookie('access_token',token,{httpOnly:true})
            .status(200).json({
                userDetails:userDetails,
                message:"Login Successfull"
            })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const GoogleLogin=async(req,res)=>{
    const{email,username,profilePicture}=req.body;
    try {
        const validUser=await userModel.findOne({email:email});
        if(validUser){
            const{password:pass,...userDetails}=validUser._doc;
            const token=jwt.sign({id:validUser._id},process.env.jwt_secret_key);
            res.cookie('access_token',token,{httpOnly:true})
                .status(200).json({
                    userDetails:userDetails,
                    message:"Login Successfull wtih Google"
                })
            return;
        }
        const generetedUsername=username.replace(/ /g, '').toLowerCase();
        const generatedPassword=Math.random().toString(36).slice(-8);
        const hashedPassword=bcryptjs.hashSync(generatedPassword,10);
        const newUser=new userModel({
            email:email,
            username:generetedUsername,
            password:generatedPassword,
            profilePicture:profilePicture,
        })

        await newUser.save();
        const{password:pass,...userDetails}=newUser._doc;
            const token=jwt.sign({id:validUser._id},process.env.jwt_secret_key);
            res.cookie('access_token',token,{httpOnly:true})
                .status(200).json({
                    userDetails:userDetails,
                    message:"Login Successfull with Google"
                })

    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}