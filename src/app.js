const express=require('express');
const app=express();
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/comment.routes');
const userRoutes=require('./routes/user.routes');
const cookieParser=require('cookie-parser');
// const postController=require('./controllers/post.controller');
app.use(express.json());
app.use(cookieParser())
// app.post('/api/posts', (req, res) => {
//   console.log('POST /api/posts hit');
//   return res.status(201).json({ ok: true });
// });
// app.post('/api/posts/create', (req, res) => {
//   console.log('POST /api/posts/create hit');
//   return res.status(201).json({ ok: true });
// });
// app.post('/api/create/post', (req, res) => {
//   console.log('POST /api/create/post hit');
//   return res.status(201).json({ ok: true });
// });
// app.post('/api/create', (req, res) => {
//   console.log('POST /api/create hit');
//   return res.status(201).json({ ok: true });
// });

app.use('/api/auth',authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/create', postRoutes);
app.use('/api', commentRoutes);
app.use('/api',userRoutes)

module.exports=app;