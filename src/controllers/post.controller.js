const prisma=require('../lib/prisma');

async function createPost(req,res){
    const {title,content,published,authorId}=req.body;

    try{
        const post=await prisma.post.create({
            data:{
                title,
                content,
                published,
                authorId,
            }
    })

    return res.status(201).json({
        message:"Post created successfully",
        post:{
            id:post.id,
            title:post.title,
            createdAt:post.createdAt,
        }
    })
    }catch(err){
        console.log(err);
    }
    
}

async function getAllPosts(req,res){
    // const {page,limit}=req.query; -> this will return string and we dont want that

    try{
        const page=parseInt(req.query.page)|| 1;
        const limit=parseInt(req.query.limit)||10;
        const skip=(page-1)*limit; // prisma doesnt understand page , soo this is required to tell how many rows to skip

        const totalPosts=await prisma.post.count({ // count total posts , for the frontend to know how many posts exist
            where:{
                published:true
            }
        })

        const posts=await prisma.post.findMany({
            where:{
                published:true
            },
            skip,    // skip : 5 -> ignore first 5 posts 
            take:limit,      // take:5  ->return next 5 posts
            orderBy:{
                createdAt:"desc"
            }
        })

        const totalPages=Math.ceil(totalPosts/limit);

        return res.status(200).json({
            message:"Posts fetched successfully",
            page,
            limit,
            totalPosts,
            totalPages,
            count:posts.length,
            posts
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }

    
}

async function getAllPostsByUser(req,res){
    

    const {id}=req.params;

    const user=await prisma.user.findUnique({
        where:{
            id,
        }
    })
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }

    const posts=await prisma.post.findMany({
        where:{
            authorId:id,
            published:true
        },
        include:{
            category:true
        }
    })

    if(posts.length===0){ // not doing !posts bcz empty array is truthy in JS and will never be true
        return res.status(404).json({
            message:"No posts avaliable"
        })
    }

    return res.status(200).json({
        message:"Posts fetched successfully",
        posts
    })
}

async function publishPost(req,res){
    try{
        const {id}=req.params;

        //find the id of the post you want to publish
        const post=await prisma.post.findUnique({
            where:{
                id:id
            }
        })
    if(!post){
        return res.status(404).json({
            message:"Post not found"
        })
    }



    // does the current owner own this post ?? ->Flow : if the author of the post is same as the person making this request

    if(post.authorId!==req.user.id){
        return res.status(403).json({
            message:"You are not authorized to publish this post"
        })
    }
    //already published?
    if(post.published){
        return res.status(400).json({
            message:"Post is already published"
        })
    }


    // publish=true , means publish the post 
    const updatedPost=await prisma.post.update({
        where:{
            id:id
        },
        data:{
            published:true
        }
    })

    return res.status(200).json({

        message:"The post has been published.",
        updatedPost

    })

    

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}


async function unpublishPost(req,res){
    try{
        const {id}=req.params;
        const post=await prisma.post.findUnique({
            where:{
                id
            }
        })

        if(!post){
            return res.status(404).json({
                message:"The post does not exists"
            })
        }

        if(post.authorId!==req.user.id){
            return res.status(403).json({
                message:"Post not found"
            })
        }

        //check if already unpublished

        if(!post.published){
            return res.status(400).json({
                message:"The post is already unpublished"
            })
        }

        const updatedPost=await prisma.post.update({
            where:{
                id
            },
            data:{
                published:false
            }
        })

        return res.status(200).json({
            message:"The post is unpublished successfully"
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

async function getMyDrafts(req,res){
    try{
        const drafts=await prisma.post.findMany({
            where:{
                authorId:req.user.id,
                published:false
            },
            orderBy:{
                createdAt:"desc"
            }
        });

        return res.status(200).json({
            count:drafts.length,
            drafts
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

// used by admin to create category
async function createCategory(req,res){
    const {name}=req.body;

    try{

        const existingCategory=await prisma.category.findUnique({
            where:{
                name
            }
        })

        if(existingCategory){
            return res.status(409).json({
                message:"Category already exists."
            })
        }

        const newCategory=await prisma.category.create({
            data:{
                name   
            }
        })

        return res.status(201).json({
            message:"Category created successfully",
            newCategory
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal Server error"
        })
    }

}

// used by frontend in a drop box
async function getAllCategories(req,res){
    try{
        const categories=await prisma.category.findMany({
            orderBy:{
                name:"asc"
            }
        })

        if(categories.length===0){
            return res.status(401).json({
                message:"No category avaliable"
            })
        }
        return res.status(200).json({
            message:"Categories returned successfully",
            categories
        })
    }catch(err){
        console.error(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
}

async function updateCategory(req,res){
    try{    
        const {id}=req.params
        const {name}=req.body
        const category=await prisma.category.findUnique({
            where:{
                id
            }
        })
        if(!category){
            return res.status(401).json({
                message:"No category like this"
            })
        }

        const updatedCategory=await prisma.category.update({
            where:{
                id
            },
            data:{
                name:name
            }
        })
        return res.status(200).json({
            message:"Categories updated successfully",
            updatedCategory
        })
    }catch(err){
        console.error(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
    
}
async function deleteCategory(req,res){
    try{    
        const {id}=req.params
        const category=await prisma.category.findUnique({
            where:{
                id
            }
        })
        if(!category){
            return res.status(404).json({
                message:"No category like this exists"
            })
        }

        await prisma.category.delete({
            where:{
                id
            }
        })
        return res.status(200).json({
            message:"Categories deleted successfully",
        })
    }catch(err){
        console.error(err);

        return res.status(500).json({
            message: "Internal server error"
        });
    }
    
}

async function search(req,res){
    try{
        const {q}=req.query;
        if(!q){
            return res.status(400).json({
                message:"Search Query is required"
            })
        }

        const posts=await prisma.post.findMany({
            where:{
                published:true,
                OR:[
                    {
                        title:{
                            contains:q,
                            mode:"insensitive"
                        },
                    },
                    {
                        content:{
                            contains:q,
                            mode:"insensitive"
                        }
                    }
                ]
            }
        })
        
        return res.status(200).json({
            count:posts.length,
            posts
        })
    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            error:err.message
        })
    }
    
}

module.exports={createPost,publishPost,unpublishPost,getMyDrafts,getAllPosts,createCategory,getAllCategories,updateCategory,deleteCategory,search,getAllPostsByUser}