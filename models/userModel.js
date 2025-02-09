const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    username : {
        type:String,
        required:[true,"please add the username it's necessary"],
    },
    email:{
        type:String,
    required:[true,"please enter a email"],
    unique:[true,"email is already taken"],
    
},
password:{
    type:String,
    required:[true,"please enter a password"],

},

    



},{ timestamps: true }
);

module.exports = mongoose.model("User",userSchema); 