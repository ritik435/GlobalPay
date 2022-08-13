const Payment=require('../models/payment');
const User = require('../models/User');

module.exports.create=async function(req,res){
    try{

        let users = await User.findById(req.user._id);
        let send_to_users=await User.findById(req.params.id);
        if(users && send_to_users){ 
            if(req.body.payment > users.balance){
                console.log('Insufficient Balance');
                req.flash('success', 'Insufficient Balance');
                return res.redirect('/');
            }   
            let payment = await Payment.create({
                content:req.body.content,
                user:req.user._id,
                send_to:req.params.id,
                payment:req.body.payment
            }); // update in the user who is sending money

            users.payments.unshift(payment);
            send_to_users.payments.unshift(payment);
            
            users.save();
            send_to_users.save();
            
            let balance_user=parseInt(req.user.balance) - parseInt(req.body.payment);
        
        let user=await User.findByIdAndUpdate(payment.user,{
            balance: balance_user
        });
        
        
        
        
        
        let send_to= await User.findById(payment.send_to);
        let balance_send_to=parseInt(send_to.balance) + parseInt(req.body.payment);
        send_to.balance=balance_send_to;
        
        send_to.save(function (err) {
            if(err) {
                console.error('ERROR!');
            }
        });
        
        req.flash('success', 'Payment created !');

        return res.redirect('/users/view-all-customers');
        
        
    }      
    
}catch(err){
    console.log(`Error in payment ${err}`);
    return;
}
}

