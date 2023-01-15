const db = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.register = (req,res)=>{
    console.log(req.body);

    const{name,password,passwordConfirm} = req.body

    db.query('select name from users where name =?',[name],async (error,results)=>{
        if(error){
            console.log(error)
        }
        if(results.length > 0){
            return res.render("register",{message:"User Name Already in Use"})
        }
        else if(password!==passwordConfirm) {
            return res.render("register",{message:"Passwords dont Match"})
        }
        let hashedPassword = await bcrypt.hash(password,12)

        db.query('insert into users set ?',{name:name,password:hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
                }
            else{
                return res.render("register",{message:"User registered"})
                }
        })
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
            // console.log(await bcrypt.compare(password, results[0].password))
            // console.log(password)
            // console.log(results[0].password)
            if(!results || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render("login",{message:"Email or Password is incorrect"})
            }
            else {
                const id = results[0].name;
        
                const token = jwt.sign({id}, process.env.JWT_SECREATE, {
                  expiresIn: process.env.JWT_EXPIRES_IN
                });
        
                console.log("The token is: " + token);
        
                const cookieOptions = {
                  expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                  ),
                  httpOnly: true
                }
        
                res.cookie('jwt', token, cookieOptions );
                // res.status(200).redirect("/");
                return res.status(400).render("login",{
                    message:"Logged In"
                })
              }
        })
        
        } 
    catch (error) {
        console.log(error)
        }
    

    

}

