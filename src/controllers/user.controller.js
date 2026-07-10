const prisma=require('../lib/prisma');

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


module.exports={getUserProfile,updateProfile}