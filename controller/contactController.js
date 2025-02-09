//contact controller / get all contacts //   GET /api/contacts   // access is public untill authentication
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");





//desc:get all  contact
//GET method
//api/contacts/:id 
//@acces private


const getContacts = asyncHandler(async(req, res) => { 
    const contacts = await Contact.find({user_id:req.user._id});   
    res.status(200).json(contacts)
});

//desc:get single  contact
//GET method
//api/contacts
//@acces private
const getContact = asyncHandler(async(req,res) => { 

    try {
        const contact = await Contact.findById(req.params.id);
        console.log(contact);
        res.status(200).json(contact); 
    } catch (error) {
        console.log(error);
        contact = null;

    }
    

    if(contact===null){

        res.status(404);
        throw new Error("couldnt find contact");

        
    }
   
    

});



//desc:delete 1  contacts by id
//DELETE method
//api/contacts/:id
//@acces private
const deletecContact = asyncHandler(async(req,res) => { 

    
        const contact = await Contact.findById(req.params.id);
        
        console.log(contact);
        if(!contact){res.status(404).json({msg:"couldnt find contact"})}

        if(contact.user_id.toString() !== req.user._id){
            res.status(403);
            throw new Error("on-authorized user ");
        }
        
        await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"deleted contact",contact:contact});
        
 
       

    
});

//desc:create 1 contact and probably bring back the id
//POST method
//api/contacts/
//@acces private
const createContact = asyncHandler(async(req,res) => { 
    console.log(req.body);
    

    const {firstname,email,phone} = req.body;

    if(!firstname || !email|| !phone){

        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const contact = await Contact.create({
        firstname,
        email,
        phone,
        user_id:req.user._id
    });
    res.status(201).json({msg:"contact created",contact}); 
});


//desc:update 1  contact by id
//PUT method
//api/contacts/:id
//@acces private
const  updateContact=asyncHandler(async(req,res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact){

        res.status(400);
        throw new Error("couldnt find contact")
    }
    if(contact.user_id.toString() !== req.user._id){
        res.status(403);
        throw new Error("on-authorized user ");
    }
   


    const updatContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new:true});

    res.status(200).json({updatContact})

});




module.exports = {getContact,getContacts,deletecContact,updateContact,createContact};