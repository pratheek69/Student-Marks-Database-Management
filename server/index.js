import express, { json } from "express"
import mysql2 from "mysql2"
import path from 'path'

const app = express()

app.use(express.json())

const frontend =path.join(__dirname,'frontend')
console.log(frontend);

const db = mysql2.createConnection({
    host:"localhost",
    user:"root",
    password:"test69",
    database:"SDM"
})

app.get("/",(req,res)=>{
    
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
app.listen(4000,() =>{
    console.log("Connection Sucessful");
})