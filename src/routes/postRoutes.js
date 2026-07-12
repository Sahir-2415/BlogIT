const express=require('express');
const router=express.Router();
const postController=require('../controllers/post.controller');

console.log("router is entering here")

// router.post('', postController.createPost);
router.post('/create', postController.createPost);
// router.post('/post', postController.createPost);

module.exports=router;