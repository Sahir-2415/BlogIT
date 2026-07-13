const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto=require('crypto');
const prisma = require('../lib/prisma');
const sendEmail=require('../utils/sendEmail');

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

    //creating a random token for email verification , 32 bytes into 64 hex string bcz easy to store in database and include in URL
    const emailToken=crypto.randomBytes(32).toString('hex');

    const expiresAt=new Date(Date.now()+60*60*1000) // set the expiry date for the token

    // why have we created a verification token? -> because now the user exists but they havent verified their email yet , so we create another row in postgres in the verification table that has the new token and the userID linked with that token


/* CANNOT STORE TOKEN IN A VARIABLE AS THAT VARIABLE WILL ONLY BE VALID FOR THAT SINGLE REQ AND WILL BE FORGOTTEN AFTERWARDS , 
Here's what happens:

1.User signs up.
2.Your server generates a random token (e.g., a83bf...).
3.You save that token in the database.
4.You email the user a link
5.Later, when they click the link, your server checks:
Does this token exist in the database?
Has it expired?
Which user does it belong to?
*/



    await prisma.verificationToken.create({
        data:{
            token:emailToken,
            expiresAt,
            userId:user.id
        }
    })

    const verificationLink=`http://localhost:3000/api/auth/verify-email?token=${emailToken}`


    await sendEmail(
        user.email,   //-> who should recieve the email

        //email subject
    "Verify your Email",   //email subject
    `
        <h2>Welcome!</h2>

        <p>Click below to verify your email.</p>

        <a href="${verificationLink}">
            Verify Email
        </a>
    `
    )

    // const token = jwt.sign(
    //     {
    //         id: user.id,
    //         role: user.role
    //     },
    //     process.env.JWT_SECRET
    // );

    // res.cookie('token', token);

    res.status(201).json({
        message: "Registration successful. Please verify your email.",
        // user // dont return the object that contains hashed password
        // user:{
        //     id:user.id,
        //     name:user.name,
        //     email:user.email,
        //     role:user.role
        // }
    });
    console.log(user);
}

async function verifyEmail(req,res){
    try{
        const {token}=req.query;

        if(!token){
            return res.status(400).json({
                message:"Verification token is required"
            })
        }

        const verificationToken=await prisma.verificationToken.findUnique({
            where:{
                token
            }
        })

        if(!verificationToken){
            return res.status(400).json({
                message:"Invalid verification token"
            })
        }

        if(verificationToken.expiresAt<new Date()){
            await prisma.verificationToken.delete({
                where:{
                    id:verificationToken.id
                }
            }) // the await part should be before the return or else it will not execute
            return res.status(400).json({
                message:"Token has expired"
            })
        }

        await prisma.$transaction([
            prisma.user.update({
                where:{
                    id:verificationToken.userId
                },
                data:{
                    isVerified:true
                }
            }),
            prisma.verificationToken.delete({
                where:{
                    id:verificationToken.id
                }
            })
        ])

        // await prisma.user.update({
        //     where:{
        //         id:verifyToken.userId
        //     },
        //     data:{
        //         isVerified:true
        //     }
        // })

        // await prisma.verificationToken.delete({
        //     where:{
        //         id:verifyToken.id
        //     }
        // })

        return res.status(200).json({
            message:"Email verified successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
    

}


async function LoginUser(req,res){
    const {email,password}=req.body;

    const user=await prisma.user.findUnique({
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

    if(!user.isVerified){
        return res.status(403).json({
            message:"Please verify your email before loggin in."
        })
    }

    const token=jwt.sign({ 
        id:user.id,
        role:user.role
    },process.env.JWT_SECRET)

    res.cookie("token",token,{
        httpOnly:true,
        secure:process.env.NODE_ENV==="production",
        sameSite:"lax"
    }); // This prevents JS from reading the cookie and improves security

    res.status(200).json({
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
    res.clearCookie("token");
    return res.status(200).json({
        message:"User logged out successfully"
    })
}


async function forgotPassword(req,res){
    try{
        const {email}=req.body;

        const forgotPassUser=await prisma.user.findUnique({
            where:{
                email
            }
        })
        if(!forgotPassUser){
            return res.status(200).json({
                message:"If an account exists with that email , a password reset link has been sent."
            })
        }

        // Delete any old reset tokens
        await prisma.passwordResetToken.deleteMany({
            where:{
                userId:forgotPassUser.id
            }
        })

        const passwordResetToken=crypto.randomBytes(32).toString('hex')
        const expiresAt=new Date(Date.now()+60*60*1000)

        await prisma.passwordResetToken.create({
            data:{
                token:passwordResetToken,
                expiresAt,
                userId:forgotPassUser.id
            }
        })

        const resetLink=`http://localhost:3000/api/auth/reset-password?token=${passwordResetToken}`;

        await sendEmail(
            forgotPassUser.email,
            "Reset Your Password",
            `
                <h2>Password Reset Request</h2>

                <p>You requested to reset your password.</p>

                <p>Click the link below:</p>

                <a href="${resetLink}">
                    Reset Password
                </a>

                <p>This link expires in 1 hour.</p>

                <p>If you didn't request this, you can ignore this email.</p>
            `
        )
        return res.status(200).json({
            message:"If an account with this email exists , a password reset link has been sent."
        })

    }catch(err){
        return res.status(500).json({
            message:"Internal server error",
            error:err
        })
    }
    
}

module.exports = { registerUser,LoginUser,logoutUser,verifyEmail,forgotPassword };

