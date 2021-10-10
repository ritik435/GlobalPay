const mongoose=require('mongoose');

const userSchema= new mongoose.Schema({
    phone:{
      type:Number,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true,
        unique:true

    },
    password: {
        type:String,
        required:true
    },
    balance :{
        type:Number,
        default: 0
        
    }
    
    
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);

module.exports=User;