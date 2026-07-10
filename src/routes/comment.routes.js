const express=require('express');
const router=express.Router()
const commentController=require('../controllers/comment.controller');

console.log("comment routes loaded")
router.post('/posts/:postId/comments',commentController.createComment);
router.get('/posts/:postId/comments',commentController.getComments);
router.put('/comments/:id',commentController.updateComment);
router.delete('/comments/:id',commentController.deleteComment);


module.exports=router;