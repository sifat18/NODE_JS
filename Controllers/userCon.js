const User= require('../models/user');

module.exports.registerForm=(req,res)=>{
    res.render("auth/register")
    }

    module.exports.registered=async(req,res,next)=>{
        try{
        const {email,username,password}=req.body;
        const newUser= new User({email,username})
        const registeredU=await User.register(newUser,password);
        req.login(registeredU,err =>{
            if(err) return next(err);
            
        req.flash('success','Welcome to the Site');
        res.redirect('/news')
        })
        }catch(e){
            req.flash('error',"Invalid already exists");
            res.redirect('/register')
        }
    }
    module.exports.LOGIN=(req,res)=>{
        res.render("auth/login")
        }
    module.exports.logAuth=(req,res)=>{
        req.flash('success','Welcome Back');
        const url=req.session.urlpath || '/news';
        res.redirect(url)
        }
module.exports.logOUT=(req,res)=>{
    req.logout();
    req.flash('success','Goodbye')
        res.redirect("/login")
        }