const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const auth = require("../middlewares/authentication.js");
const db = require("../db/dbcon.js");
const userActions=require('../middlewares/handleRegistrations.js')


require("dotenv").config();

const router = express.Router();


router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedpass = await bcrypt.hash(password, 10);
    const result = await userActions.registerUsers(username,hashedpass)

    const token=jwt.sign({
      username
    },process.env.MY_SECRET,{expiresIn:'10s'})

    console.log(result);

    res.status(201).json({
      msg: "Registered",
      token:token
    });
  } catch (err) {
    console.error("ERROR:", err);
    res.status(500).json({
      msg: err.message,
    });
  }
});


router.post('/login',async(req,res)=>{
  try{
  const {username,password}=req.body

  const row=await userActions.getInfo(username)

  const user=row[0]
  if(!user){
    return res.status(401).json({
      msg:"undefined credentials"
    })
  }
  const v=await bcrypt.compare(password,user.password)
  if(!v){
    return res.status(401).json({
      msg:"Invalid Username or password"
    })
  }
  const token=jwt.sign({
    username:user.username
  },process.env.MY_SECRET,
  {expiresIn:'30s'}
)

 res.status(200).json({
  msg:"Login Successful",
  token:token
  })

}catch(err){
    console.log(err)
    res.status(500).json({
      msg:"Some error occured"
    })
  }
})

router.get("/dashboard", auth, (req, res) => {
  
})

router.post("/diagnostic",async(req,res)=>{
  try{
    let {name,age,symptoms}=req.body
      
      age=Number(age)
      
    const result=await userActions.postPatientData(name,age,symptoms)

    return res.status(201).json({
      name:result.name,
      age:result.age,
      symptoms:result.symptoms
    })}
    catch(err){
      console.log("Error from /diagnostics")
    }
})



module.exports = router;