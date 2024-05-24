import mongoose from "mongoose";
import { type } from "os";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    profilePicture:{
        type:String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQADjfoADAlJPrsl_hiiOMeE-FBor-i6hEAVg&s"
    },
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    address:{
        type:String
    },
    phonenumber:{
        type:String
    }
},{timestamps:true})

const userModel=mongoose.model('UserModel',userSchema);

export default userModel;