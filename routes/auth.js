const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth")

router.post('/student_login', authController.student_login)

router.post('/admin_login', authController.admin_login)
// router.get("/student",(req,res)=>{
//     res.render("student_dash")
// })
// router.get("/faculty",(req,res)=>{
//     res.render("faculty_dash")
// })

router.post('/student_register', authController.registerS)

router.post('/admin_register', authController.registerA)

router.get('/logout',authController.logout)
module.exports = router;