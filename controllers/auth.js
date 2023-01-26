const db = require("../db")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const {promisify} = require("util")


exports.delete = async (req,res)=>{
   

    db.query("delete from courses where usn= ?",[req.params.usn],async(error,rows)=>{
        if(!error){
            db.query("delete from student where usn= ?",[req.params.usn],async(error,rows)=>{
                db.query("delete from ia1 where usn= ?",[req.params.usn],async(error,rows)=>{
                    db.query("delete from ia2 where usn= ?",[req.params.usn],async(error,rows)=>{
                        db.query("delete from ia3 where usn= ?",[req.params.usn],async(error,rows)=>{

                        })
                    })
                })
            })
            if(!error){
                res.render("admin_marks")
                
            }
            else{
                console.log(error)
            }
        }
        else{
            console.log(error)
        }
    })

}

exports.update = async (req,res)=>{
    const{CS51_IA1,CS51_IA2,CS51_IA3,CS52_IA1,CS52_IA2,CS52_IA3,CS53_IA1,CS53_IA2,CS53_IA3,CS54_IA1,CS54_IA2,CS54_IA3,CS55_IA1,CS55_IA2,CS55_IA3,CS56_IA1,CS56_IA2,CS56_IA3}= req.body

    db.query("update courses set CS51_IA1 = ?,CS51_IA2 = ?,CS51_IA3 = ?,CS52_IA1 = ?,CS52_IA2 = ?,CS52_IA3 = ?,CS53_IA1 = ?,CS53_IA2 = ?,CS53_IA3 = ?,CS54_IA1 = ?,CS54_IA2 = ?,CS54_IA3 = ?,CS55_IA1 = ?,CS55_IA2 = ?,CS55_IA3 = ?,CS56_IA1 = ?,CS56_IA2 = ?,CS56_IA3 = ? where usn=?",[CS51_IA1,CS51_IA2,CS51_IA3,CS52_IA1,CS52_IA2,CS52_IA3,CS53_IA1,CS53_IA2,CS53_IA3,CS54_IA1,CS54_IA2,CS54_IA3,CS55_IA1,CS55_IA2,CS55_IA3,CS56_IA1,CS56_IA2,CS56_IA3,req.params.usn],async(error,rows)=>{
        if(!error){
            const usn = req.params.usn
            db.query("update ia1 set 18CS51=?,18CS52=?,18CS53=?,18CS54=?,18CS55=?,18CS56=? where usn= ?",[CS51_IA1,CS52_IA1,CS53_IA1,CS54_IA1,CS55_IA1,CS56_IA1,req.params.usn],async(error,rows)=>{
                db.query("update ia2 set 18CS51=?,18CS52=?,18CS53=?,18CS54=?,18CS55=?,18CS56=? where usn= ?",[CS51_IA2,CS52_IA2,CS53_IA2,CS54_IA2,CS55_IA2,CS56_IA2,req.params.usn],async(error,rows)=>{
                    db.query("update ia3 set 18CS51=?,18CS52=?,18CS53=?,18CS54=?,18CS55=?,18CS56=? where usn= ?",[CS51_IA3,CS52_IA3,CS53_IA3,CS54_IA3,CS55_IA3,CS56_IA3,req.params.usn],async(error,rows)=>{

                    })
                })
            })
            res.render("edit_marks",{rows,alert:"MARKS HAS BEEN UPDATED"})
            
        }
        else{
            console.log(error)
        }
    })

}

exports.edit = async (req,res)=>{

    db.query("select * from courses where usn=?",[req.params.usn],async(error,rows)=>{
        if(!error){
            res.render("edit_marks",{rows})
            
        }
        else{
            console.log(error)
        }
    })

}

exports.admin_marks = async (req,res)=>{
        console.log("running")
        const{sec} = req.body
        console.log(sec)
        db.query("select * from courses where sec=?",[sec],async(error,rows)=>{
            if(!error){
                res.render("admin_marks",{rows})
                
            }
            else{
                console.log(error)
            }
        })

    

}
exports.logout = async(req,res)=>{
    res.cookie("jwt","logout",{
        expires:new Date(Date.now()+2*1000),
        httpOnly:true
    })
    res.status(200).redirect('/')
}

exports.isLoggedInS= async (req,res,next)=>{
    if(req.cookies.jwt)
    try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECREATE)

        db.query("select * from student where usn = ?",[decoded.id],(error,results)=>{
            if(!results){
                return next()
            }
    
            req.users=results[0];
            return next()
        })
        
        
    } catch (error) {
        console.log(error)
        return next()
    }
    else{
        next();
    }
    
}
exports.isLoggedInA= async (req,res,next)=>{
    if(req.cookies.jwt)
    try {
        const decoded = await promisify(jwt.verify)(req.cookies.jwt,process.env.JWT_SECREATE)

        db.query("select * from faculty where faculty_name = ?",[decoded.id],(error,results)=>{
            if(!results){
                return next()
            }
    
            req.users=results[0];
            return next()
        })
        
        
    } catch (error) {
        console.log(error)
        return next()
    }
    else{
        next();
    }
    
}


