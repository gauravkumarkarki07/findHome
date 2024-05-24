import express, { json } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import AuthRoute from './routes/authRoute.js';
import UserRoute from './routes/userRoute.js';

dotenv.config();

mongoose.connect(process.env.mongodb_connection_string)
    .then(()=>{
        console.log('database connected')
    })
    .catch((error)=>{
        console.log(error)
    })

const app=express();

app.listen(process.env.port,()=>{
    console.log('server is running')
})

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',AuthRoute);
app.use('/api/user',UserRoute);


app.use('*',(req,res)=>{
    res.status(400).json({
        message:"No route available"
    })
})
