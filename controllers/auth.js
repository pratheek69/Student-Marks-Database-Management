const db = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.register = (req,res)=>{
    console.log(req.body);

    const{name,password,passwordConfirm} = req.body

    db.query('select name from users where name =?',[name],(error,results)=>{
        if(error){
            console.log(error)
        }
        if(results.length > 0){
            return res.render("register",{message:"User Name Already in Use"})
        }
        else if(password!==passwordConfirm) {
            return res.render("register",{message:"Passwords dont Match"})
        }

    })
}













exports.login = async (req,res)=>{
    console.log(req.body);
    // const user =req.body.user;
    // const password = req.body.password
    try {
        const{name,password} = req.body
        
        if(!name || !password){
            return res.status(400).render("login",{
                message:"Please Provide a UserName and Password"
            })
        }
        
        db.query("select * from users where name = ?",[name], async(error,results)=>{
            console.log(results);
            console.log(await bcrypt.compare(password, results[0].password))
            console.log(password)
            console.log(results[0].password)
            if(!results || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render("login",{message:"Email or Password is incorrect"})
            }
            else{
                const name = results[0].name;
                const token=jwt.sign({name},testpassword,{
                    expiresIn:90
                })
                console.log(token)

                const cookie ={
                    expire: new Date(
                        Date.now +90*24*60*60*1000
                    ),
                    httpOnly:true
                }
                res.cookie("jwt", token,cookie)
                res.status(200).redirect("/");
            }
        })
        
        } 
    catch (error) {
        console.log(error)
        }
    

    

}

