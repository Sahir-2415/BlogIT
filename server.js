require('dotenv').config();
const app=require('./src/app');
// const connectDB=require('./src/config/db');
// connectDB();

// console.log(process.env.DATABASE_URL);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})