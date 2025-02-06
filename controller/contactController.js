//contact controller / get all contacts //   GET /api/contacts   // access is public untill authentication
const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
//desc:get single  contact
//GET method
//api/contacts
//@acces public
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


//desc:get all  contact
//GET method
//api/contacts/:id 
//@acces public
const getContacts = asyncHandler(async(req,res) => { 
    const contacts = await Contact.find();
    res.status(200).json(contacts)
});


//desc:delete 1  contacts by id
//DELETE method
//api/contacts/:id
//@acces public
const deletecContact = asyncHandler(async(req,res) => { 

    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);
        
        console.log(contact);
        if(!contact){res.status(404).json({msg:"couldnt find contact"})}
        
        else{res.status(200).json({msg:"contact deleted",contact});}
        
        
    } catch (error) {
        console.log(error);
        contact = null;
        
    }
    
   
    if(!contact){

        res.status(404);
        throw new Error("couldnt find contact")
    }

    
});

//desc:create 1 contact and probably bring back the id
//POST method
//api/contacts/
//@acces public
const createContact = asyncHandler(async(req,res) => { 
    console.log(req.body);
    

    const {firstname,email,phone} = req.body;

    if(!firstname || !email|| !phone){

        res.status(400);
        throw new Error("all fields are mandatory")
    }
    const contact = await Contact.create({
        firstname,email,phone
    });
    res.status(201).json({msg:"contact created",contact}); 
});


//desc:update 1  contact by id
//PUT method
//api/contacts/:id
//@acces public
const  updateContact=asyncHandler(async(req,res) => {

    const contact = await Contact.findById(req.params.id);
    if(!contact){

        res.status(400);
        throw new Error("couldnt find contact")
    }

    
    const {firstname,email,phone} = req.body;

    if(!firstname || !email|| !phone){

        res.status(400);
        throw new Error("all fields are mandatory")
    }


const updatContact = await Contact.findByIdAndUpdate(req.params.id,{firstname,email,phone},{new:true});

    res.status(200).json({updatContact})

});




module.exports = {getContact,getContacts,deletecContact,updateContact,createContact};