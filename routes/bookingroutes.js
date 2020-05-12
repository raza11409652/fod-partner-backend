const bookingRouter = require('express').Router();
const validate = require('../middleware/validate') ;
const bookingModel = require('../model/booking_model') ; 
/**
 * @param  id is property Id only booking associated with this will 
 * be shown
 * 
 * */ 
bookingRouter.get('/list/:id' ,validate  , async (req , res)=>{
    const verified= req.user ; 
    bookingModel.findAll({
        where:{
            booking_property : req.params.id
        } ,
    
    }).then(result=>{
        if(!result){
            return res.json({
                error : true , 
                msg : 'No booking found', 
                errorcode : 404
            }) .status(200) ; 
        }
        return res.json({
            error : false , 
            errorcode : 0 , 
            msg : `${result.length} records found ` , 
            records : result
        }).status(200);
        
    }) ; 
   
    
}) ; 
module.exports = bookingRouter ; 