import express from 'express';
import { DeleteUser, Logout, UpdateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router=express.Router();

router.post('/logout',Logout);
router.put('/updateuser',verifyToken,UpdateUser);
router.post('/deleteuser',verifyToken,DeleteUser);


export default router;