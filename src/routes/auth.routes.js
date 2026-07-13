const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');

router.post('/register',authController.registerUser);
router.post('/login',authController.LoginUser);
router.get("/verify-email",authController.verifyEmail);
router.post('/forgot-password',authController.forgotPassword)
module.exports=router;