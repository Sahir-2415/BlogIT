const express=require('express');
const router=express.Router()
const commentController=require('../controllers/comment.controller');
const authMiddleware=require('../middlewares/auth.middleware');

// console.log("comment routes loaded")
router.post('/posts/:postId/comments',authMiddleware.authUser,commentController.createComment);
router.get('/posts/:postId/comments',authMiddleware.authUser,commentController.getComments);
router.put('/comments/:id',authMiddleware.authUser,commentController.updateComment);
router.delete('/comments/:id',authMiddleware.authUser,commentController.deleteComment);


module.exports=router;