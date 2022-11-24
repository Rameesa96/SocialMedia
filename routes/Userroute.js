const express =require('express')
const router =express.Router()
const User =require('../Model/usermodal')
const bcrypt =require('bcrypt')
router.get('/:id',async(req,res)=>{
const id=req.params.id
try{
    const user =await User.findById(id)
    if(user){
        const{password,...otherdetails}=user._doc
        res.status(500).json(otherdetails)
    }else{
        res.status(404).json("wrong user")
    }
}
catch(err){
    res.status(200).json(err)
}
})
router.put('/:id',async(req,res,next)=>{
    try{
        if(req.body.password){
            const salt = bcrypt.genSaltSync(10);
req.body.password = bcrypt.hashSync(req.body.password, salt);
        }
        const updateduser=await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})  
    
    res.status(200).json(updateduser)
      }catch(err){
        next(err)  }
    
})


router.delete('/:id',async(req,res)=>{
    try{
await User.findByIdAndDelete(req.params.id)
res.status(500).json("deleted")
    }
    catch(error){
        res.status(200).json(error.message)
    }
})
module.exports=router


router.put('/:id/follow',async(req,res)=>{
    const {currentuser}=req.body
    const id = req.params.id

    if(currentuser===id){
        res.status(404).json("forbidenn eror")

    }else{try{
        const followuser=await User.findById(currentuser)
        const followinguser=await User.findById(id)   
    if(!followinguser.followers.includes(currentuser)){
        await followinguser.updateOne({$push:{followers:currentuser}},{new:true})
        await followuser.updateOne({$push:{following:id}})
        res.status(500).json("user followed")
    } res.status(400).json("user already followed")}
    catch(err){
        res.status(200).json(err.message)
    }
}


})

router.put('/:id/unfollow',async(req,res)=>{
    const {currentuser}=req.body
    const id = req.params.id

    if(currentuser===id){
        res.status(404).json("forbidenn eror")

    }else{
        try{
        const followuser=await User.findById(currentuser)
        const followinguser=await User.findById(id)   
    if(followinguser.followers.includes(currentuser)){
        await followinguser.updateOne({$pull:{followers:currentuser}},{new:true})
        await followuser.updateOne({$pull:{following:id}})
        res.status(500).json("user unfollowed")
    } res.status(404).json("user not followed")

        }catch(err){
            res.status(200).json(err.message)
        }
}
})