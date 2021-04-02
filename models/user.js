const mon=require('mongoose');
const lmpassport=require('passport-local-mongoose');

const userSchema= new mon.Schema({
email:{
    type:String,
    required: true,
    unique: true 
}
});

userSchema.plugin(lmpassport); // inserts pass and username features

const User= mon.model('User',userSchema);

module.exports= User;