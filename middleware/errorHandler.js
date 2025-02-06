const {constants} = require("../constants");


const errorHandler = (err,req,res,next)=>{

    console.log(req.body);
const statusCode = res.statusCode ? res.statusCode : 500;
switch (statusCode) {
        case constants.VALIDATION_ERROR:
            res.json({title:"validation faild",ms:err.message , "stackTrace": err.stack});
        break;
        case constants.UNAUTHROZIED:
            res.json({title:"unauthorized faild",ms:err.message , "stackTrace": err.stack});
        break
        case constants.FORBIDDEN:
            res.json({title:"FORBIDDEN ",ms:err.message , "stackTrace": err.stack});
        break
        case constants.NOT_FOUND:
            res.json({title:"NOT FOUND ",ms:err.message , "stackTrace": err.stack});
        break
        case constants.SERVER_ERROR:
            res.json({title:"NOT FOUND ",ms:err.message , "stackTrace": err.stack});
        break
        default:
            console.log("no error all good");
        break;
}

res.json({title:"not found",ms:err.message , "stackTrace": err.stack});

};

module.exports = errorHandler;

