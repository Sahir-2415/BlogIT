const prisma=require('../lib/prisma');

async function createComment(req,res){

    try{
            const {text}=req.body; // {} means object destructing
            const authorId=req.params // authorId is already a string so it doesnt require object destructing
            const {postId}=req.params;

            const isPostThere=await prisma.post.findFirst({
                where:{
                    id:postId,
                    published:true // check if the post is published or not on which you are commenting
                }
            })

            if(!isPostThere){
                return res.status(404).json({
                    message:"Post not found or is not published"
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
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error",
            //err  -- dont show the error to the user , during debugging it is fine , but never do in production
        })
    }

}


async function getComments(req,res){
    const {postId}=req.params

    const post=await prisma.post.findUnique({
        where:{
            id:postId
        }
    })
    if(!post){
        return res.status(404).json({
            message:"No post to comment on!"
        })
    }

    const com=await prisma.comment.findMany({
        where:{
            postId:postId
        },
        include:{
            author:{
                select:{
                    id:true,
                    name:true,
                    email:true
                }
            }
        }
    })

    return res.status(200).json({
        message:"All comments fetched successfully",
        com
    })

}

async function deleteComment(req,res){
    const {id}=req.params
    const isCommentValid=await prisma.comment.findUnique({
        where:{
            id
        }
    })

    if(!isCommentValid){
            return res.status(404).json({
            message:"The comment is not present"
        })
    }

    /* Middleware to make sure that only logged in user or admin can delete the comment */
    if(isCommentValid.authorId!==req.user.id && req.user.role!=="ADMIN"){
        return res.status(403).json({
            message:"You are not allowed to delete this comment"
        })
    }

    

    await prisma.comment.delete({
        where:{
            id
        }
    })

    return res.status(200).json({
        message:"Comment deleted successfully"
    })

}


async function updateComment(req,res){
    const {id}=req.params;
    const {text}=req.body;
     
    if(!text || text.trim()===""){
        return res.status(400).json({
            message:"Comment text is required"
        })
    }

    const isCommentValid=await prisma.comment.findUnique({
        where:{
            id
        }
    })

    if(!isCommentValid){
            return res.status(404).json({
            message:"The comment is not present"
        })
    }

    if(isCommentValid.authorId!==req.user.id && req.user.role!=="ADMIN"){
        return res.status(403).json({
            message:"You are not allowed to edit this comment"
        })
    }

    const updatedComment=await prisma.comment.update({
        where:{
            id
        },
        data:{
            text
        }
    })

    return res.status(200).json({
        message:"Comment updated successfully",
        updateComment
    })

}

module.exports={createComment,deleteComment,updateComment,getComments};