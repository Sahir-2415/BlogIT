const express=require('express');
const router=express.Router();
const userController=require('../controllers/user.controller')

router.get('/users/:id',userController.getUserProfile);
router.put('/users/:id',userController.updateProfile);

module.exports=router;