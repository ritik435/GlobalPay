const express=require('express');
const router=express.Router();
const usersController=require('../controllers/users_Controller');
const passport=require('passport');

console.log('users route enabled');

router.get('/sign-in',usersController.SignIn);
router.get('/sign-up',usersController.SignUp);
router.get('/profile',passport.checkAuthentication,usersController.profile);


router.get('/sign-out',usersController.SignOut);
router.post('/create',usersController.create);
router.post('/create-session',
            passport.authenticate(
                'local',
                {failureRedirect: '/users/sign-in'},
            )
            ,usersController.createSession);



module.exports=router