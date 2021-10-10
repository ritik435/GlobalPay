const { Router } = require('express');
const express=require('express');
const router=express.Router();
const homeController=require('../controllers/home_Controller');
const passport=require('passport');


console.log('route enabled');
router.use('/users',require('../routes/users'));
router.use('/payments',require('../routes/payments'));


router.get('/',passport.checkAuthentication,homeController.home);




module.exports=router;


