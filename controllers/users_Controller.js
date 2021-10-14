const User=require('../models/User');
const Payment=require('../models/payment');


module.exports.profile=function(req,res){
    User.findById(req.params.id,function(err,user){ 
        Payment.find({user : req.user._id},function(err,payment){
            Payment.find({send_to : req.user._id},function(err,payment1){
                return res.render('user_profile',{
                    title:'User Profile',
                    profile_user:user,
                    payment:payment,
                    payment1:payment1
                });


            })

        })  
        
    });
}
//reset Password
module.exports.resetPassword=function(req,res){
    return res.render('resetPass',{
        title:'Reset Password'
    });
}

module.exports.reset=function(req,res){
    if(req.body.password != req.body.confirm_password){
        req.flash('success', 'Reset password again');
        return res.redirect('back');
    }
    let user=User.find({phone:req.body.phone});
    if(user){
        User.findOneAndUpdate({phone:req.body.phone} ,{password :req.body.password},function(err,users){
            req.flash('success', 'Password has been reset');
            return res.redirect('/users/sign-in')
    
        });
    }else{
        req.flash('success', 'No user found');
        return res.redirect('/users/sign-up');
    }
    
} 




//passbook
module.exports.passbook= async function(req,res){
    
    let users=await User.findById(req.user._id)
    .populate({
        path: 'payments',
        populate: {
            
            path: 'user'
        }
    })
    .populate({
        path: 'payments',
        populate: {
            path:'send_to'
            
        }
    });
    return res.render('passbook',{
        title:'Passbook',
        user :users
    })

    
        
}

module.exports.viewAllCus=function(req,res){
    User.find({},function(err,user){
        return res.render('view_all_cus',{
            title:'View All customers',
            users : user
        });

    });
    
}




//sign In
module.exports.SignIn=function(req,res){
    //if user is signIn then dont access /users/sign-in or sign-up
    if (req.isAuthenticated()){
        return res.redirect('/users/profile/req.user.id');
    }

    return res.render('SignIn',{
        title:'Sign In'
    });
}



//signUp
module.exports.SignUp=function(req,res){
    //if user is signIn then dont access /users/sign-in or sign-up
    if (req.isAuthenticated()){
        return res.redirect('/users/profile/req.user.id');
    }

    return res.render('SignUp',{
        title:'Sign Up'
    });
}




// get the sign up data--> create user
module.exports.create=function(req,res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
        
    }
    User.findOne({ phone: req.body.phone },function(err,user ){
        if(err){console.log("error in finding user in sign up");return;
                }
            if(!user){
                
                User.create(req.body,function(err,user){
                    if(err){
                        console.log("error in creating user in sign up");
                        req.flash('error', 'Error');
                        return;
                        }
                            req.flash('success', 'You have signed up, login to continue!');
                            return res.redirect('/users/sign-in');
                });
            }
            else{
                req.flash('success', 'User is already sign up');
                return res.redirect('/users/sign-in');
            }
    })
    
}
    
    
    


// sign in and create a session for the user--> create user's session
module.exports.createSession = function(req, res){

    // steps to authenticate
    // find the user
    User.findOne({phone: req.body.phone}, function(err, user){
        if(err){console.log('error in finding user in signing in'); 
            req.flash('error', 'ERROR!');
        return;}

        
        // handle user found
        if (user){

            // handle password which doesn't match
            if (user.password != req.body.password){
                req.flash('success', 'Invalid username/password');
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            req.flash('success', 'You have Logged in');
            return res.redirect('/');

        }else{
            // handle user not found
            req.flash('success', 'No user present');
            return res.redirect('back');
        }


    });
       
}


//sign Out
module.exports.SignOut=function(req,res){

    req.logout();
    req.flash('success', 'You have signed out');
    return res.redirect('/users/sign-in');
}