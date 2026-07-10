const express=require('express');
const app=express();
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/postRoutes');
const commentRoutes=require('./routes/comment.routes');
const userRoutes=require('./routes/user.routes');
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/create',postRoutes);
app.use('/api',commentRoutes);
app.use('/api',userRoutes)

module.exports=app;