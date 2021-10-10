const User=require('../models/User');



module.exports.home=function(req,res){
    User.find({},function(err,user){
        return res.render('home',{
            title:'MoneyPay',
            users : user
        });

    });
    
}


