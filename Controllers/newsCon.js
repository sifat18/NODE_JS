const Paper= require('../models/news');
const {cloudinary}=require('../Cloudinary/cloud')
module.exports.index=async(req,res,next)=>{
    try{
    // console.log('hi newsboy');
    const papers= await Paper.find({})
    //  console.log(papers);
    res.render("news/index",{papers})
    }catch(e){
        next(e)
    }
}

module.exports.newArticleForm=(req, res) => {
    res.render("news/new")
}

module.exports.createArticle=async (req,res,next)=>{
    // try{
    
    // if(error){
    //     const msg=error.details.map(el=>el.message).join(',')
    //     next(msg,400)
    // }
    // console.log(error.details[0])

    const newPaper= new Paper(req.body.news);
    // const {path:url,filename}=req.file

     newPaper.images=req.files.map(f =>({url:f.path,filename:f.filename}));
    console.log(newPaper.images);

    newPaper.author=req.user._id;

     await newPaper.save();
    req.flash('success','Successfuly made a new Article')

    //  console.log(newPaper);
    res.redirect(`/news/${newPaper._id}`)
    // }catch(e){
    //     next(e)
    // }
}
module.exports.showArticle=async(req,res,next)=>{
    try{
    const { id }= req.params;
    const p= await Paper.findById(id).populate({
        path:'comments',
        populate: {
            path: 'author'
        }
    }).populate('author')
    console.log(p)
    // res.send("founded")
    if(!p){
        req.flash('error','Cant Find Article');
        return res.redirect('/news')
    }
    res.render("news/show",{p})
    }catch(e){
        next(e)
    }
}
module.exports.editForm=async(req, res) => {
    const { id }= req.params;
    
    const f= await Paper.findById(id);
    
    if(!f){
        req.flash('error','Cant Find Article');
        return res.redirect('/news')
    }
    res.render("news/edit",{f})
}

module.exports.edited=async(req, res,next) => {
    
    try{
    const { id }= req.params;
    // console.log(req.body);
    const f= await Paper.findByIdAndUpdate(id,{...req.body.news}, {runValidators:true,new:true});
    const img=req.files.map(ff =>({url:ff.path,filename:ff.filename}));
    f.images.push(...img);
    await f.save();
    if(req.body.deleteImage){
        for(let filename of req.body.deleteImage){
            await cloudinary.uploader.destroy(filename);
        }
        await f.updateOne({$pull:{images:{filename:{$in:req.body.deleteImage } } } } )
    }
    req.flash('success','Successfuly Updated')
    
    res.redirect(`/news/${f._id}`)
    }catch(e){
        next(e)
    }
}

module.exports.deleteArticle=async(req, res) => {
    const { id }= req.params;
   
    await Paper.findByIdAndDelete(id);
    req.flash('success','Successfuly Deleted')

    res.redirect(`/news`)
}
