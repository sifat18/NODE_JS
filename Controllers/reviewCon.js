const Paper= require('../models/news');
const Comment=require('../models/Comments')

module.exports.postComment=async (req,res,next)=>{
    const { id }= req.params;
    const f= await Paper.findById(id);
    const com=new Comment(req.body.review);
    com.author=req.user._id
    f.comments.push(com);
    await com.save();
    await f.save();
    req.flash('success','posted')
    res.redirect(`/news/${f._id}`)
}

module.exports.deleteComment=async(req, res) => {
    const { id,cid }= req.params;
    await Paper.findByIdAndUpdate(id,{$pull:{comments:cid}});
    await Comment.findByIdAndDelete(cid);
    res.redirect(`/news/${id}`)
}