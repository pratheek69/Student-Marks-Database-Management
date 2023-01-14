const express = require("express")
const router = express.Router();

router.get('/',(req,res)=>{
    res.render("login");
})

router.get("/student",(req,res)=>{
    res.render("student_dash")
})
router.get("/faculty",(req,res)=>{
    res.render("faculty_dash")
})

module.exports = router;