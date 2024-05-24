import jwt from 'jsonwebtoken'

export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        res.status(404).json({
            message:"Unauthorized"
        })
        return
    }
    jwt.verify(token,process.env.jwt_secret_key,(err,token)=>{
        if(err){
            res.status(404).json({
                message:"Unauthorized"
            })
            return
        }
        req.token=token;
        next();
    })

}