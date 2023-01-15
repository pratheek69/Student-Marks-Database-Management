const express = require("express")
const app = express()
const dotenv = require("dotenv")
const db = require("/DBMS/db.js")
const cookieParser = require("cookie-parser")
dotenv.config({path:".env"})
// const db = require("./db")
//const frontend = path.join(__dirname,"../frontend")
//app.use(express.static(frontend))
//app.use(express.static(__dirname + ".."))
app.use('/public',express.static('public'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser())

app.set("view engine", "hbs")
app.set("views","views")

app.use('/',require("./routes/pages"))
app.use('/auth',require('./routes/auth'))

// app.post("/login",(req,res)=>{
//     const q = "insert into login values (?)"
//     const values = ["pratheek","6969"]
//     db.query(q,[values],(err,data)=>{
//         if(err) return res.json(err)
//         return res.json(data)
//     })
// })

app.listen(6969,() =>{
    console.log("Connection Sucessful");
})