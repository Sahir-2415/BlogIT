const multer=require("multer");
const path=require('path');

const storageConfig=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,'uploads/')   // destination is uploads folder in project directory
    },
    filename:(req,file,cb)=>{
        const uniqueName=Date.now()+'-'+Math.round(Math.random()*1E9);
        cb(null,uniqueName+path.extname(file.originalname)) // file name is concatenated with time for uniqueness
    }
})

//File filtering for filtering only images , CB- CALLBACK
const filerFilterConfig=function(req,file,cb){
    if(file.mimetype==='image/jpeg' || file.mimetype==='image/png'){
        cb(null,true); // true to store file
    }else{
        cb(null,false); // false to indicate not to store the file
    }
}

//creating multer object to store with configuration
const upload=multer({
    //applying storage and file filter
    storage:storageConfig,
    limits:{
        fileSize:1024*1024*5 // limit file size
    },
    fileFilter:filerFilterConfig
})

module.exports=upload;