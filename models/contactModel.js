const mongoose = require('mongoose');
 
const contactSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,"please add the contact name"],
    },
    email:{
        type:String,
        required:[true,"please add the contact email"],
    },
    phone:{
        type:String,
        required:[true,"please add the contact phone number"],
    },
    

  




} ,
{ timestamps: true });

module.exports = mongoose.model("Contact",contactSchema);
