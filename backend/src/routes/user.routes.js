const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller')
const upload=require('../middlewares/upload.middleware')
const authMiddleware=require('../middlewares/auth.middleware');

router.get('/users/:id',userController.getUserProfile);
router.put('/users/:id',userController.updateProfile);
router.patch('/users/profile-picture',authMiddleware.authUser,upload.single("profilePicture"),userController.uploadProfilePicture);

module.exports=router;