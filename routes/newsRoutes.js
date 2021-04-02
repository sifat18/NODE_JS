const exp=require('express');
const router= exp.Router();
const multer=require('multer');
const { storage }=require('../Cloudinary/cloud');
const upload=multer({ storage });
const Paper= require('../models/news');
// const Joi=require('joi') //validation package
// const { required } = require('joi');
const neCon=require('../Controllers/newsCon');
const {isExist,validCheck,isAuthor}=require('../middlewears/midle');


router.get('/', neCon.index)

router.get('/new', isExist, neCon.newArticleForm)


router.post('/',isExist,upload.array('image'),validCheck,neCon.createArticle)
//  router.post('/',,(req,res)=>{
//      console.log(req.body, req.file);
//      res.send('Done');

//  })

router.get('/:id', neCon.showArticle)


router.get('/:id/edit', isExist,isAuthor,neCon.editForm)

router.put('/:id',isExist ,isAuthor ,upload.array('image') ,validCheck, neCon.edited)

router.delete('/:id', isExist,isAuthor,neCon.deleteArticle)

module.exports=router;