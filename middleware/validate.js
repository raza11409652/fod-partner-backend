const jwt = require('jsonwebtoken') ;  

const validate = (req , res , next)=>{
    const token = req.header('auth-token') ; 
    console.log(token);
    
    if(!token) return res.json({
        error : true  , 
        msg :"Error token not present"  ,
        errorcode: 404  
    }).status(200) ;
    try{
        const verified  = jwt.verify(token ,process.env.TOKEN_SECRET) ;
        req.user = verified ;
        next();
    }catch(error){
        res.json({
            error : true , 
            msg : error   ,
            errorcode : 404  
        }).status(200) ; 
    }

} 
module.exports = validate ; 