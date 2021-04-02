const mon=require('mongoose');
const User=require('./user')

const commentSchema= new mon.Schema({
coment:{
    type:String 
},
author: [
    {
    type: mon.Schema.Types.ObjectId,
    ref: 'User'
}
]
});

const Comment= mon.model('Comment',commentSchema);

module.exports= Comment;