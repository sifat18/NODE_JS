const Joi=require('joi') //validation package
const { required } = require('joi');
const Paper= require('../models/news');

module.exports.isExist=(req,res,next) =>{
    if(!req.isAuthenticated()){
        req.session.urlpath=req.originalUrl
        req.flash('error','Must be logged in')
        res.redirect("/login")

    }
    next();

}

module.exports.validCheck=(req,res,next)=>{
    const ns=Joi.object({
        news: Joi.object({
            title: Joi.string().required(),
            // image: Joi.string().required(),
            // price: Joi.number().required().min(100),
            description: Joi.string().required(),
            featured: Joi.boolean().required(),
        }).required(),
        deleteImage:Joi.array()

    })
    const {error}=ns.validate(req.body);
    if(error){
        next(error.details[0])
     }
     else{
         next()
     }
}


module.exports.isAuthor=async(req,res,next)=>{
    const { id }= req.params;
    const ff= await Paper.findById(id);
    
    if(!ff.author[0].equals(req.user._id)){
        req.flash('error','Do not have permission')
        res.redirect(`/news/${id}`)
    }
    next();
}

module.exports.comCheck=(req,res,next)=>{
    const ns=Joi.object({
        review: Joi.object({
            coment: Joi.string().required(),
        }).required()

    })
    const {error}=ns.validate(req.body);
    if(error){
        next(error.details[0])
     }
     else{
         next()
     }
}