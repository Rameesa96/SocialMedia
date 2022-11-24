const express = require("express")
const { default: mongoose } = require("mongoose")
const router = express.Router()
const postmodel=require('../Model/postmodel')
const usermodel =require('../Model/postmodel')
const multer  = require('multer')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
  
        // Uploads is the Upload_folder_name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })


//upload

const upload=multer({storage:storage})
const fs =require("fs")

router.post("/postimage",upload.single("testfield"),async(req,res)=>{
    const newpost = new postmodel({
        posttext:req.body.posttext,
        postImg:{
            data: fs.readFileSync("uploads/"+req.file.filename),
            contentType:"image/png"

        },
      
    
    })
try{
    const savedpost=await newpost.save()
    res.redirect("/post/")
}
catch(err){
    res.status(200).json(err.message)
}
})
router.post("/posttext",async(req,res)=>{
    const newpost = new postmodel({
       
        posttext:req.body.posttext
    
    })
try{
    const savedpost=await newpost.save()
    res.status(500).json(savedpost)
}
catch(err){
    res.status(200).json(err.message)
}
})


router.get("/:id",async(req,res)=>{
   
    try{
        const posts= await postmodel.findById(req.params.id)
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err.message) 
    }
})
router.get("/",async(req,res)=>{
   
    try{
        const posts= await postmodel.find()
        res.render("postdisplay", {
            title: "Home Page",
            post:posts
          
        });
    }
    catch(err){
        res.status(500).json(err.message) 
    }
    
})

router.put("/:id",async(req,res)=>{
    const postid=req.params.id;
    
    try{
const post = await postmodel.findById(postid)

    await post.updateOne({postImg:req.body.data})
    res.status(500).json("postupdated")
}

    
    catch(err){
        
        res.status(200).json(err.message) 
    }
})

router.delete('/:id',async(req,res)=>{
    const{userid}=req.body
    try{
        const post = await postmodel.findById(req.params.id)
        if(post.userid===userid){
            await post.deleteOne()
            res.status(500).json("post deleted")
        }
        else{
            res.status(404).json("Acion forbidden") 
        }
    }
    catch(err){
        
        res.status(200).json(err.message) 
    }
})

router.put('/like/:id',async(req,res)=>{
    const{userid}=req.body
    try{
const post = await postmodel.findById(req.params.id)
if(!post.likes.includes(userid)){
    await post.updateOne({$push:{likes:userid}})
    res.status(500).json("liked")
}
else{
    await post.updateOne({$pull:{likes:userid}})
    res.status(500).json("  disliked")
}
    }
    catch(err){
        
        res.status(200).json(err.message) 
    }
})

router.get('/getposts/:id',async(req,res)=>{
    const userid = req.params.id
    try{
const currentposts = await postmodel.find({userid:userid})
const followingposts= await usermodel.aggregate([
    {
        $match:{userid}
    },
    {
        $lookup:{
            from:"posts",
            localField:"following",
            foreignField:"userid",
            as:"followingposts"
        }
    },
    {
        $project:{
            followingposts:1,
            _id:0
        }
    }

])
res.status(500).json(currentposts.concat(followingposts))
    }
    catch(err){
        res.status(200).json(err.message) 
    }
})






module.exports=router