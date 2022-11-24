const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
   
    likes:[],
    postImg:{
     data:Buffer,
    ContentType:String},
posttext:String
    }
,{timestamp:true})

module.exports=mongoose.model("Post",PostSchema)