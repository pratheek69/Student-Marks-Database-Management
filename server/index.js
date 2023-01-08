const express = require('express')
const mysql2 = require('mysql2')
const path = require('path')

const app = express()
app.use(express.json())

const frontend = path.join(__dirname,"../frontend")
app.use(express.static(frontend))

const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"test69",
    database:"SDM"
})

app.get("/",(req,res)=>{
    console.log(__dirname)
    res.sendFile(__dirname +"index.html")
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