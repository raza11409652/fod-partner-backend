const bookingRouter = require('express').Router();
const validate = require('../middleware/validate') ;
const bookingModel = require('../model/booking_model') ; 
const bookingPayment  = require('../model/booking_payment') ; 
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
bookingRouter.get('/:number',validate , async(req,res)=>{
    let bookingnumber =  req.params.number ; 
    bookingModel.findOne({
        where:{
            booking_number:bookingnumber
        }
    }).then(result=>{
        // console.log(result);
        // return res.json({
        //     error:false , 
        //     response:result
        // }) ; 
        if(!result){
            return res.json({
                error:true , 
                msg : 'Error , nothing found' , 
                errorcode  :400 
            }).status(200);
        }

        return res.json({
            msg:'Data found for '+ bookingnumber,
            error  :false, 
            records :result 
        }).status(200) ; 
        
    })
}) ; 
/**
 * Lis of payments associated with Booking Id and booking id is active 
 */
bookingRouter.get('/payment/:id' , validate , async(req , res)=>{
    let bookingId = req.params.id ; 
    bookingPayment.findAll({
        where:{
            booking_pay_ref:bookingId 
        }
    }).then(result=>{
        if(!result){
            return res.json({
                error : true , 
                msg : 'No records found'
            }) ; 
        }
        return res.json({
            error:false , 
            records : result 
        }).status(200) ; 
    }) ; 


}) ; 
module.exports = bookingRouter ; 