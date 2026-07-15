const express=require('express');
const router=express.Router();
const postController=require('../controllers/post.controller');
const authMiddleware=require('../middlewares/auth.middleware')
console.log("router is entering here")

// router.post('', postController.createPost);
router.post('/create', postController.createPost);
// router.post('/post', postController.createPost);
router.get('/drafts',authMiddleware.authUser,postController.getMyDrafts)
router.patch('/:id/publish',authMiddleware.authUser,postController.publishPost);
router.patch('/:id/unpublish',authMiddleware.authUser,postController.unpublishPost);
module.exports=router;