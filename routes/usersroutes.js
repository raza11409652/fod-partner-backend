const userRouter = require('express').Router();
const validate = require('../middleware/validate') 
const userModel = require('../model/users') 
const userDocumentModel = require('../model/user_document') 
userRouter.get('/profile/:userId' , validate ,async(req , res)=>{  
    const verified  = req.user  ; 
    // console.log(verified);
    const userId = req.params.userId ;
    // console.log(userId);
   userDocumentModel.findAll({where:{
       user_document_ref:userId
   }}).then(result=>{
    if(!result) { 
        return res.json({
            error:true , 
            msg : 'No record found'
        })  ;
    }
    return res.json({
        error:false , 
        records:result
    }).status(200);

   }) ; 
       
}) ;

module.exports = userRouter ;  