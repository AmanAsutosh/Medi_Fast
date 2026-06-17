const express=require('express')
const jwt=require('jsonwebtoken')
const route_handler=require('./routes/routes_handle_req.js')


app=express()
app.use('/openPage',route_handler)

app.listen(3000,()=>{
    console.log("Listening at 3000")
})