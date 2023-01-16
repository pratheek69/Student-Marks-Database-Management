const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth")

router.get('/',(req,res)=>{
    res.render("index");
})

router.get('/student_login',(req,res)=>{
    res.render("student_login")
})
    
router.get('/admin_login',(req,res)=>{
        res.render("admin_login")
    })
    

router.get('/student_register',(req,res)=>{
    res.render("student_register")
})

router.get('/admin_register',(req,res)=>{
    res.render("admin_register")
})


router.get("/student_dash",authController.isLoggedInS,(req,res)=>{
    if(req.users){
        res.render("student_dash",{users:req.users})
    }
    else{
        res.redirect("/")
    }
})

router.get("/admin_dash",authController.isLoggedInA,(req,res)=>{
    if(req.users){
        res.render("admin_dash",{users:req.users})
    }
    else{
        res.redirect("/")
    }
})
router.get("/faculty",(req,res)=>{
    res.render("faculty_dash")
})

module.exports = router