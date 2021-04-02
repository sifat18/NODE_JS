const exp=require('express');
const passport = require('passport');
const router= exp.Router();
const User= require('../models/user');
const userCon=require('../Controllers/userCon');


router.get('/register', userCon.registerForm)
router.post('/register', userCon.registered)

router.get('/login', userCon.LOGIN)
router.post('/login',passport.authenticate('local',{failureFlash:true,failureRedirect:'/login'}), userCon.logAuth)

router.get('/logout', userCon.logOUT)

module.exports=router;

