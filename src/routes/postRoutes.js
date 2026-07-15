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

router.post('/categories',authMiddleware.authAdmin,postController.createCategory);
router.get('/categories',authMiddleware.authAdmin,postController.getAllCategories);
router.patch('/categories/:id',authMiddleware.authAdmin,postController.updateCategory);
router.delete('/categories/:id',authMiddleware.authAdmin,postController.deleteCategory);

module.exports=router;