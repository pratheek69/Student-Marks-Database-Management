const express = require("express")
const router = express.Router();
const authController = require("../controllers/auth")

router.post('/register', authController.register)

router.post('/login', authController.login)
// router.get("/student",(req,res)=>{
//     res.render("student_dash")
// })
// router.get("/faculty",(req,res)=>{
//     res.render("faculty_dash")
// })
router.get('/logout',authController.logout)
module.exports = router;