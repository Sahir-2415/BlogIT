const rateLimit=require('express-rate-limit');

//protect the api from abuse , spamming , and Ddos attacks by restricting how often single user can make requests
const apiLimiter=rateLimit({   //-> this is used globally in app.js while authLimiter is used only in some auth routes
    windowMs:15*60*1000,
    max:100, // max request allowed per IP
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        message:"Too many requests, Please try again later"
    }
})

const authLimiter=rateLimit({
    windowMs:15*60*1000,
    max:5,
    standardHeaders:true,
    legacyHeaders:false,
    message:{
        message:"Too many login attempts.Please try again later"
    }
})

module.exports={
    authLimiter,apiLimiter
}


/* HOW DOES RATE LIMITER KNOW WHO IS MAKING REQUESTS?
    -> It stores the IP something like this
    192.168.1.10
    REQUESTS=5
    WINDOW=15MIN

*/