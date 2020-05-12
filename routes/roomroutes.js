const roomRouter = require('express').Router();
const validate = require('../middleware/validate') ;
const property = require('../model/property') 
const roomModel = require('../model/room_model') 
roomRouter.get('/list/:propertyId' , validate , async(req ,res)=>{
    const verified  = req.user  ; 
    // console.log(verified);
    const propertyId = req.params.propertyId ; 
    property.findOne({
        where:{
            property_id : propertyId
        }
    }).then(result=>{
       if(!result){
           return res.json({
            error : true , 
            msg : "Invalid property " , 
            errorcode : 404
           }).status(200) ; 
       }  
    }) ; 
    roomModel.findAll({
        where:{
            room_ref:propertyId
        }
    }).then(result=>{
       return res.json({
           error:false , 
           records:result
       });
    }) ; 

    
}) ; 
module.exports = roomRouter ; 