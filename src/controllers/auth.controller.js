const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = require('../lib/prisma');

/* Now prisma has become a gateway to the database */

async function registerUser(req, res) {
    const { name, email, role, password } = req.body;

    // email is unique in your Prisma schema
    const ifUserAlreadyExists = await prisma.user.findUnique({
        where: { email }
    });

    if (ifUserAlreadyExists) {
        return res.status(400).json({
            message: "User already exists with this email"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            // id, // Prisma field name is `id`
            name,
            email,
            password: hash,
            role
        }
    });

    const token = jwt.sign(
        {
            id: user.id,
            role: user.role
        },
        process.env.JWT_SECRET
    );

    res.cookie('token', token);

    res.status(201).json({
        message: "User created successfully",
        user
    });
    console.log(user);
}

async function LoginUser(req,res){
    const {email,password}=req.body;

    const user=await prisma.user.findFirst({
        where:{email}
    })

    if(!user){
        return res.status(401).json({
            message:"User does not exist , Please register"
        })
    }

    const isPasswordValid=await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token=jwt.sign({ 
        id:user.id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token);

    res.status(201).json({
        message:"User logged in successfully",
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role
        }
    })
}

async function logoutUser(req,res){
    res.clearCookies("token");
    return res.status(201).json({
        message:"User logged out successfully"
    })
}


module.exports = { registerUser,LoginUser,logoutUser };