exports.registerS = (req,res)=>{
    

    const{name,usn,sec,password,passwordConfirm} = req.body

    db.query('select usn from student where usn =?',[usn],async (error,results)=>{
        if(error){
            console.log(error)
        }
        if(results.length > 0){
            return res.render("student_register",{message:"USN Already in Registered"})
        }
        else if(password!==passwordConfirm) {
            return res.render("student_register",{message:"Passwords dont Match"})
        }
        let hashedPassword = await bcrypt.hash(password,12)

        db.query('insert into student set ?',{name:name,usn:usn,sec:sec,password:hashedPassword},(error,results)=>{
            db.query('insert into courses set ?',{usn:usn,sec:sec},(error,results)=>{
                db.query('insert into ia1 set ?',{usn:usn},(error,results)=>{
                    db.query('insert into ia2 set ?',{usn:usn},(error,results)=>{
                        db.query('insert into ia3 set ?',{usn:usn},(error,results)=>{
                            if(error){
                                console.log(error);
                                }
                            else{
                                return res.render("student_register",{message:"User registered"})
                                }
                        })
                    }) 
                })
            })
        })
    })
}

exports.registerA = (req,res)=>{
    console.log(req.body);{}
    const{admin_name,name,password,passwordConfirm} = req.body

    db.query('select faculty_name from faculty where faculty_name =?',[admin_name],async (error,results)=>{
        if(error){
            console.log(error)
        }
        if(results.length > 0){
            return res.render("admin_register",{message:"Faculty Name Already in Use"})
        }
        else if(password!==passwordConfirm) {
            return res.render("admin_register",{message:"Passwords dont Match"})
        }
        let hashedPassword = await bcrypt.hash(password,12)

        db.query('insert into faculty set ?',{faculty_name:admin_name,name:name,password:hashedPassword},(error,results)=>{
            if(error){
                console.log(error);
                }
            else{
                return res.render("admin_register",{message:"User registered"})
                }
        })
    })
}

exports.admin_login = async (req,res)=>{
    console.log(req.body);
    // const user =req.body.user;
    // const password = req.body.password
    try {
        const{admin_name,password} = req.body
        
        if(!admin_name || !password){
            return res.status(400).render("admin_login",{
                message:"Please Provide a UserName and Password"
            })
        }
        
        db.query("select * from faculty where faculty_name = ?",[admin_name], async(error,results)=>{
            
            // console.log(await bcrypt.compare(password, results[0].password))
            // console.log(password)
            // console.log(results[0].password)
            if( !results[0] || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render("admin_login",{message:"Email or Password is incorrect"})
            }
            else {
                const id = results[0].faculty_name;
        
                const token = jwt.sign({id}, process.env.JWT_SECREATE, {
                expiresIn: process.env.JWT_EXPIRES_IN
                });
        
                
        
                const cookieOptions = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                ),
                  httpOnly: true
                }
        
                res.cookie('jwt', token, cookieOptions );
                 res.status(200).redirect("/admin_dash");
              }
        })
        
        } 
    catch (error) {
        console.log(error)
        }
    

    

}











exports.student_login = async (req,res)=>{
    console.log(req.body);
    // const user =req.body.user;
    // const password = req.body.password
    try {
        const{usn,password} = req.body
        
        if(!usn || !password){
            return res.status(400).render("student_login",{
                message:"Please Provide a UserName and Password"
            })
        }
        
        db.query("select * from student where usn = ?",[usn], async(error,results)=>{
            
            // console.log(await bcrypt.compare(password, results[0].password))
            // console.log(password)
            // console.log(results[0].password)
            if( !results[0] || !(await bcrypt.compare(password, results[0].password))){
                res.status(401).render("student_login",{message:"Email or Password is incorrect"})
            }
            else {
                db.query("select * from courses where usn= ?",[usn],async(error,rows)=>{

                    console.log("deleteing")
                    if(!error){
                        const token = jwt.sign({id}, process.env.JWT_SECREATE, {
                            expiresIn: process.env.JWT_EXPIRES_IN
                          });
                  
                          
                  
                          const cookieOptions = {
                            expires: new Date(
                              Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                          }
                  
                        res.cookie('jwt', token, cookieOptions );
                        res.render("student_dash",{rows,users:req.users});
                        console.log(rows)
                        }
                    else{
                        console.log(error)
                    }
                })
                const id = results[0].usn;
        
                
              }
        })
        
        } 
    catch (error) {
        console.log(error)
        }
    

    

}

