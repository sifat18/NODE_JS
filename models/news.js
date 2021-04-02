const mon=require('mongoose');
const { stringify } = require('qs');
const Comment=require('./Comments')
const User=require('./user')

const ImageSchema=new mon.Schema({
    url:String,
    filename:String
});

ImageSchema.virtual('thumbnail').get(function(){
    return this.url.replace('/upload','/upload/w_200');
});

const paper= new mon.Schema({
title:{
    type: String,
    required:[true, 'title can not be blank']
},
images:[ImageSchema],
description:{
    type: String,
    lowercase:true,
    required:[true,'description can not be blank']
    
},
featured:{
    type: Boolean,
      
},

comments: [
    {
    type: mon.Schema.Types.ObjectId,
    ref: 'Comment'
}
],
author: [
    {
    type: mon.Schema.Types.ObjectId,
    ref: 'User'
}
],
});

paper.post('findOneAndDelete', async function(doc){
// console.log(doc
        if(doc){
            await Comment.deleteMany({
                _id: {
                    $in: doc.comments
                }
        })
    }

})
const Paper= mon.model('Paper',paper);

module.exports= Paper;