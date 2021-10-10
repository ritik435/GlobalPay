const Payment=require('../models/payment');
const User = require('../models/User');

module.exports.create=async function(req,res){
    Payment.create({
        content:req.body.content,
        user:req.user._id,
        send_to:req.params.id,
        payment:req.body.payment
    },function(err , payment){ // update in the user eho is sending money
        
        
        let balance_user=parseInt(req.user.balance) - parseInt(req.body.payment);
        
        User.findByIdAndUpdate(payment.user,{
            balance: balance_user
        },function(err,user){
            if(err){console.log('error in creating a payment'); return;}
            
            if(err){
                console.log(`error in payment ${err}`);
                return;
            }
        });
        
        
        
        User.findById(payment.send_to,function(err,send_to){
            if(err){console.log('error in creating a payment '); return;}
            let balance_send_to=parseInt(send_to.balance) + parseInt(req.body.payment);
            send_to.balance=balance_send_to;

            send_to.save(function (err) {
                if(err) {
                    console.error('ERROR!');
                }
            });
            
            // console.log(`Updated balance  :${user.balance} name:${user.name}` );
                if(err) {
                    console.log(`Error in send_to user ${err}`); return;
                }
                // console.log(`payment.send_to.balance : ${send_to.balance}`)
                return res.redirect('/users/view-all-customers');

            })
        }); 
        // });
    // });
}

// User.findByIdAndUpdate(req.params.id,{
//     balance: req.body.payment 
// },function(err,user){
//     console.log(user.balance);
//     console.log(req.body.payment);

//     if(err){
//         console.log(`error in payment ${err}`);
//         return;
//     }
//     console.log(`Updated balance  :${user.balance} name:${user.name}` );
//     return res.redirect('back');
// });