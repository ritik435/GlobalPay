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
        default: 200000
        
    },
    bio:{
        type:String
    },
    payments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Payment'
        }
    ]
    
    
},{
    timestamps:true
});

const User=mongoose.model('User',userSchema);

module.exports=User;