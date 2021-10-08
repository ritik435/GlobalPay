const User=require('../models/User');

module.exports.SignIn=function(req,res){
    return res.render('SignIn',{
        title:'Sign In'
    });
}
module.exports.SignUp=function(req,res){
    return res.render('SignUp',{
        title:'Sign Up'
    });
}
// get the sign up data
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
    
    
    


// sign in and create a session for the user
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
            return res.redirect('/users/profile');

        }else{
            // handle user not found

            return res.redirect('back');
        }


    });

 

    

    
}



module.exports.SignOut=function(req,res){

    res.clearCookie('user_id');
    return res.redirect('/users/sign-in');
}