const express =require('express');
const userlogin = require('../Controllers/Authcontroller');
const userregister = require('../Controllers/Authcontroller');
const User = require('../Model/usermodal')
const router = express.Router()
const bcrypt =require('bcrypt')
router.post("/register",async(req,res)=>{
    const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync(req.body.password, salt);
    try{
    const newuser = new User({
        username:req.body.username,
        password:hash,
        firstname:req.body.password,
        lastname:req.body.lastname})
   
 const saveduser=await newuser.save()
res.status(200).json(saveduser)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})
router.post("/login",async(req,res)=>{
    const password = req.body.password
    try{
const user=await User.findOne({username:req.body.username})
if(user){
    const validity=bcrypt.compare(password,user.password)
    validity?res.status(500).json(user):res.status(400).json("wrong user")
}else{
    res.status(400).json(" user does not exist")
}
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

module.exports = router;