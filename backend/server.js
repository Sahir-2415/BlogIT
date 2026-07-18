require('dotenv').config();
const app=require('./src/app');
// const connectDB=require('./src/config/db');
// connectDB();

// console.log('server cwd:', process.cwd());
// console.log('server entry:', __filename);
// console.log('app entry:', require.resolve('./src/app'));

// console.log(process.env.DATABASE_URL);


// process.on("exit",(code)=>{
//     console.log("EXIT:",code);
// })

// process.on("beforeExit",(code)=>{
//     console.log("BEFORE EXIT:",code);
// })

// process.on("uncaughtException", (err) => {
//     console.error(err);
// });

// process.on("unhandledRejection", (err) => {
//     console.error(err);
// });

// console.log(typeof app);
// console.log(typeof app.listen);
// console.log(app);

app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})