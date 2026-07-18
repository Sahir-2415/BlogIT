const jwt=require('jsonwebtoken');

async function authUser(req,res,next){
    // console.log(req.cookies);
    const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({
            message:"Unauthorized"
        })
    }
    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=='USER'){
            return res.status(401).json({
                message:"You do not have access"
            })
        }
        req.user=decoded;
        next();
    }catch(err){
        return res.status(401).json({
            meesage:Unauthorized,
            error:err.message
        })
    }
}


async function authAdmin(req,res,next){
    try{
        const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({
                message:"Unauthorized"
            })
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        if(decoded.role!=='ADMIN'){
            return res.status(403).json({
                message:"You do not have access"
            })
        }
        req.user=decoded
        next();

    }catch(err){
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

module.exports={authUser,authAdmin}