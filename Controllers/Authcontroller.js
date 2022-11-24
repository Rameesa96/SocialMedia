const User = require('../Model/usermodal')

const userregister = async(req,res)=>{
    try{
    const newuser = new User({
        username:req.body.username,
        password:req.body.password,
        firstname:req.body.password,
        lastname:req.body.lastname})
   
 const saveduser=await newuser.save()
res.status(200).json(saveduser)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports = userregister

const userlogin=async(req,res)=>{
    try{
        const user=User.findOne({
            username:req.body.username,
            password:req.body.password
        })
        res.status(200).json(user)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}
module.exports=userlogin