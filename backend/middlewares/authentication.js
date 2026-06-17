const jwt=require('jsonwebtoken')
require('dotenv').config()

function auth(req,res,next){
    const authHeader=req.headers.authorization
    const token=authHeader.split(" ")[1]
    const verify=jwt.verify(token,process.env.MY_SECRET)

    req.newUser=verify
    next()
}

module.exports=auth