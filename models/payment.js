const mongoose = require('mongoose');


const paymentSchema = new mongoose.Schema({
    content: {
        type: String
    },
    payment:{
        type: Number,
        required: true
    },
    user: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    send_to:{
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

const Payment = mongoose.model('Payment', paymentSchema);
module.exports = Payment;