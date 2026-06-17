const express=require('express')
const bcrypt=require('bcrypt')
const auth=require('../middlewares/authentication.js')
const db=require('../db/dbcon.js')
require('dotenv').config()

const secret=process.env.MY_SECRET
router=express.Router()

async function registerUser(name,password){
  await db.execute("insert into userReg(username,password) values(?,?)",[name,password])
}

router.get('/profile',auth,(req,res)=>{
    res.send("Profile")
})

router.post('/register',async (req,res)=>{
    [username,password]=req.body

    const hashedpass=await bcrypt.hash(password,10)

    const newUser=await registerUser(username,hashedpass)

    const token=jwt.sign({
      name:newUser.username,
    },process.env.MY_SECRET,
  {
    expiresIn:'60'
  });

    res.status(201).json({msg:"Registered",token,});

})

module.exports=router