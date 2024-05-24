import propertyModel from '../models/propertyModel.js';
import userModel from '../models/userModel.js';

export const Logout=async(req,res)=>{
    try {
        res.clearCookie('access_token')
            .status(200).json({
                message:"Logout Successfull"
            })
    } catch (error) {
        res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

export const UpdateUser = async (req, res) => {
    const { userId, firstname, lastname, phonenumber, address, email, profilePicture } = req.body;
    if (req.token.id !== userId) {
        res.status(400).json({
            message: "You are not allowed to update this user"
        });
        return;
    }

    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, {
            firstname,
            lastname,
            phonenumber,
            address,
            email,
            profilePicture
        }, { new: true }); // { new: true } option returns the updated user

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        const {password:pass,...userDetails}=updatedUser._doc;
        res.status(200).json({
            userDetails:userDetails,
            message:"Updated Successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}


export const DeleteUser=async(req,res)=>{
    if (req.token.id !== req.body.userId) {
        return res.status(400).json({ message: "You are not allowed" });
    }
    try{
        await userModel.findByIdAndDelete(req.body.userId);
        res.status(200).json({
            message:"User has been deleted"
        })

    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const AddProperty=async(req,res)=>{
    const{userId,title,description,propertyImage,pricePerWeek,bedroom,bathroom,propertyType,address}=req.body;
    if (req.token.id !== userId) {
        res.status(400).json({
            message: "You are not allowed to create property"
        });
        return;
    }
    try {
        const newProperty=new propertyModel({
            userId:userId,
            title:title,
            description:description,
            propertyImage:propertyImage,
            pricePerWeek:pricePerWeek,
            bedroom:bedroom,
            bathroom:bathroom,
            propertyType:propertyType,
            address:address,
        })
        await newProperty.save();
        res.status(200).json({
            message:"Property Added Successfully"
        })
    } 
    catch (error) {
        res.status(500).json({
             message: "Internal Server Error" 
        });
    }
}

export const GetMyProperties=async(req,res)=>{
    if(req.token.id!==req.params.id){
        res.status(400).json({
            message:"You are not authorized to access this data"
        })
        return
    }
    try{
        const properties=await propertyModel.find({userId:req.params.id});
        if(!properties){
            res.status(200).json({
                properties:[],
            })
            return
        }
        res.status(200).json({
            properties:properties,
            message:"Your Listed Properties"
        })
    }
    catch (error) {
        res.status(500).json({
             message: "Internal Server Error" 
        });
    }
    
}

export const GetAllProperties=async(req,res)=>{
    if(req.token.id!==req.params.id){
        res.status(400).json({
            message:"You are not authorized to access this data"
        })
        return
    }
    try{
        const properties=await propertyModel.find();
        if(!properties){
            res.status(200).json({
                properties:[],
            })
            return
        }
        res.status(200).json({
            properties:properties,
            message:"Listed Properties"
        })
    }
    catch (error) {
        res.status(500).json({
             message: "Internal Server Error" 
        });
    }
    
}
