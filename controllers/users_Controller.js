const User=require('../models/User');

module.exports.profile=function(req,res){
    return res.render('user_profile',{
        title:'User Profile'
    })
}


//sign In
module.exports.SignIn=function(req,res){
    //if user is signIn then dont access /users/sign-in or sign-up
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('SignIn',{
        title:'Sign In'
    });
}



//signUp
module.exports.SignUp=function(req,res){
    //if user is signIn then dont access /users/sign-in or sign-up
    if (req.isAuthenticated()){
        return res.redirect('/users/profile');
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
    User.findOne({phone: req.body.phone},function(err,user ){
        if(err){console.log("error in finding user in sign up");return;
                }
            if(!user){
                
                User.create(req.body,function(err,user){
                    if(err){console.log("error in finding user in sign up");return;
                            }
                return res.redirect('/users/sign-in');
                })
            }
            else{
                return res.redirect('back');
            }
    })
    
}
    
    
    


// sign in and create a session for the user--> create user's session
module.exports.createSession = function(req, res){

    // steps to authenticate
    // find the user
    User.findOne({phone: req.body.phone}, function(err, user){
        if(err){console.log('error in finding user in signing in'); return}
        // handle user found
        if (user){

            // handle password which doesn't match
            if (user.password != req.body.password){
                return res.redirect('back');
            }

            // handle session creation
            res.cookie('user_id', user.id);
            return res.redirect('/');

        }else{
            // handle user not found

            return res.redirect('back');
        }


    });

 

    

    
}


//sign Out
module.exports.SignOut=function(req,res){

    req.logout();
    return res.redirect('/users/sign-in');
}