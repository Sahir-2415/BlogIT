const prisma=require('../lib/prisma');
const fs=require('fs'); // to handle files
const cloudinary=require('../lib/cloudinary');
async function getUserProfile(req,res){
    try{
        const {id}=req.params;

    const user=await prisma.user.findUnique({
        where:{
            id
        },
        select:{
            id:true,
            name:true,
            profilePicture:true,
            bio:true
        }
    }) 

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    return res.status(200).json({
        user
    })
    }catch(err){
        return res.status(500).json({
            message:err.message
        })
    }
    

}

async function updateProfile(req,res){

    try{
         const {id}=req.params;
         const {profilePicture,bio}=req.body;

    const user=await prisma.user.findUnique({
        where:{
            id
        }
    }) 

    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const updatedProfile=await prisma.user.update({
        where:{
            id
        },
        data:{
            profilePicture,
            bio
        },
        select:{
            id:true,
            name:true,
            bio:true,
            profilePicture:true
        }
    })

    return res.status(200).json({
        message:"Profile updated successfully",
        user:updatedProfile
    })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }

        

}


async function uploadProfilePicture(req,res){
    try {
        const file=req.file; // no need of {} req.file is already an object
        if(!file){
            return res.status(400).json({
                message:"No image uploaded."
            })
        }
        
        //upload to cloudinary
        const result=await cloudinary.uploader.upload(file.path,{
            folder:'blog-profile-picture'
        })

        //find the current user
        const user=await prisma.user.findUnique({
            where:{
                id:req.user.id
            }
        })

        //if an old image exists , delete it
        if(user.profilePicturePublicId){
            await cloudinary.uploader.destroy(user.profilePicturePublicId)
        }

        //save URL in database
        const updatedUser=await prisma.user.update({
            where:{
                id:req.user.id
            },
            data:{
                profilePicture:result.secure_url,
                profilePicturePublicId:result.public_id
            }
        })

        //delete local temporary file
        fs.unlinkSync(file.path);

        return res.status(200).json({
            message:"Profile picture uploaded successfully",
            user:updatedUser
        })

    } catch (err) {
        console.log(err);

        // Delete temp file if upload failed
        if(req.file){
            fs.unlinkSync(req.file.path);
        }

        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports={getUserProfile,updateProfile,uploadProfilePicture}