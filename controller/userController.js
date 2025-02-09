const AsyncHandler = require("express-async-handler");
const User = require("../models/userModel.js");
const jwt = require("jsonwebtoken");
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
    else{res.status(400);
        throw new Error("user data is not valid");



    }
    res.json({msg:"user registered"})
   
  

});

//@des login user
//@route POST /api/users/login
//@acces public

const loginUser = AsyncHandler(async (req,res) => {
    const {email,password}= req.body;
    if(!email||!password){
res.status(400).json("must provide email and password");

    }
    const user = await User.findOne({email});
    //compare password with hash password
    if(user&&(await bycrypt.compare(password,user.password))){
        const accesToken = jwt.sign({
            user: {
                username:user.username,
                email:user.email,
                _id:user.id
            }

        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"45m"});


res.status(200).json({accesToken});

    }else{

        res.status(401);
        throw new Error("email or password was incorrect!");
    }
    
   

})



//@des current user data
//@route POST /api/users/current
//@acces private


const currentUser = AsyncHandler(async (req,res) => {
    
    res.json(req.user);

})

module.exports={registerUser,loginUser,currentUser};
