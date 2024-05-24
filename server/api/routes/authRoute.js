import express from 'express';
import { GoogleLogin, Login, SignUp } from '../controllers/authController.js';

const router=express.Router();

router.post('/signup',SignUp);
router.post('/login',Login);
router.post('/googlelogin',GoogleLogin);

export default router;

