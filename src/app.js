const express=require('express');
const app=express();
const authRoutes=require('./routes/auth.routes');
const postRoutes=require('./routes/postRoutes');
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/create',postRoutes);

module.exports=app;