const exp=require('express');
const router= exp.Router({mergeParams: true});
const Paper= require('../models/news');
const Comment=require('../models/Comments')
const {isExist,comCheck,isAuthor}=require('../middlewears/midle')
const reCon=require('../Controllers/reviewCon');

// const Joi=require('joi') //validation package
// const { required } = require('joi');



router.post('/',isExist, comCheck, reCon.postComment)

router.delete('/:cid', reCon.deleteComment)

module.exports=router;
