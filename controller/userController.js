const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const bycrypt = require("bcrypt");

//@des register user
//@route POST /api/users/register
//@acces public


const registerUser = AsyncHandler(async (req,res) => {
    const {username,email,password} = req.body;
    if(!username||!email ||!password ){
        res.status(400);
        throw new Error("all field are mandatory");

    }
     const userAvailable =await  User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("User already registered")
    }

    const hashPass  = await bycrypt.hash(password,10);

    const user = await User.create({
        username,
        email,
        password:hashPass
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({
            _id:user.id,
            username:user.username
        })

    }
    else{rse.status(400);
        throw new Error("user data is not valid");



    }
    res.json({msg:"user registered"})
   
  

});

//@des login user
//@route POST /api/users/login
//@acces public

const loginUser = AsyncHandler(async (req,res) => {

    res.json({msg:"login"});

})



//@des current user data
//@route POST /api/users/current
//@acces private


const currentUser = AsyncHandler(async (req,res) => {

    res.json({msg:"current also private shiishhh"});

})

module.exports={registerUser,loginUser,currentUser};
