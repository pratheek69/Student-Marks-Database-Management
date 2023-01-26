const express = require("express")
const db = require("../db")
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

router.get('/edit_marks/:usn',authController.edit,(req,res)=>{
    res.render("edit_marks")
})

router.get('/delete/:usn',authController.delete,(req,res)=>{
    
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

router.get("/admin_marks",authController.isLoggedInA,(req,res)=>{

    
                if(req.users){
                    db.query("select sec from courses ",async(error,section)=>{
                        if(!error){
                            res.render("admin_marks",{section})
                            
                        }
                        else{
                            console.log(error)
                        }
                        
                        
                    })
                    
                }
                else{
                    res.redirect("/")
                }
        
})


module.exports = router