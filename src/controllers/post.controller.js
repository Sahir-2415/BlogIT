const prisma=require('../lib/prisma');

async function createPost(req,res){
    const {title,content,published,authorId}=req.body;

    try{
        const post=await prisma.post.create({
            data:{
                title,
                content,
                published,
                authorId
            }
    })

    return res.status(201).json({
        message:"Post created successfully",
        post:{
            id:post.id,
            title:post.title,
            createdAt:post.createdAt
        }
    })
    }catch(err){
        console.log(err);
    }
    
}

async function getPosts(req,res){
    
}

module.exports={createPost}