const express =require("express")
const app =express()
const mongoose =require('mongoose')
const bodyparser =require('body-parser')
const Authrouter = require('./routes/authroute')
const Userroute =require('./routes/Userroute')
const Postroute=require('./routes/Postroute')
const cors = require("cors")
mongoose.connect("mongodb+srv://admin:admin@cluster0.1blcnix.mongodb.net/?retryWrites=true&w=majority")
mongoose.connection.on("connected" ,()=>{
    console.log("mongodb connectd")
})

mongoose.connection.on("error" ,()=>{
    console.log("mongodb error")
})

app.use(express.json())
app.use(bodyparser.json({limit:'30mb',extended:true}))
app.use(bodyparser.urlencoded({limit:'30mb',extended:true}))
app.use(cors());
app.use(bodyparser.json());

app.use(express.json());

app.set('view engine', 'ejs');

//statics files
app.use(express.static("static"))

app.get('/posting',(req,res) =>{
    res.render('index')})
    

app.use('/auth',Authrouter)
app.use('/user',Userroute)
app.use('/post',Postroute)

app.listen(2000,()=>{
    console.log("server running on port 2000")
})