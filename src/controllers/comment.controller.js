const prisma=require('../lib/prisma');

async function createComment(req,res){
    const {text}=req.body; // {} means object destructing
    const authorId=req.user.id // authorId is already a string so it doesnt require object destructing
    const {postId}=req.params;

    const isPostThere=await prisma.post.findUnique({
        where:{
            id:postId
        }
    })

    if(!isPostThere){
        return res.status(404).json({
            message:"Post not found"
        })
    }

    const isAuthorValid=await prisma.user.findUnique({
        where:{
            id:authorId
        }
    })

    if(!isAuthorValid){
        return res.status(401).json({
            message:"The author isnt valid"
        })
    }

    const comment=await prisma.comment.create({
        data:{
            text,
            postId,
            authorId
        }
    })

    return res.status(201).json({
        message:"Comment submitted successfully",
        comment
    })
}



module.exports={createComment};