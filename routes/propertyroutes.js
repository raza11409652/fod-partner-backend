const propertyRouter = require('express').Router() 
const validate = require('../middleware/validate')
const propertyMapping = require('../model/partner_mapping') 
const partner =require('../model/partner')
const propertyModel = require('../model/property')
propertyRouter.get('/list' ,validate, async (req,res)=>{
    /**This variable will contain user email */
    const verified= req.user ; 
    console.log(verified);
    partner.findOne({
        where:{
            partner_email:verified
        }
    }).then(result=>{
        if(!result){
            return res.json({
                error :true  , 
                errorcode:404 ,
                msg :"Token is not found , user email is not registered"
            }) .status(200); 
        }   
        // console.log(result);
        const partnerId = result.partner_id ; 
        // console.warn(partnerId);

        propertyMapping.findAll({
            where:{
                partner_mapping_partner:partnerId
            }
        }).then(result=>{
            if(!result){
                return res.json({
                    error:true ,
                    errorcode : 0,
                    msg:"No Property found"
                }).status(200) ; 
            }
            //  console.log(result);
            return res.json({
                error:false , 
                errorcode:0 ,
                msg:"Found" , 
                records:result
            }).status(200); 
             
           
            
            
        }).catch(error=>{
            console.log(error);    
        }) ; 
        
        
    }) .catch(err=>{
        console.log(err);
        
    }); 
    
}) ;  
propertyRouter.get('/list/:id' , validate , async(req,res)=>{
    const propertyid = req.params.id ; 
    console.log(propertyid);
    
    //validate ID
    propertyModel.findOne({
        where:{
            property_id:propertyid
        }
    }).then(result=>{
        if(!result) {
            return res.json({
                error:true , 
                msg:"Invalid parameter"
            }).status(404) ;
        }
        return res.json({
            error:false , 
            records:result
        })
    }).catch(err=>{
        console.log(err);
        
    }) ; 
})   ; 

module.exports = propertyRouter;