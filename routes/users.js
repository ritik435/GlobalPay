const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_Controller');


console.log('users route enabled');

router.get('/sign-in',usersController.SignIn);
router.get('/sign-up',usersController.SignUp);
    
// router.get('/sign-out',usersController.SignOut);
// router.post('/create',usersController.create);
// router.post('/create-session',usersController.createSession);



module.exports=router