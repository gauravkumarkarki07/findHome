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
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}
