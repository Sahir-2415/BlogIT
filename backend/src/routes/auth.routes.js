const express=require('express');
const router=express.Router();
const authController=require('../controllers/auth.controller');
const {authLimiter}=require('../middlewares/rateLimit.middleware');
router.post('/register',authLimiter,authController.registerUser);
router.post('/login',authLimiter,authController.LoginUser);
router.get("/verify-email",authController.verifyEmail);
router.post('/forgot-password',authLimiter,authController.forgotPassword)
router.post('/reset-password',authController.resetPassword);
module.exports=router;