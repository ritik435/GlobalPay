const { Router } = require('express');
const express=require('express');
const router=express.Router();
const homeController=require('../controllers/routes_Controller');

console.log('route enabled');
router.use('/users',require('../routes/users'));



router.get('/',homeController.home);




module.exports=router;


