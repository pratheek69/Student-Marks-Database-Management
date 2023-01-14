import express, { json } from "express"
const app = express()
import {db} from "../server/db.js"
// const db = require("./db")
//const frontend = path.join(__dirname,"../frontend")
//app.use(express.static(frontend))
//app.use(express.static(__dirname + ".."))
app.use('/frontend',express.static('../frontend'))
app.set("view engine", "hbs")
app.set("views","../view")


app.get("/",(req,res)=>{
    res.render("student_login")
})

app.get("/login",(req,res)=>{
    const q = "select * from login"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.post("/login",(req,res)=>{
    const q = "insert into login values (?)"
    const values = ["pratheek","6969"]
    db.query(q,[values],(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})
app.listen(6969,() =>{
    console.log("Connection Sucessful");
})