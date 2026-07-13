require('dotenv').config();
const nodemailer=require('nodemailer');

    console.log(process.env.EMAIL_USER);
    console.log(process.env.EMAIL_PASS);

    // transporter - mail delivery truck
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL_USER,
            pass:process.env.EMAIL_PASS
        },
        // For local development only
        tls:{
            rejectUnauthorized:false
        }
        //if we dont do this , we get a ssl issue 
    })

    async function sendEmail(to,subject,html){
        try{
            const info=await transporter.sendMail({
                from:`"Blog API" <${process.env.EMAIL_USER}`,
                to,
                subject,
                html
            })// send the email

            console.log("Email sent:",info.messageId);
        }catch(error){
            console.log("Error sending email:",error);
            throw new Error("Failed to send email");
        }
    }

    


module.exports=sendEmail