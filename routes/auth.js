const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth")

router.post('/login',authController.register)

// router.get("/student",(req,res)=>{
//     res.render("student_dash")
// })
// router.get("/faculty",(req,res)=>{
//     res.render("faculty_dash")
// })

module.exports = router;