import mongoose from "mongoose";

const propertySchema=new mongoose.Schema({
    userId:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    propertyImage:{
        type:String,
        required:true,
    },
    pricePerWeek:{
        type:String,
        required:true,
    },
    bedroom:{
        type:String,
        required:true,
    },
    bathroom:{
        type:String,
        required:true,
    },
    propertyType:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    
},{timestamps:true})

const propertyModel=mongoose.model('PropertyModel',propertySchema);
export default propertyModel;