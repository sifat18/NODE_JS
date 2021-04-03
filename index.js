if(process.env.Node_ENV!=='production'){
    require('dotenv').config();
}

const exp=require('express');
const app= exp();
const Joi=require('joi') //validation package
const path= require('path');
const meod= require('method-override');
const ejsMate= require('ejs-mate');
const session= require('express-session');
const flash= require('connect-flash');
const passport= require('passport');
const localpass= require('passport-local');
const User= require('./models/user');

const neCon=require('./Controllers/newsCon');


const dbURL=process.env.DB_URL || 'mongodb://localhost:27017/Alpha';
const mon=require('mongoose');
mon.connect(dbURL, { 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    //deprecate warning removes
    useFindAndModify:false, 
    useCreateIndex:true
})
.then(() =>{
    console.log("Mongo Connected")
})
.catch(err =>{
    console.log("ERROR DB CONNECTION")
})





const MongoStore=require("connect-mongo");
const store= new MongoStore({
    mongoUrl:dbURL,
    secret: "badsecret",
    touchAfter: 24*60*60
});
store.on('error',function(e){
    console.log("ERROR",e)
})

const sessionConfig={
    store,
    name: 'session',
    secret: "badsecret",
    resave:false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true,
        expires:Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

const { required } = require('joi');


app.set('views',path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.engine('ejs',ejsMate);
app.use(exp.urlencoded({extended:true}));
app.use(meod('_method'))


app.use(session(sessionConfig));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());  //must be after session
passport.use(new localpass(User.authenticate()));

passport.serializeUser(User.serializeUser()) //storing in session
passport.deserializeUser(User.deserializeUser())
app.use((req, res, next) => {
    res.locals.currentUser=req.user
    res.locals.success=req.flash('success')
    res.locals.error=req.flash('error')

    next()
})

const newss=require('./routes/newsRoutes');
const reviews=require('./routes/reviews');
const authInfo=require('./routes/userRoutes');

app.use('/news',newss)
app.use('/news/:id/comments',reviews)
app.use('/', authInfo)

app.get('/',neCon.index);
app.use((err, req, res, next) => {
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).render('news/error',{err})
})

const port= process.env.PORT || 3001;

app.listen(port, ()=>{
    console.log("started")
})