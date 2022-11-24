const mongoose = require('mongoose')
const UserSchema=mongoose.Schema(
    {
username:{
type:String,
required:true
},
password:{
    type:String,
    required:true
},

firstname:{
    type:String,  
    required:true
},
lastname:{
    type:String,  
    required:true
},
isadmin:{
    type:Boolean,
    default:false
},
postImage:[{
    data:Buffer,
   ContentType:String
}],
postText:[    {type:String} ],
profilepicture:String,
coverpicture:String,
livesin:String,
workat:String,
Relationship:String,
followers:[],
following:[]
},{timestamps:true})


module.exports=mongoose.model("User",UserSchema)