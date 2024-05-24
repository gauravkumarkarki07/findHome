import express from 'express';
import { AddProperty, DeleteUser, GetAllProperties, GetMyProperties, Logout, UpdateUser } from '../controllers/userController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router=express.Router();

router.post('/logout',Logout);
router.put('/updateuser',verifyToken,UpdateUser);
router.delete('/deleteuser',verifyToken,DeleteUser);
router.post('/addproperty',verifyToken,AddProperty);
router.get('/getmyproperties/:id',verifyToken,GetMyProperties);
router.get('/getallproperties/:id',verifyToken,GetAllProperties);



export default router;