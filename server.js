//essential imports
const express = require("express");
const dotenv = require("dotenv").config();
const contact = require("./routes/contactRoutes");  
const user = require("./routes/userzroutes.js"); 
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/dbconnection");

//essential variables
const app = express();
const port =process.env.PORT ||6005;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

connectDB();


//routes i guess?


    app.use("/api/contacts",require("./routes/contactRoutes"));
    app.use("/api/users",require("./routes/userzroutes.js"));
//middleware

//starting app
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
}); 

app.use(errorHandler);