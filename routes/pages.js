const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth")

router.get('/',(req,res)=>{
    res.render("login");
})

router.get('/register',(req,res)=>
    res.render("register"))

router.get("/student",authController.isLoggedIn,(req,res)=>{
    if(req.users){
        res.render("student_dash",{users:req.users})
    }
    else{
        res.redirect("/")
    }
})
router.get("/faculty",(req,res)=>{
    res.render("faculty_dash")
})

module.exports = router